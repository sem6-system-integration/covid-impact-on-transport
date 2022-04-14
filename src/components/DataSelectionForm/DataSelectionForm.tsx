import React, {FC} from 'react';
import {Country} from "../../types/Country";


interface DataSelectionFormProps {
    setCountry: React.Dispatch<React.SetStateAction<string>>;
    countries: Country[];
    fetchAirports: (code: string) => void;
    setAirport: React.Dispatch<React.SetStateAction<string>>;
    airports: string[];
    setYear: React.Dispatch<React.SetStateAction<number>>;
    years: number[];
    setMonthNumber: React.Dispatch<React.SetStateAction<number>>;
    months: string[];
    fetchData: () => void;
}

const DataSelectionForm: FC<DataSelectionFormProps> = ({
                                                           setCountry, countries, fetchAirports, setAirport,
                                                           airports, setYear, years, setMonthNumber,
                                                           months, fetchData
                                                       }) => {
    return (
        <div className='row col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 mx-auto mt-3'>
            <table>
                <tbody>
                <tr>
                    <td>Country:</td>
                    <td>
                        <select className='form-select' onChange={(e) => {
                            setCountry(e.target.value);
                            fetchAirports(e.target.value)
                        }}>
                            {
                                countries.map((country) =>
                                    <option key={country.code} value={country.code}>{country.name}</option>)
                            }
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
                </tbody>
            </table>
            <button className='btn btn-primary mt-2' onClick={fetchData}>Fetch Data</button>
        </div>
    )
}

export default DataSelectionForm;
