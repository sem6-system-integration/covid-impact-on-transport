import React, {FC, useContext, useEffect, useState} from 'react';
import DataSelectionForm from "./DataSelectionForm";
import FlightChart from "./FlightChart";
import CovidChart from "./CovidChart";
import {FlightData} from "../../types/FlightData";
import {Country} from "../../types/Country";
import useAxios from "../../hooks/useAxios";
import {useFormik} from "formik";
import {Row} from "react-bootstrap";
import * as yup from "yup";
import {TokenContext} from '../../App';
import {getClaimFromToken} from '../../utils/tokenUtils';
import {CovidData} from '../../types/CovidData';

const currentYear = new Date().getFullYear();

const validationSchema = yup.object().shape({
    year1: yup.number()
        .required()
        .notOneOf([yup.ref('year2')], 'Year 1 cannot be the same as year 2')
        .label('Year 1'),
    year2: yup.number()
        .required()
        .notOneOf([yup.ref('year1')], 'Year 2 cannot be the same as year 1')
        .label('Year 1'),
    month: yup.number()
        .required()
        .when('year1', {
            is: (year1: number) => year1 === currentYear,
            then: yup.number().max(new Date().getMonth() - 1, 'Only previous months are available for the current year')
        })
        .when('year2', {
            is: (year2: number) => year2 === currentYear,
            then: yup.number().max(new Date().getMonth() - 1, 'Only previous months are available for the current year')
        })
        .label('Month'),
});

interface FlightsProps {
}

const Flights: FC<FlightsProps> = () => {
    const axios = useAxios()
    const years = [2019, 2020, 2021, 2022];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [displayedMonthName, setDisplayedMonthName] = useState(months[0]);
    const [displayedYear1, setDisplayedYear1] = useState(years[1]);
    const [displayedYear2, setDisplayedYear2] = useState(years[2]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [airports, setAirports] = useState<string[]>([]);
    const [firstCovidData, setFirstCovidData] = useState<CovidData>({confirmed: 0, deaths: null, year: 2020});
    const [secondCovidData, setSecondCovidData] = useState<CovidData>({confirmed: 0, deaths: null, year: 2021});
    const [firstFlightData, setFirstFlightData] = useState<FlightData>({
        airportCode: '', flightCount: 0, month: 0, year: 0
    });
    const [secondFlightData, setSecondFlightData] = useState<FlightData>({
        airportCode: '', flightCount: 0, month: 0, year: 0
    });
    const [flightsFetching, setFlightsFetching] = useState(false);
    const [covidFetching, setCovidFetching] = useState(false);
    const {token} = useContext(TokenContext);

    const userRoles = getClaimFromToken(token, "authorities")! as string[];

    const formik = useFormik({
        initialValues: {
            countryCode: 'AF',
            airportCode: '',
            year1: 2020,
            year2: 2021,
            month: 0,
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            setCovidFetching(true);
            setFlightsFetching(true);

            const covidCases1 = await fetchCovidCases(values.countryCode, values.year1, parseInt(String(values.month)) + 1);
            let covidData1: CovidData = {
                year: covidCases1.year,
                confirmed: covidCases1.confirmed,
                deaths: null
            };
            const covidCases2 = await fetchCovidCases(values.countryCode, values.year2, parseInt(String(values.month)) + 1);
            let covidData2: CovidData = {
                year: covidCases2.year,
                confirmed: covidCases2.confirmed,
                deaths: null
            };
            const flightData1 = await fetchFlightData(values.airportCode, values.year1, parseInt(String(values.month)) + 1);
            const flightData2 = await fetchFlightData(values.airportCode, values.year2, parseInt(String(values.month)) + 1);
            if (userRoles.includes("PREMIUM")) {
                const covidDeaths1 = await fetchCovidDeaths(values.countryCode, values.year1, parseInt(String(values.month)) + 1);
                covidData1.deaths = covidDeaths1.deaths;
                const covidDeaths2 = await fetchCovidDeaths(values.countryCode, values.year2, parseInt(String(values.month)) + 1);
                covidData2.deaths = covidDeaths2.deaths;
            }

            setCovidFetching(false);
            setFlightsFetching(false);
            if (!covidCases1 || !covidCases2 || !flightData1 || !flightData2) return

            setFirstCovidData(covidData1);
            setSecondCovidData(covidData2);
            setFirstFlightData(flightData1);
            setSecondFlightData(flightData2);

            setDisplayedMonthName(months[formik.values.month]);
            setDisplayedYear1(formik.values.year1);
            setDisplayedYear2(formik.values.year2);
        }
    });

    useEffect(() => {
        axios.get(`airports/country/${formik.values.countryCode}`)
            .then(response => {
                setAirports(response.data['airportCodes']);
                formik.setFieldValue('airportCode', response.data['airportCodes'][0]);
            })
            .catch(error => {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axios, formik.values.countryCode]);

    const fetchCovidCases = async (countryCode: string, year: number, month: number) => {
        try {
            const response = await axios.get(`covid/country/${countryCode}/year/${year}/month/${month}/cases`)
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCovidDeaths = async (countryCode: string, year: number, month: number) => {
        try {
            const response = await axios.get(`covid/country/${countryCode}/year/${year}/month/${month}/deaths`)
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const fetchFlightData = async (airportCode: string, year: number, month: number) => {
        try {
            const response = await axios.get(`flights/airport/${airportCode}/year/${year}/month/${month}`)
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        axios.get("countries")
            .then(response => {
                const lowercaseCountries = response.data.map((country: Country) => {
                    return {
                        name: country.name.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                        code: country.code
                    }
                });
                formik.setFieldValue('countryCode', lowercaseCountries[0].code);
                setCountries(lowercaseCountries);
            })
            .catch(error => {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Row className='mx-auto mt-5 mb-3 justify-content-around col-11'>
                <div className="col-5">
                    <CovidChart
                        covidData1={firstCovidData}
                        covidData2={secondCovidData}
                        month={displayedMonthName}
                    />
                </div>
                <div className="col-5">
                    <FlightChart
                        year1={displayedYear1}
                        year2={displayedYear2}
                        month={displayedMonthName}
                        flightCount1={firstFlightData.flightCount}
                        flightCount2={secondFlightData.flightCount}
                    />
                </div>
            </Row>
            <DataSelectionForm
                countries={countries}
                airports={airports}
                years={years}
                months={months}
                formik={formik}
                covidFetching={covidFetching}
                flightsFetching={flightsFetching}
            />
        </>
    );
}

export default Flights;
