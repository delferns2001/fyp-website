import React, { useEffect, useState, createContext } from "react";

export const UserContext = createContext({});

const initialformdata = {
    name: "",
    surname: "",
    email: "",
    password: "",
    token: "",
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
        setUser(userData);
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
        console.log(currentUser, currentToken);
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
