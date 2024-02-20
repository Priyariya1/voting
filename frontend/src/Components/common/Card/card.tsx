interface Card {
    children: React.ReactNode;
}

export const Card: React.FC<Card> = ({ children }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};
