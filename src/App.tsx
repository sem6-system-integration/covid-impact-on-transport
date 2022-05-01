import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Flights from "./components/Flights/Flights";

export const TokenContext = React.createContext<{ token: string; setToken: Dispatch<SetStateAction<string>>; }>(
    {
        token: '',
        setToken: () => {
        }
    }
);

function App() {
    const [token, setToken] = useState<string>(localStorage.getItem('jwtToken') ?? '');

    useEffect(() => {
        document.title = "Covid impact on transport"
    }, []);

    return (
        <TokenContext.Provider value={{token, setToken}}>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login redirectTo="/"/>}/>

                    {token && <Route path="/flights" element={<Flights/>}/>}
                    <Route path="/flights" element={<Navigate replace to="/login"/>}/>
                </Routes>
            </Layout>
        </TokenContext.Provider>
    );
}

export default App;
