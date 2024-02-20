interface CardTitle {
    children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitle> = ({ children }) => {
    return <h2 className="card-title">{children}</h2>;
};
