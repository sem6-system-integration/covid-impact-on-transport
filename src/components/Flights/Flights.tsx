import React, {FC, useEffect, useState} from 'react';
import DataSelectionForm from "../DataSelectionForm/DataSelectionForm";
import FlightsDataGraph from "../FlightsDataGraph/FlightsDataGraph";
import CovidDataGraph from "../CovidDataGraph/CovidDataGraph";
import {CovidData} from "../../types/CovidData";
import {FlightData} from "../../types/FlightData";
import axios from "../../api/axios";
import {Country} from "../../types/Country";


interface FlightsProps {
}

const Flights: FC<FlightsProps> = () => {
    const fetchFlightsCount = async () => {
        const url = `flights/airport/${airport}/year/${year}/month/${monthNumber}`;
        const response = await axios.get(url);
        const data = response.data;
        setFlightData(data);
    }

    const fetchAirports = async (code: string) => {
        const url = `airports/country/${code}`;
        const response = await axios.get(url);
        const data = response.data;
        setAirports(data['icao']);
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

    const years = [2019, 2020, 2021, 2022];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [covidData, setCovidData] = useState<CovidData>({confirmed: 0, deaths: 0, year: 0});
    const [year, setYear] = useState(years[0]);
    const [monthNumber, setMonthNumber] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState(months[0]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [countryCode, setCountryCode] = useState<string>('AF');
    const [flightData, setFlightData] = useState<FlightData>({airportCode: "", flightsCount: 0, month: 0, year: 0});
    const [airports, setAirports] = useState<string[]>([]);
    const [airport, setAirport] = useState("");

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await axios.get("country");
            const data = response.data;
            // lowercase all country names but keep the first letter capitalized
            const lowercaseCountries = data.map((country: Country) => {
                return {
                    name: country.name.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                    code: country.code
                }
            });
            setCountries(lowercaseCountries);
        };

        fetchCountries().then(() => {
            fetchAirports(countryCode).then(() => {
                setAirport(airports[0]);
            })
        });
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
