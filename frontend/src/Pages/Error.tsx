import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as any;

    console.error(error);

    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center flex-col">
            <h1 className="text-4xl font-bold text-primary p-6" >😦 Oops.............! </h1>
            <p className="text-xl ">Sorry, an unexpected error has occurred, please go back to previous page.</p>
            <p className="text-slate-600 py-6">
                <i>{error?.statusText || error?.message}</i>
            </p>
        </div>
    );
}
