import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAdmin } from "../Hooks/Data/useAdmin";
import { useAdminElection } from "../Hooks/Data/useAdminElection";

interface option {
    title: string;
    description: string;
    id: string | number;
}

export const Election: React.FC = () => {
    const { addMutation } = useAdmin();

    const [searchParams] = useSearchParams();

    const electionId = searchParams.get("electionId") ?? "";

    const { data, update, deleteOption } = useAdminElection(electionId);

    const navigate = useNavigate();

    const { isLoading, mutateAsync } = addMutation;

    const [title, setTitle] = useState("");

    const [startTime, setStartTime] = useState("");

    const [endTime, setEndTime] = useState("");

    const [description, setDescription] = useState("");

    const [options, setOptions] = useState<option[]>([]);

    useEffect(() => {
        setDescription(data?.description ?? "");

        setTitle(data?.title ?? "");

        setStartTime(data?.startingDate ?? '')
        setEndTime(data?.endingDate ?? '')

        const loadedOptions =
            data?.options.map((option) => {
                const { description, id, title } = option;

                return { description, id, title };
            }) ?? [];

        setOptions(loadedOptions);
    }, [electionId, data]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        const entries = {} as { [key: string]: string };

        for (const entry of formData.entries()) {
            const key = entry[0];

            const value = entry[1];

            if (value === "") return toast.error(`${key} can't be empty!`);

            entries[key] = entry[1] as string;
        }

        const { title, description } = entries;

        setOptions((old) => [...old, { title, description, id: `newItem__${Math.random().toString()}` }]);

        (event.target as HTMLFormElement).reset();
    };

    const handleContentEdit = (option: option) => {
        const newOptions = options.map((item) => {
            if (item.id === option.id) return option;

            return item;
        });
        setOptions(newOptions);
    };

    const handleCreateElection = async () => {
        if (!title) return toast.error("title cant be empty");

        if (!description) return toast.error("Description cant be empty");

        if (options.length < 2)
            return toast.error("Are you sure? There is no meaning in conducting an election with only one option");

        options?.forEach((option, index) => {
            if (!option.title) return toast.error(`option number ${index + 1}'s title can't be empty`);
            if (!option.description) return toast.error(`option number ${index + 1}'s description can't be empty`);
        });

        if (electionId) return updateElection();

        try {
            const payload = {
                title,
                description,
                startTime,endTime,
                options: options.map((item) => ({ title: item.title, description: item.description })),
            };

            await mutateAsync(payload);

            console.log(1111111)

            toast.success(`${title} has been created!`);
            //@ts-ignore
            navigate(-1, { replace: true });
        } catch (err: any) {
            console.log(err);
            toast.error(err?.error?.message ?? "Failed to create new election please try again");
        }
    };

    const updateElection = async () => {
        if (!data) return;

        try {
            const payload = {
                title,
                description,
                electionId,
                status: data?.status,
                options: options.map((item) => {
                    if (item.id.toString().indexOf("newItem__") > -1)
                        return { title: item.title, description: item.description };

                    return item;
                }),
            };

            //@ts-ignore
            await update.mutateAsync(payload);

            toast.success(`${title} has been created!`);
            //@ts-ignore
            navigate(-1, { replace: true });
        } catch (err: any) {
            console.log(err);
            toast.error(err?.error?.message ?? "Failed to create new election please try again");
        }
    };

    const handleDeleteOption = async (option: option) => {
        if (option.id.toString().indexOf("newItem__") === -1 && electionId) {
            const request = deleteOption.mutateAsync(Number(option.id));

            toast.promise(request, {
                loading: "Deleting option...",
                success: <b>Option deleted!</b>,
                error: <b>Could not delete option.</b>,
            });

            await request;

            return;
        }
        const newOptions = options.filter((item) => item.id !== option.id);

        setOptions(newOptions);
    };

    return (
        <div className="p-4 flex w-full">
            <div className="w-full">
                <div className="w-full items-center flex pb-4">
                    {/* @ts-ignore */}
                    <Link className="btn btn-ghost" to={-1}>
                        back
                    </Link>
                    <h2 className=" w-full text-xl font-bold text-secondary text-center ">Create Election</h2>
                </div>

                <div className="w-full">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="input input-bordered w-full input-primary"
                        />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="textarea textarea-bordered h-24"
                            placeholder="Description"
                        ></textarea>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Start time</span>
                        </label>
                        <input
                            type="datetime-local"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            placeholder="Title"
                            className="input input-bordered w-full input-primary"
                        />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">End Time</span>
                        </label>
                        <input
                            type="datetime-local"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            placeholder="Ending date"
                            className="input input-bordered w-full input-primary"
                        />
                    </div>
                    <div className="flex justify-end py-4">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className={`btn btn-primary ${isLoading ? "loading" : ""}`}
                            onClick={handleCreateElection}
                        >
                            {electionId ? "Update" : "Create"} Election
                        </button>
                    </div>
                    <div className="flex gap-3 py-3">
                        <div className="w-full flex flex-col gap-4">
                            {options.length === 0 && (
                                <div className="whitespace-nowrap text-center pt-8 text-error italic">
                                    -- Create some options --
                                </div>
                            )}
                            {options?.map((option) => {
                                return (
                                    <div className="relative card w-full bg-base-100 shadow-xl  border-secondary border">
                                        <button
                                            className="absolute -top-4 -right-4 btn-secondary btn btn-circle btn-sm"
                                            onClick={() => handleDeleteOption(option)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                        <div className="card-body p-2">
                                            <div
                                                contentEditable
                                                className="text-secondary p-1"
                                                onBlur={(e) =>
                                                    handleContentEdit({ ...option, title: e.target.innerText })
                                                }
                                            >
                                                {option.title}
                                            </div>
                                            <div
                                                contentEditable
                                                className="text-slate-500 p-1"
                                                onBlur={(e) =>
                                                    handleContentEdit({ ...option, description: e.target.innerText })
                                                }
                                            >
                                                {option.description}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div className="w-full p-4">
                            <h2 className="text-lg font-bold text-secondary">Add Option</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text">Candidate</span>
                                    </label>
                                    <input
                                        name="title"
                                        required
                                        type="text"
                                        placeholder="Candidate"
                                        className="input input-bordered w-full input-primary"
                                    />
                                </div>
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea
                                        required
                                        name="description"
                                        className="textarea textarea-bordered h-24"
                                        placeholder="Description"
                                    ></textarea>
                                </div>
                                <div className="py-2">
                                    <button type="submit" className="btn btn-secondary">
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
