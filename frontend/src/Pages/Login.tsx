import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserClient } from "../Api/user";
import { Configurations } from "../Config";
import { useLogin } from "../Hooks/Data/useUserData";

export const Login: React.FC = () => {
    const navigate = useNavigate();

    const { loginData, setLogin } = useLogin();

    const queryClient = useQueryClient();

    if (loginData) navigate("/", { replace: true });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        const entries = {} as { [key: string]: string };

        for (const entry of formData.entries()) {
            const key = entry[0];

            entries[key] = entry[1] as string;
        }

        const { email, password } = entries;

        try {
            const response = await UserClient.auth({ email, password });

            setLogin(response);

            queryClient.invalidateQueries("user");

            navigate("/", { replace: true });
        } catch (error: any) {
            toast.error("Failed to login please try again!");
            console.error(error);
        }
    };

    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center gap-5">
            <div>
                <div className="text-2xl font-bold pb-6 text-primary">Organisation and Education institution options</div>
                <figure>
                    <img className="max-h-[80vh]" src="/assets/undraw_projections_re_ulc6.svg" alt="Shoes" />
                </figure>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <h2 className="card-title text-center">Login</h2>
                        <div className="py-3">
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="input input-bordered input-primary w-full max-w-xs"
                                />
                            </div>
                            <div className="py-3">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    current-password={true}
                                />
                            </div>
                        </div>
                        <div className="card-actions justify-end">
                            <button
                                className="btn btn-ghost text-primary"
                                type="button"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </button>
                            <button className="btn btn-primary" type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
