const axiosAPI = require('axios');

const axios = axiosAPI.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 60_000,
    headers: {
        'Content-Type': 'application/json',
    },
});

(async () => {
    const token = localStorage.getItem('token');
    if (token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else
        delete axios.defaults.headers.common['Authorization'];
})();

export default axios;