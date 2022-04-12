import React, {FC, useState} from 'react';
import axios from "../../api/axios";
import {useNavigate} from "react-router-dom";


interface RegisterProps {
}

const Register: FC<RegisterProps> = () => {
    const [data, setData] = useState({
        username: "",
        password: "",
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = ({currentTarget: input}: React.FormEvent<HTMLInputElement>) => {
        setData({...data, [input.name]: input.value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const {data: res} = await axios.post("users", data)
            console.log(res)
            navigate("/login")
        } catch (error: any) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div
            className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 mx-auto my-auto bg-light rounded-3 p-5 shadow">
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" name="username" className="form-control" required
                           onChange={handleChange} value={data.username}/>
                    <div className="form-text">We'll never share your login details with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" required
                           onChange={handleChange} value={data.password}/>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
