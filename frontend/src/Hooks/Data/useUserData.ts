import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UserClient } from "../../Api/user";
import { Configurations } from "../../Config";

export function useUserData() {
    const userData = useQuery('user', UserClient.get, { cacheTime: 60000, staleTime: 60000 })

    return { user: userData.data, ...userData };
}

export function useLogin() {

    const [ loginData, setLoginData ] = useState<string | null>('');


    const savedLoginData = localStorage.getItem(Configurations.LOGIN_STATUS);

    useEffect(() => {
        setLoginData(savedLoginData)
    }, [ savedLoginData ])


    const setLogin = (data: any) => {
        localStorage.setItem(Configurations.LOGIN_STATUS, JSON.stringify(data));
        setLoginData(JSON.stringify(data))

    }

    const setLogout = () => {
        localStorage.removeItem(Configurations.LOGIN_STATUS)
        setLoginData(null)

    }

    return { loginData, setLogin, setLogout };
}