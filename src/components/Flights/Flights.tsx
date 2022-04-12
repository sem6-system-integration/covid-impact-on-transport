import React, {FC, useEffect, useState} from 'react';
import DataSelectionForm from "../DataSelectionForm/DataSelectionForm";
import FlightsDataGraph from "../FlightsDataGraph/FlightsDataGraph";
import CovidDataGraph from "../CovidDataGraph/CovidDataGraph";
import {Country} from "../../models/Country";
import {CovidData} from "../../types/CovidData";
import {FlightData} from "../../types/FlightData";
import axios from "../../api/axios";


interface FlightsProps {
}

const Flights: FC<FlightsProps> = () => {
    const fetchFlightsCount = async () => {
        const url = `flights/airport/${airport}/year/${year}/month/${monthNumber}`;
        const response = await axios.get(url);
        const data = response.data;
        setFlightData(data);
    }

    const fetchAirports = async (countryCode: string) => {
        const url = `airports/country/${countryCode}`;
        const response = await axios.get(url);
        const data = response.data;
        setAirports(data['icao']);
        setAirport(data['icao'][0]);
    }

    const fetchCovidData = async () => {
        const url = `covid/country/${countryCode}/year/${year}/month/${monthNumber}`;
        const response = await axios.get(url)
        const data = response.data;
        setCovidData(data);
    }

    const fetchData = async () => {
        setSelectedMonth(months[monthNumber - 1]);
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

    // sort countries by name
    countries.sort((c1, c2) => c1.name.localeCompare(c2.name));

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
    const [airport, setAirport] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(months[0]);

    useEffect(() => {
        fetchAirports(countryCode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className='col-6 d-flex mt-5 px-4'>
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
