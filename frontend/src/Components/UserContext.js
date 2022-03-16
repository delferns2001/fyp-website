import React, { useEffect, useState, createContext } from "react";

export const UserContext = createContext({});

const initialformdata = {
    firstname: "",
    lastname: "",
    email: "",
    carbon_footprint_score: "",
};

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(initialformdata);
    const [token, setToken] = useState();

    const saveToken = (userToken) => {
        console.log("token added");
        setToken(userToken);
        localStorage.setItem("token", userToken);
    };

    const removeToken = () => {
        setToken();
        console.log("token removed");
        localStorage.removeItem("token");
    };

    const signIn = (userData) => {
        console.log("user added");
        try {
            setUser(JSON.parse(userData));
        } catch (error) {
            console.log(error);
            setUser(userData);
        }

        localStorage.setItem("user", userData);
    };

    const signOut = () => {
        console.log("user removed");
        setUser({});
        localStorage.removeItem("user");
    };

    useEffect(() => {
        const currentUser = localStorage.getItem("user");
        if (currentUser) {
            setUser(JSON.parse(currentUser));
        }
        const currentToken = localStorage.getItem("token");
        if (currentToken) {
            setToken(currentToken);
        }
    }, []);

    return (
        <UserContext.Provider
            value={{ user, token, signIn, signOut, saveToken, removeToken }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
export { UserProvider };
