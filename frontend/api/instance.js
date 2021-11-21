import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
const baseUrl = 'http://192.168.1.5:3000'

const config = {
    baseURL: baseUrl,
    headers: {
    }
};

const axiosInstance = axios.create(config);

export default axiosInstance;
