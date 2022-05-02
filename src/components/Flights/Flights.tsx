import React, {FC, useEffect, useState} from 'react';
import DataSelectionForm from "./DataSelectionForm";
import FlightsDataGraph from "./FlightsDataGraph";
import CovidDataGraph from "./CovidDataGraph";
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
    const [covidData, setCovidData] = useState<CovidData>({confirmed: 0, deaths: 0, year: 0});
    const [flightData, setFlightData] = useState<FlightData>({airportCode: '', flightsCount: 0, month: 0, year: 0});
    const [flightsFetching, setFlightsFetching] = useState(false);
    const [covidFetching, setCovidFetching] = useState(false);

    const formik = useFormik({
        initialValues: {
            countryCode: 'AF',
            airportCode: '',
            year: 2020,
            month: 0,
        },
        onSubmit: values => {
            setCovidFetching(true);
            setFlightsFetching(true);
            fetchCovidData(values.countryCode, values.year, values.month + 1);
            fetchFlightsCount(values.airportCode, values.year, values.month + 1);
            setDisplayedMonthName(months[formik.values.month]);
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

    const fetchCovidData = (countryCode: string, year: number, month: number) => {
        axios.get(`covid/country/${countryCode}/year/${year}/month/${month}`)
            .then(response => {
                setCovidData(response.data);
                setCovidFetching(false);
            })
            .catch(error => {
                console.log(error);
                setCovidFetching(false);
            });
    }

    const fetchFlightsCount = (airportCode: string, year: number, month: number) => {
        axios.get(`flights/airport/${airportCode}/year/${year}/month/${month}`)
            .then(response => {
                setFlightData(response.data);
                setFlightsFetching(false);
            })
            .catch(error => {
                console.log(error);
                setFlightsFetching(false);
            });
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
                <CovidDataGraph selectedMonth={displayedMonthName} covidCases={covidData.confirmed}/>
                <FlightsDataGraph selectedMonth={displayedMonthName} flightCount={flightData.flightsCount}/>
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
