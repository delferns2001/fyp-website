// import { useState, useEffect } from "react";

// function useUser() {
//     const [user, setUser] = useState(getUser());

//     function getUser() {
//         const User = localStorage.getItem("user");
//         return User && User;
//     }

//     function saveUser(user) {
//         localStorage.setItem("user", user);
//         setUser(user);
//     }

//     useEffect(() => {
//         // on first load
//         // to-do: look up session id, and check with the back-end if not expired

//         const currentUser = localStorage.removeItem("user");
//     }, []);

//     return {
//         user,
//         saveUser: saveUser,
//         getUser: getUser,
//     };
// }

// export default useUser;

import { createContext } from "react";

export const UserContext = createContext(null);
