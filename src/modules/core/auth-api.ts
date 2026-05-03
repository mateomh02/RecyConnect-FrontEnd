import axios from "axios";
import { API_URL, useBoundStore } from "./lib";

export const recyConnectApi = axios.create({
    baseURL: API_URL
})

recyConnectApi.interceptors.response.use(
    (res) => res.data,
    (error) => Promise.reject(error)
)

recyConnectApi.interceptors.request.use((config) => {
    const { token: accessToken } = useBoundStore.getState()
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})
