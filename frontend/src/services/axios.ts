import axios, { AxiosInstance } from 'axios'

export const axiosCreate: AxiosInstance = axios.create({
    baseURL: 'http://localhost:4000/'
})