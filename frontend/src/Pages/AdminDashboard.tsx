import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Card } from "../Components/common/Card/card";
import { SpinnerWithText } from "../Components/common/Loader/SpinnerWithText";
import { useAdmin } from "../Hooks/Data/useAdmin";
import { useUserData } from "../Hooks/Data/useUserData";

export const AdminDashboard: React.FC = () => {
    const { elections, isError, isLoading, error } = useAdmin();

    const { user } = useUserData();

    if (isLoading)
        return (
            <div className="flex min-w-full min-h-full">
                <SpinnerWithText />
            </div>
        );

    if (isError) toast.error("Sorry, there was an error failed to load data please try again later.");

    if (isError || typeof elections !== "object")
        return (
            <div className="flex min-w-full min-h-full items-center justify-center">
                <Card>
                    <div className="font-bold whitespace-pre-wrap overflow-auto">
                        error : {JSON.stringify((error as any)?.response?.data) ?? "Something went wrong!"}
                    </div>
                </Card>
            </div>
        );

    if (elections?.length === 0)
        return (
            <div className="flex min-w-full min-h-full items-center justify-center">
                <Card>
                    <div className="font-bold whitespace-pre-wrap overflow-auto">Sorry no Request is available</div>
                </Card>
            </div>
        );

    return (
        <div className="flex flex-col w-full h-full pb-16 justify-center overflow-auto">
            <div>
                <h1 className="tex-lg font-bold px-6">
                    Hi {user?.name ?? user?.email}{" "}
                    {user?.role === "admin" && <span className="text-xs text-slate-400 px-3">admin</span>}
                </h1>
                {}
            </div>
            {elections.map((election) => {
                return (
                    <div className="w-full p-4 ">
                        <Link
                            to={
                                user?.role === "admin"
                                    ? `/admin/election/${election.id}`
                                    : election.status !== "active"
                                    ? `/election/${election.id}`
                                    : `/election/${election.id}/vote`
                            }
                            state={election}
                        >
                            <div className="cursor-pointer w-full shadow-md rounded-lg flex items-center gap-3 justify-between  border border-slate-200 p-4 transition-all delay-75 hover:scale-[1.005]">
                                <div className="w-full">
                                    <h3 className="text-lg font-bold capitalize">{election.title}</h3>
                                    <div>{election.description}</div>
                                    <div>{election.status}</div>
                                    <div>Starts on : {new Date(election.startingDate).toLocaleDateString()}</div>
                                    <div>Ends on : {new Date(election.endingDate).toLocaleDateString()}</div>
                                </div>
                                <div className="w-full">
                                    <div className="stats">
                                        <div className="stat">
                                            <div className="stat-figure text-secondary">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    className="inline-block w-8 h-8 stroke-current"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div className="stat-title">Votes</div>
                                            <div className="stat-value">{election._count.vote}</div>
                                            <div className="stat-desc">Total votes </div>
                                        </div>

                                        <div className="stat">
                                            <div className="stat-figure text-secondary">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    className="inline-block w-8 h-8 stroke-current"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div className="stat-title">Options</div>
                                            <div className="stat-value">{election.options.length}</div>
                                            <div className="stat-desc">↗︎ Number of options</div>
                                        </div>

                                        <div className="stat">
                                            <div className="stat-figure text-secondary">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    className="inline-block w-8 h-8 stroke-current"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div className="stat-title">Election Status</div>
                                            <div className="stat-value capitalize">{election.status}</div>
                                            <div className="stat-desc ">Current Election status</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};
