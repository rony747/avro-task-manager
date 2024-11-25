import React from "react";

const Heading = ({ children }: { children: React.ReactNode }) => {
    return (
        <h2 className="text-xl font-semibold text-white mb-4">
            {children}
        </h2>
    );
};

export default Heading;