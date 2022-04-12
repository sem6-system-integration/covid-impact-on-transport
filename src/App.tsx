import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Flights from "./components/Flights/Flights";

function App() {
    const token = localStorage.getItem("token")

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home/>}/>

                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>

                <Route path="/flights" element={<Flights/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
