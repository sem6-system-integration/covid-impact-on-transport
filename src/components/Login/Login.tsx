import React, {FC, useState} from 'react';
import axios from "../../api/axios";


interface LoginProps {
}

const Login: FC<LoginProps> = () => {
    const [data, setData] = useState({login: "", password: ""})
    const [error, setError] = useState("")

    const handleChange = ({currentTarget: input}: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [input.name]: input.value})
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const {data: res} = await axios.post("auth", data)
            localStorage.setItem("token", res.data)
            window.location.href = "/"
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
                    <label className="form-label">Login</label>
                    <input type="email" name="email" className="form-control" required
                           onChange={handleChange} value={data.login}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" required
                           onChange={handleChange} value={data.password}/>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
