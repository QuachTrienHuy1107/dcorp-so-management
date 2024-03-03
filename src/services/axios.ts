import axios from 'axios';
import queryString from 'query-string';

export const BASE_URL = process.env.REACT_APP_BASE_URL

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    paramsSerializer: params => queryString.stringify(params)
});

axiosInstance.interceptors.response.use(response => {
    return response.data;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default axiosInstance;