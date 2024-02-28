
/**
 * Page description component
 * @param {*} param0 
 * @returns 
 */
export const PageDescription = ({ children }) => {
    return (
        <div className="container mt-4">
            <p className="lead">{children}</p>
        </div>
    );
};
