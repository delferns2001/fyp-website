import { useContext } from "react";
import { Outlet } from "react-router-dom";
import LoginForm from "./LoginForm";
import UserContext from "./UserContext";

const useAuth = () => {
    const { token } = useContext(UserContext);

    const user = {
        loggedin: token !== null && token !== "" && token !== undefined,
    };
    return user && user.loggedin;
};

const ProtectedRoutes = (props) => {
    const isAuth = useAuth(props);
    return isAuth ? <Outlet /> : <LoginForm></LoginForm>;
};
export { ProtectedRoutes, useAuth };
