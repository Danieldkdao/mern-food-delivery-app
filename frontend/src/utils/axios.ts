import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL
console.log(baseUrl);

const api = axios.create({
    baseURL: baseUrl
});

export default api;