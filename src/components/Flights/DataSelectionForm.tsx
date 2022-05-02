import React, {FC} from 'react';
import {Country} from "../../types/Country";
import {Button, Col, FloatingLabel, Form} from "react-bootstrap";


interface DataSelectionFormProps {
    countries: Country[];
    airports: string[];
    years: number[];
    months: string[];
    formik: any;
    covidFetching: boolean;
    flightsFetching: boolean;
}

const DataSelectionForm: FC<DataSelectionFormProps> = ({
                                                           countries,
                                                           airports,
                                                           years,
                                                           months,
                                                           formik,
                                                           covidFetching,
                                                           flightsFetching
                                                       }) => {
    return (
        <div className='row col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 mx-auto mt-3'>
            <Form onSubmit={formik.handleSubmit} noValidate>
                <FloatingLabel controlId="inputCountryCode" label="Country" className="mb-2">
                    <Form.Select
                        name="countryCode"
                        onChange={formik.handleChange}
                        value={formik.values.countryCode}>
                        {countries.map((country) => (
                            <option key={country.code} value={country.code}>{country.name}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{formik.errors.country}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputAirportCode" label="Airport" className="mb-2">
                    <Form.Select
                        name="airportCode"
                        onChange={formik.handleChange}
                        value={formik.values.airportCode}>
                        {airports.map((airportCode) =>
                            <option key={airportCode} value={airportCode}>{airportCode}</option>
                        )}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{formik.errors.airport}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputYear" label="Year" className="mb-2">
                    <Form.Select
                        name="year"
                        onChange={formik.handleChange}
                        value={formik.values.year}>
                        {years.map((year) =>
                            <option key={year} value={year}>{year}</option>
                        )}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{formik.errors.year}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputMonth" label="Month" className="mb-2">
                    <Form.Select
                        name="month"
                        onChange={formik.handleChange}
                        value={formik.values.month}>
                        {months.map((month, index) =>
                            <option key={month} value={index}>{month}</option>
                        )}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{formik.errors.year}</Form.Control.Feedback>
                </FloatingLabel>
                <Col className="d-flex justify-content-center">
                    <Button variant="primary" type="submit" className='mt-2 col-12 col-lg-3'>
                        {(!covidFetching && !flightsFetching) ? 'Fetch Data' :
                            <div className="spinner-grow spinner-grow-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                    </Button>
                </Col>
            </Form>
        </div>
    )
}

export default DataSelectionForm;
