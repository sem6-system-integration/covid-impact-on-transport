import React, {FC, useState} from 'react';
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";
import useAxios from "../../hooks/useAxios";
import {useFormik} from "formik";
import {Alert, Button, ButtonGroup, Col, FloatingLabel, Form} from 'react-bootstrap';

YupPassword(yup);
const registerValidationSchema = yup.object().shape({
    username: yup.string().required().min(4).max(32).label('Username'),
    password: yup.string().required().password().label('Password'),
});

interface RegisterProps {
}

const Register: FC<RegisterProps> = () => {
    const axios = useAxios()
    const navigate = useNavigate()
    const [serverError, setServerError] = useState<string>('')

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            accountType: 'STANDARD'
        },
        validationSchema: registerValidationSchema,
        onSubmit: values => {
            axios.post("users", values)
                .then(() => {
                    navigate("/login")
                })
                .catch(error => {
                    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                        setServerError("Internal server error")
                    }
                })
        },
    });

    return (
        <Col xs={11} sm={8} md={6} lg={5} xl={4} xxl={3} className="mx-auto my-auto bg-light rounded-3 p-5 shadow">
            <h3 className="mb-4">Sign Up</h3>
            {serverError && <Alert variant="danger" className="text-center">{serverError}</Alert>}
            <Form onSubmit={formik.handleSubmit} noValidate>
                <FloatingLabel controlId="inputUsername" label="Username" className="mb-3">
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={formik.touched.username && !!formik.errors.username}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputPassword" label="Password" className="mb-3">
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={formik.touched.password && !!formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </FloatingLabel>
                <Form.Group className="mb-3">
                    {/*<Form.Label htmlFor="inputAccountType">Account type</Form.Label>*/}
                    <ButtonGroup className="mb-3 d-flex" id="inputAccountType">
                        <Button
                            name="accountType"
                            variant="outline-primary"
                            active={formik.values.accountType === 'STANDARD'}
                            value={'STANDARD'}
                            onClick={formik.handleChange}>
                            Standard
                        </Button>
                        <Button
                            name="accountType"
                            variant="outline-primary"
                            active={formik.values.accountType === 'PREMIUM'}
                            value={'PREMIUM'}
                            onClick={formik.handleChange}>
                            Premium
                        </Button>
                    </ButtonGroup>
                </Form.Group>
                <Form.Group className="d-grid mt-4">
                    <Button type="submit" variant="primary">Sign Up</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default Register;
