import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAdminElection } from "../Hooks/Data/useAdminElection";

export const Vote: React.FC = () => {
    const { electionId } = useParams();

    const navigate = useNavigate();

    if (!electionId) return <div>Sorry something went wrong please go back</div>;

    const { isLoading, data, isError, error, update, addVote, getVote } = useAdminElection(electionId);

    const handleVote = async (option: API.Option) => {
        if (addVote.isLoading) return;

        try {
            const request = addVote.mutateAsync({
                electionId: Number(electionId),
                optionId: option.id,
            });

            toast.promise(request, {
                loading: "Registering your vote...",
                success: <b>Voted!</b>,
                error: <b>Could not Register your vote.</b>,
            });

            await request;

            //@ts-ignore
            navigate(-1, { replace: true });
        } catch (err) {}
    };
    return (
        <div className="w-full h-full flex flex-col items-center justify-center flex-1">
            <div className="flex justify-between items-center w-full">
                {/* @ts-ignore */}
                <Link className="btn btn-ghost" to={-1}>
                    back
                </Link>
                <h1 className="text-3xl text-center py-6 w-full font-bold">Register your Vote</h1>
            </div>
            <div className="divider p-4"></div>

            <div className="w-full px-6">
                <h2 className="text-2xl py-3 w-full px-4">{data?.title}</h2>
                <p className="text-xl py-3 w-full px-4">{data?.description}</p>

                <div>
                    {data?.options.length === 0 && <div>No Option has provided.</div>}
                    {getVote.data && <div className="text-xl italic capitalize text-error py-16 text-center">You are already casted your vote</div>}
                    {!getVote.data &&
                        data?.options?.map((option) => {
                            return (
                                <div className="flex items-center px-10 py-2">
                                    <div
                                        tabIndex={0}
                                        className="collapse w-full collapse-arrow border border-base-300 bg-base-100 rounded-box"
                                    >
                                        <div className="collapse-title text-xl font-medium">{option.title}</div>
                                        <div className="collapse-content">
                                            <p>{option.description}</p>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 w-1/5 flex items-center justify-center">
                                        <button className="btn btn-primary" onClick={() => handleVote(option)}>
                                            Vote
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
