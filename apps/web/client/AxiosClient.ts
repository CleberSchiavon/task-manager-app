import axios, { AxiosError } from 'axios'

const AxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

AxiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

const isAxiosError = (error: unknown): error is AxiosError => {
    return axios.isAxiosError(error);
  };


export { AxiosClient, isAxiosError }