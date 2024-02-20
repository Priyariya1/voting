interface CardActions {
    children: React.ReactElement | React.ReactElement[];
}

export const CardActions: React.FC<CardActions> = ({ children }) => {
    return <div className="card-actions justify-end">{children}</div>;
};
