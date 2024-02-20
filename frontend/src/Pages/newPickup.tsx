import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CardActions } from "../Components/common/Card/cardActions";
import { CardTitle } from "../Components/common/Card/cardTitle";
import { usePickup } from "../Hooks/Data/usePickups";

export const CreatePickup: React.FC = () => {
    const navigate = useNavigate();

    const { createPickupMutation: pickupMutation } = usePickup();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        const entries = {} as { [key: string]: string };

        for (const entry of formData.entries()) {
            const value = entry[1] as string;

            const key = entry[0];

            if (!value) return toast.error(`${key} can't be empty`);

            entries[key] = value;
        }

        const { address, quantity } = entries;

        try {
            await pickupMutation.mutateAsync({ address, quantity: Number(quantity) });

            toast.success("Thank you for donating food!");

            navigate(-1);
        } catch (error: any) {
            if (error.message) return toast.error(error.message);

            toast.error("Sorry failed to submit new request, please try again later.");

            console.error(error);
        }
    };
    return (
        <div className="min-w-full min-h-full flex items-center justify-center flex-col">
            <h1 className="text-3xl font-bold pb-6">Add New Pickup Request</h1>
            <div className="card w-5/6 lg:card-side bg-base-100 shadow-xl">
                <figure>
                    <img src="/assets/Fighting_Hunger_in_India-530x353.jpg" alt="Album" />
                </figure>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="py-3">
                            <input
                                type="number"
                                min={1}
                                max={100}
                                defaultValue={20}
                                className="input input-bordered input-primary w-full "
                                placeholder="Quantity"
                                name="quantity"
                                required
                            />
                        </div>
                        <div className="py-3">
                            <textarea
                                className="textarea textarea-primary w-full "
                                placeholder="Address"
                                name="address"
                                required
                            />
                        </div>
                        <CardActions>
                            <button className="btn btn-outline btn-primary" type="button" onClick={() => navigate(-1)}>
                                Back
                            </button>
                            <button className="btn btn-primary" type="submit">
                                Submit
                            </button>
                        </CardActions>
                    </form>
                </div>
            </div>
        </div>
    );
};
