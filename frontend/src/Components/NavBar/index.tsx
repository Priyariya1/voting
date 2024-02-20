import { useNavigate } from "react-router-dom";
import { useUserData } from "../../Hooks/Data/useUserData";

export const NavBar: React.FC = () => {
    const navigate = useNavigate();

    const { user } = useUserData();

    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        
                        {/* {user?.role === "admin" && (
                            <li>
                                <a className="text-primary" onClick={() => navigate("/admin")}>
                                    Elections
                                </a>
                            </li>
                        )} */}
                        <li>
                            <a onClick={() => navigate("/logout")} className="text-primary">
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl" onClick={() => navigate("/")}>
                    {import.meta.env.VITE_SITE_NAME}
                </a>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {/* {user?.role === "admin" && (
                        <li>
                            <a className="text-primary" onClick={() => navigate("/admin")}>
                            Elections
                            </a>
                        </li>
                    )} */}
                    <li>
                        <a onClick={() => navigate("/logout")} className="text-primary">
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
       
        </div>
    );
};
