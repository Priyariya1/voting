export const SpinnerWithText: React.FC = () => {
    return (
        <div className="loading text-xl w-full  flex gap-4 items-center justify-center">
            {/* <div className="radial-progress animate-spin text-primary" style={{ "--value": "70", "--size": "1rem", "--thickness": "4px" }}></div> */}
            loading...
        </div>
    );
};
