import React, { useEffect, useState, createContext } from "react";

export const TokenContext = createContext({});

const TokenProvider = ({ children }) => {
    const [token, setToken] = useState({ token: "" });

    const saveToken = (userToken) => {
        setToken(userToken);
        localStorage.setItem("token", userToken);
    };

    const removeToken = () => {
        setToken({});
        console.log("hi");
        localStorage.removeItem("token");
    };

    // useState React hook
    useEffect(() => {
        // on first load
        // to-do: look up session id, and check with the back-end if not expired

        const token = localStorage.getItem("token");
        if (token) {
            setToken(JSON.parse(token));
        }
    }, []);

    return (
        <TokenContext.Provider value={{ token, saveToken, removeToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export default TokenContext;
export { TokenProvider };
