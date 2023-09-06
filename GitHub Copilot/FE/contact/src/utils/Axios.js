// Create a new axios instance with a custom config.

import axios from 'axios';

// You can add config here
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
// Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Do something before request is sent
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//     return config;
//   },
//   (error) =>
//     // Do something with request error
//     Promise.reject(error)
// );
// Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) =>
//     // Do something with response data
//     response,
//   (error) =>
//     // Do something with response error
//     Promise.reject(error)
// );
export default axiosInstance;
