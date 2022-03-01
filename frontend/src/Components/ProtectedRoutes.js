import { Outlet } from "react-router-dom";
import LoginForm from "./LoginForm";

const useAuth = (props) => {
    console.log(props);
    const user = {
        loggedin:
            props.token !== null &&
            props.token !== "" &&
            props.token !== undefined,
    };
    console.log(props.token);
    console.log(user.loggedin);
    return user && user.loggedin;
};

const ProtectedRoutes = (props) => {
    console.log(props);
    const isAuth = useAuth(props);
    return isAuth ? <Outlet /> : <LoginForm></LoginForm>;
};
export { ProtectedRoutes, useAuth };
