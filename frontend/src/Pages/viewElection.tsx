import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAdminElection } from "../Hooks/Data/useAdminElection";
import { useUserData } from "../Hooks/Data/useUserData";

export const ElectionView: React.FC = () => {
    const { electionId } = useParams();

    const navigate = useNavigate()

    if (!electionId) return <div>Sorry something went wrong please go back</div>;

    const { isLoading, data, isError, error, update,deleteElection } = useAdminElection(electionId);

    const { user } = useUserData();

    const { isLoading: isUpdating } = update;

    ChartJS.register(ArcElement, Tooltip, Legend);
    ChartJS.register(BarElement, LinearScale, Title, CategoryScale);

    const chartData = {
        labels: data?.options.map((option) => option.title),
        datasets: [
            {
                label: "Votes",
                data: data?.options.map((option) => option._count.vote),
                hoverOffset: 20,
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Votes",
            },
        },
    };

    const statusOptions = ["pending", "active", "completed", "canceled"];

    const handleStatusChange = async (status: string) => {
        if (!data) return;

        const { title, description } = data;

        const options = data.options.map((option) => {
            const { title, description, id } = option;

            return { title, description, id };
        });

        const newData = { title, description, status, electionId, options };
        try {
            const request = update.mutateAsync(newData);

            toast.promise(request, {
                loading: "changing status...",
                success: <b>status changed!</b>,
                error: <b>Could not change status.</b>,
            });

            await request;
        } catch (err) {}
    };

    const handleDelete = async ()=>{
        try{

            await deleteElection.mutateAsync(Number(electionId));

            navigate(-1)

            toast.error("deleted election");

        }catch (err) {
            toast.error("failed to delete");
        }
    }


    if (isLoading) return <div className="w-full h-full flex text-center p-16 justify-center">Loading data...</div>;
    if (isError)
        return (
            <div className="w-full h-full flex text-center p-16 justify-center">
                Error occurred while loading data :{JSON.stringify(error)}{" "}
            </div>
        );
    if (!data) return <div>No data found for this election</div>;

    return (
        <div className="w-full">
            <h1 className="w-full  p-4 text-2xl font-bold flex justify-between">
                Statistics
                <div>
                    {/* @ts-ignore */}
                    <Link className="btn btn-ghost" to={-1}>
                        back
                    </Link>
                    {user?.role === "admin" && (
                        <>
                            <Link to={`/admin/election?electionId=${data.id}`}>
                                <button className="btn btn-ghost">Edit</button>
                            </Link>
                            <Link to={`/election/${data.id}/vote`}>
                                <button className="btn btn-ghost">Cast Vote</button>
                            </Link>
                            <button className="btn btn-ghost " onClick={handleDelete}>Delete</button>

                        </>
                    )}
                </div>
            </h1>
            <div className="w-full flex items-stretch justify-around gap-2 py-6 px-16">
                <div className="w-full flex max-w-[20vw]">
                    <Doughnut data={chartData} />
                </div>
                <div className="w-full flex max-w-[40vw]">
                    <Bar options={options} data={chartData} />
                </div>
            </div>

            <div>
                <div className="w-full flex justify-center">
                    <div className="stats flex w-2/3 items-center justify-center">
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
                            <div className="stat-value">{data._count.vote}</div>
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
                            <div className="stat-value">{data.options.length}</div>
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
                            <div className="stat-value capitalize">{data.status}</div>
                            <div className="stat-desc ">Current Election status</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="divider p-4"></div>
            <h2 className="text-2xl font-bold p-4">Election Details </h2>
            <div className="w-full py-6 px-16">
                <div className="py-4">
                    <h2 className="text-lg font-bold">Title</h2>
                    <p>{data.title}</p>
                </div>
                <div className="py-4">
                    <h2 className="text-lg font-bold">Description</h2>
                    <p>{data.description}</p>
                </div>
                {user?.role === "admin" && (
                    <div className="py-4">
                        <h2 className="text-lg font-bold">Status</h2>
                        <p className="py-2">
                            <select
                                className="select select-primary w-full max-w-xs"
                                onChange={(e) => handleStatusChange(e.target.value)}
                                disabled={isUpdating}
                            >
                                {statusOptions.map((status) => (
                                    <option selected={data.status === status}>{status}</option>
                                ))}
                            </select>
                        </p>
                    </div>
                )}
                <div className="pt-4 pb-16">
                    <h2 className="text-lg font-bold">Options</h2>
                    <ul>
                        {data.options.map((option) => {
                            return (
                                <li tabIndex={0} className="collapse collapse-arrow  bg-base-100 rounded-box">
                                    <div className="collapse-title text-xl font-medium flex justify-between max-w-4xl">
                                        <span>{option.title}</span>
                                        <span>Votes : {option._count.vote}</span>
                                    </div>
                                    <div className="collapse-content">
                                        <p>{option.description}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};
