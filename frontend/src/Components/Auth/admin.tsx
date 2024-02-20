import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Configurations } from "../../Config";
import { useUserData } from "../../Hooks/Data/useUserData";
import { NavBar } from "../NavBar";

interface RequireToBeAdmin {}

export const RequireToBeAdmin: React.FC<RequireToBeAdmin> = ({}) => {
    const navigate = useNavigate();

    const { user } = useUserData();

    if (user && user?.role !== "admin") navigate("/",{replace:true});

    return <Outlet />;
};
