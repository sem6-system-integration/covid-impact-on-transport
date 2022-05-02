import React, {FC, useEffect, useState} from 'react';
import DataSelectionForm from "./DataSelectionForm";
import FlightsDataGraph from "./FlightsDataGraph";
import CovidDataGraph from "./CovidDataGraph";
import {CovidData} from "../../types/CovidData";
import {FlightData} from "../../types/FlightData";
import {Country} from "../../types/Country";
import useAxios from "../../hooks/useAxios";


interface FlightsProps {
}

const Flights: FC<FlightsProps> = () => {
    const axios = useAxios()
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

    const fetchFlightsCount = () => {
        axios.get(`flights/airport/${airport}/year/${year}/month/${monthNumber}`)
            .then(response => {
                setFlightData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const fetchAirports = async (code: string) => {
        axios.get(`airports/country/${code}`)
            .then(response => {
                setAirports(response.data['icao']);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const fetchCovidData = () => {
        axios.get(`covid/country/${countryCode}/year/${year}/month/${monthNumber}`)
            .then(response => {
                setCovidData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const fetchData = () => {
        setSelectedMonth(months[monthNumber - 1]);
        fetchCovidData();
        fetchFlightsCount();
    }

    useEffect(() => {
        axios.get("country")
            .then(response => {
                const lowercaseCountries = response.data.map((country: Country) => {
                    return {
                        name: country.name.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                        code: country.code
                    }
                });
                setCountries(lowercaseCountries);
                fetchAirports(countryCode).then(() => {
                    setAirport(airports[0]);
                });
            })
            .catch(error => {
                console.log(error);
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
