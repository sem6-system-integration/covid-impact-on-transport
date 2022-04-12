import React, {FC, useEffect, useState} from 'react';
import DataSelectionForm from "../DataSelectionForm/DataSelectionForm";
import FlightsDataGraph from "../FlightsDataGraph/FlightsDataGraph";
import CovidDataGraph from "../CovidDataGraph/CovidDataGraph";
import {Country} from "../../models/Country";
import {CovidData} from "../../types/CovidData";
import {FlightData} from "../../types/FlightData";


interface FlightsProps {
}

const Flights: FC<FlightsProps> = () => {
    const fetchFlightsCount = async () => {
        const url = `http://localhost:8080/api/flights/airport/${airport}/year/${year}/month/${monthNumber}`;
        const response = await fetch(url);
        const json = await response.json();
        setFlightData(json);
    }

    const fetchAirports = async (countryCode: string) => {
        const url = `http://localhost:8080/api/airports/country/${countryCode}`;
        const response = await fetch(url);
        const json = await response.json();
        setAirports(json['icao']);
    }

    const fetchCovidData = async () => {
        const url = `http://localhost:8080/api/covid/country/${countryCode}/year/${year}/month/${monthNumber}`;
        const response = await fetch(url)
        const json = await response.json()
        setCovidData(json)
    }

    const fetchData = async () => {
        await fetchCovidData();
        await fetchFlightsCount();
    }

    const countries = [
        new Country('Poland', 'PL'),
        new Country('Germany', 'DE'),
        new Country('Spain', 'ES'),
        new Country('Italy', 'IT'),
        new Country('Ukraine', 'UA'),
    ];

    const years = [2019, 2020, 2021, 2022];
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const [covidData, setCovidData] = useState<CovidData>({confirmed: 0, deaths: 0, year: 0});
    const [year, setYear] = useState(years[0]);
    const [monthNumber, setMonthNumber] = useState(1);
    const [countryCode, setCountryCode] = useState(countries[0].code);
    const [flightData, setFlightData] = useState<FlightData>({airportCode: "", flightsCount: 0, month: 0, year: 0});
    const [airports, setAirports] = useState<Array<string>>([]);
    const [airport, setAirport] = useState('');
    const selectedMonth = months[monthNumber - 1];

    useEffect(() => {
        fetchAirports(countryCode);
    }, [countryCode]);

    return (
        <>
            <div className='col-6 d-flex mt-5'>
                <CovidDataGraph selectedMonth={selectedMonth} covidCases={covidData.confirmed}/>
                <FlightsDataGraph selectedMonth={selectedMonth} flightCount={flightData.flightsCount}/>
            </div>
            <DataSelectionForm setCountry={setCountryCode} countries={countries}
                               fetchAirports={fetchAirports} setAirport={setAirport} airports={airports}
                               setYear={setYear} years={years} setMonthNumber={setMonthNumber} months={months}
                               fetchData={fetchData}/>
        </>
    );
}

export default Flights;
