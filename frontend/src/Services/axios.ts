import { InternalAxiosRequestConfig } from "axios"
import { Configurations } from "../Config"
import toast from 'react-hot-toast'
export const RequestInterceptor = (config: InternalAxiosRequestConfig) => {

    config.url = Configurations.baseUrl + config.url
    config.withCredentials = true;

    return config

}



export const onErrorResponseInterceptor = (error: any) => {

    if (error?.response?.data?.error?.name === "UnauthorizedError") return window.location.replace("/logout")

    if (error?.response?.data?.error?.code) {

        if (error.response.data.error.message) toast.error(error.response.data.error.message)

        throw error.response.data
    }

    return Promise.reject(error)


}