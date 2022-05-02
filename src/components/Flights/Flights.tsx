import React, {FC, useEffect, useState} from 'react';
import DataSelectionForm from "./DataSelectionForm";
import SecondChart from "./SecondChart";
import FirstChart from "./FirstChart";
import {CovidData} from "../../types/CovidData";
import {FlightData} from "../../types/FlightData";
import {Country} from "../../types/Country";
import useAxios from "../../hooks/useAxios";
import {useFormik} from "formik";
import {Col} from "react-bootstrap";


interface FlightsProps {
}

const Flights: FC<FlightsProps> = () => {
    const axios = useAxios()
    const years = [2019, 2020, 2021, 2022];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [displayedMonthName, setDisplayedMonthName] = useState(months[0]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [airports, setAirports] = useState<string[]>([]);
    const [firstCovidData, setFirstCovidData] = useState<CovidData>({confirmed: 0, deaths: 0, year: 0});
    const [secondCovidData, setSecondCovidData] = useState<CovidData>({confirmed: 0, deaths: 0, year: 0});
    const [firstFlightData, setFirstFlightData] = useState<FlightData>({
        airportCode: '',
        flightsCount: 0,
        month: 0,
        year: 0
    });
    const [secondFlightData, setSecondFlightData] = useState<FlightData>({
        airportCode: '',
        flightsCount: 0,
        month: 0,
        year: 0
    });
    const [flightsFetching, setFlightsFetching] = useState(false);
    const [covidFetching, setCovidFetching] = useState(false);

    const formik = useFormik({
        initialValues: {
            countryCode: 'AF',
            airportCode: '',
            year1: 2020,
            year2: 2021,
            month: 0,
        },
        onSubmit: async values => {
            setCovidFetching(true);
            setFlightsFetching(true);

            const covidData1 = await fetchCovidData(values.countryCode, values.year1, values.month + 1);
            const covidData2 = await fetchCovidData(values.countryCode, values.year2, values.month + 1);
            const FlightData1 = await fetchFlightData(values.airportCode, values.year1, values.month + 1);
            const FlightData2 = await fetchFlightData(values.airportCode, values.year2, values.month + 1);
            console.log(covidData1);
            console.log(covidData2);
            console.log(FlightData1);
            console.log(FlightData2);

            setFirstCovidData(covidData1);
            setSecondCovidData(covidData2);
            setFirstFlightData(FlightData1);
            setSecondFlightData(FlightData2);
            setDisplayedMonthName(months[formik.values.month]);

            setCovidFetching(false);
            setFlightsFetching(false);
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

    const fetchCovidData = async (countryCode: string, year: number, month: number) => {
        const response = await axios.get(`covid/country/${countryCode}/year/${year}/month/${month}`)
        return response.data
    }

    const fetchFlightData = async (airportCode: string, year: number, month: number) => {
        const response = await axios.get(`flights/airport/${airportCode}/year/${year}/month/${month}`)
        return response.data
    }

    useEffect(() => {
        axios.get("countries")
            .then(response => {
                const lowercaseCountries = response.data.map((country: Country) => {
                    return {
                        name: country.name.charAt(0).toUpperCase() + country.name.toLowerCase().slice(1),
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
            <Col xs={6} className='d-flex mt-5 px-4'>
                <FirstChart month={displayedMonthName} covidCases={firstCovidData.confirmed}/>
                <SecondChart month={displayedMonthName} flightCount={firstFlightData.flightsCount}/>
            </Col>
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
