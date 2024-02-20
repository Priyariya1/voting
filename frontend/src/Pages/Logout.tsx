import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useNavigation } from "react-router-dom";
import { UserClient } from "../Api/user";
import { Configurations } from "../Config";
import { useLogin } from "../Hooks/Data/useUserData";

export const Logout: React.FC = () => {
    const navigate = useNavigate();

    const {setLogout} = useLogin()

    useEffect(() => {
        logout();
    }, []);

    const logout = async () => {
        try {
            await UserClient.logout();

            setLogout();

            navigate("/login",{replace:true});
        } catch (err) {
            toast.error("Failed to logout. please refresh this page;");
        }
    };

    return (
        <div className="flex p-4 w-full h-full items-center justify-center min-w-screen min-h-screen">
            <h1 className="loading">You are being logged out......</h1>
        </div>
    );
};
