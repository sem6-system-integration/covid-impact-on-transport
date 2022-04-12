import React, {FC} from 'react';
import {Country} from "../../models/Country";


interface DataSelectionFormProps {
    setCountry: React.Dispatch<React.SetStateAction<string>>;
    countries: Array<Country>;
    fetchAirports: (countryCode: string) => void;
    setAirport: React.Dispatch<React.SetStateAction<string>>;
    airports: Array<string>;
    setYear: React.Dispatch<React.SetStateAction<number>>;
    years: Array<number>;
    setMonthNumber: React.Dispatch<React.SetStateAction<number>>;
    months: Array<string>;
    fetchData: () => void;
}

const DataSelectionForm: FC<DataSelectionFormProps> = ({
                                                           setCountry, countries, fetchAirports, setAirport,
                                                           airports, setYear, years, setMonthNumber,
                                                           months, fetchData
                                                       }) => {
    return (
        <div className='row col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 mx-auto mt-3'>
            <table>
                <tr>
                    <td>Country:</td>
                    <td>
                        <select className='form-select' onChange={(e) => {
                            setCountry(e.target.value);
                            console.log(e.target.value);
                            fetchAirports(e.target.value)
                        }}>
                            {countries.sort((c1, c2) => c1.name.localeCompare(c2.name)).map((country) =>
                                <option key={country.code} value={country.code}>{country.name}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Airport:</td>
                    <td>
                        <select className='form-select' onChange={(e) => setAirport(e.target.value)}>
                            {airports.map((icao) => <option key={icao} value={icao}>{icao}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Year:</td>
                    <td>
                        <select className='form-select' onChange={(e) => setYear(Number(e.target.value))}>
                            {years.map((year) => <option key={year} value={year}>{year}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Month:</td>
                    <td>
                        <select className='form-select' onChange={(e) => setMonthNumber(parseInt(e.target.value))}>
                            {months.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
                        </select>
                    </td>
                </tr>
            </table>
            <button className='btn btn-primary mt-2' onClick={fetchData}>Fetch Data</button>
        </div>
    )
}

export default DataSelectionForm;
