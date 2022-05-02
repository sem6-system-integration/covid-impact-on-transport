import React, {FC, useContext, useState} from 'react';
import useAxios from "../../hooks/useAxios";
import {TokenContext} from "../../App";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as yup from "yup";
import {Alert, Button, Col, FloatingLabel, Form} from "react-bootstrap";

const loginValidationSchema = yup.object().shape({
    username: yup.string().required().label('Username'),
    password: yup.string().required().label('Password')
});

interface LoginProps {
    redirectTo: string;
}

const Login: FC<LoginProps> = ({redirectTo}) => {
    const {setToken} = useContext(TokenContext)
    const axios = useAxios()
    const navigate = useNavigate()
    const [serverError, setServerError] = useState<string>('')

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: values => {
            axios.post("auth/login", values)
                .then(response => {
                    const token = response.data.split(" ")[1]
                    setToken(token)
                    localStorage.setItem("jwtToken", token)
                    navigate(redirectTo, {replace: true})
                })
                .catch(error => {
                    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                        setServerError("Wrong username or password")
                    }
                })
        },
    });

    return (
        <Col xs={11} sm={8} md={6} lg={5} xl={4} xxl={3} className="mx-auto my-auto bg-light rounded-3 p-5 shadow">
            <h3 className="mb-4">Sign In</h3>
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
                <Form.Group className="d-grid mt-4">
                    <Button type="submit" variant="primary">Sign In</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default Login;
