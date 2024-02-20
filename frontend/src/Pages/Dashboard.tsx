import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { Card } from "../Components/common/Card/card";
import { CardActions } from "../Components/common/Card/cardActions";
import { SpinnerWithText } from "../Components/common/Loader/SpinnerWithText";
import { usePickup } from "../Hooks/Data/usePickups";

export const Dashboard: React.FC = () => {
    const { pickups, isError, isLoading, error, deleteMutation } = usePickup();

    const { isLoading: isDeleting, mutateAsync } = deleteMutation;

    const [filters, setFilter] = useState(new Set<string>());

    let [searchParams, setSearchParams] = useSearchParams();

    const activeFilter = searchParams.get("status") ?? "";

    const sort = searchParams.get("sort") ?? "desc";

    console.log({ pickups });

    const filteredItems =
        pickups?.filter((pickup) => {
            if (!activeFilter) return true;
            return activeFilter.toLowerCase() === pickup.status.toLowerCase();
        }) ?? [];

    const sortedItems = filteredItems?.sort((item1, item2) => {
        if (sort === "asc") return new Date(item1.createdAt) < new Date(item2.createdAt) ? -1 : 1;
        return new Date(item1.createdAt) < new Date(item2.createdAt) ? 1 : -1;
    });

    useEffect(() => {
        if (!pickups) return;

        const filters = new Set<string>();

        pickups?.forEach((pickup) => filters.add(pickup.status));

        setFilter(filters);
    }, [pickups]);

    const applyFilter = (key: string, value: string) => {
        searchParams.set(key, value);

        setSearchParams(searchParams);
    };

    const handleCancel = async (pickupId: number) => {
        try {
            await mutateAsync(pickupId);

            toast.success('Pickup cancelled!')
        } catch (err) {
            toast.error("Failed to cancel Pickup please try again later");

            console.log(err);
        }
    };

    if (isError) toast.error("Sorry, there was an error failed to load data please try again later.");

    return (
        <div className="flex flex-col min-w-full min-h-full pb-10">
            {pickups && (
                <div className="w-full flex px-3">
                    <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className="btn m-1 btn-outline btn-primary">
                            Sort
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a onClick={() => applyFilter("sort", "asc")}>Old - New</a>
                            </li>
                            <li>
                                <a onClick={() => applyFilter("sort", "desc")}>New - Old</a>
                            </li>
                        </ul>
                    </div>
                    {filters.size > 0 && (
                        <div className="dropdown dropdown-hover">
                            <label tabIndex={0} className="btn m-1 btn-outline btn-primary">
                                {activeFilter ? activeFilter : "All"}
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                {[null, ...filters].map((filter) => (
                                    <li>
                                        {" "}
                                        <a className="capitalize" onClick={() => applyFilter("status", filter ?? "")}>
                                            {filter ?? "All"}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            <div className="w-full h-full flex flex-wrap justify-evenly gap-3 items-start">
                {isError && <div>error : {JSON.stringify((error as any)?.response?.data)}</div>}

                {isLoading && <SpinnerWithText />}

                {sortedItems.length ===0 && <div>No Pickup found</div>}

                {sortedItems?.map((pickup) => {

                    return (
                        <Card>
                            <div className="flex justify-between">
                                <label>Status</label>
                                <strong className="capitalize">{pickup.status}</strong>
                            </div>
                            <div className="flex justify-between">
                                <label>Quantity</label>
                                <strong>{pickup.quantity}</strong>
                            </div>
                            <div className="flex justify-between">
                                <label>Requested At</label>
                                <strong className="first-letter:capitalize">
                                    {moment(pickup.createdAt).fromNow()}
                                </strong>
                            </div>

                            <div tabIndex={0} className="collapse collapse-arrow">
                                <div className="collapse-title p-0 cursor-pointer">Address</div>
                                <div className="collapse-content">
                                    {pickup.address.split("\n").map((line) => (
                                        <p>{line}</p>
                                    ))}
                                </div>
                            </div>

                            {pickup.status === "pending" && (
                                <CardActions>
                                    <button className="btn btn-error" onClick={()=>handleCancel(pickup.id)}>
                                        Cancel
                                    </button>
                                </CardActions>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
