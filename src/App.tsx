import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Flights from "./components/Flights/Flights";

function App() {
    let token = localStorage.getItem("token")
    // check if token is expired
    if (token) {
        let payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem("token")
            token = null
        }
    }

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home/>}/>

                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>

                {token && <Route path="/flights" element={<Flights/>}/>}
                <Route path="/flights" element={<Navigate replace to="/login"/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
