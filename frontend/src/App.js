// import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import { Button, Container } from "react-bootstrap";

import Model from "./Components/Model";
import TopNavBar from "./Components/Navbar";
import Homepage from "./Components/HomePage";
import Backendfetch from "./Components/backendtest";
import LoginForm from "./Components/LoginForm";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignUpForm from "./Components/Signupform";
import useToken from "./Components/useToken";
import Header from "./Components/Header";
import Profile from "./Components/Profile";
import { ProtectedRoutes } from "./Components/ProtectedRoutes";

function App() {
    const { token, removeToken, setToken } = useToken();

    // return (
    //     <Router>
    //         <Container fluid className="h-100 p-0 d-flex flex-column">
    //             <TopNavBar />
    //             <Container
    //                 fluid
    //                 className="h-10"
    //                 style={{ height: "calc(100% - 76px)" }}
    //             >
    //                 <Routes>
    //                     <Route
    //                         path="/members"
    //                         element={<Backendfetch />}
    //                     ></Route>
    //                     <Route path="/" element={<Homepage />}></Route>
    //                     <Route path="/classify" element={<Model />}></Route>
    //                     <Route
    //                         path="/contact-me"
    //                         element={<Backendfetch />}
    //                     ></Route>
    //                     <Route
    //                         path="/login-form"
    //                         element={<LoginForm />}
    //                     ></Route>
    //                     <Route
    //                         path="/signup-form"
    //                         element={<SignUpForm />}
    //                     ></Route>
    //                 </Routes>
    //             </Container>
    //             {/* <Footer /> */}
    //         </Container>
    //     </Router>
    // );

    return (
        <BrowserRouter>
            <div className="App">
                <TopNavBar token={token} removeToken={removeToken} />
                <Routes>
                    {/* <Route
                        path="/login-form"
                        element={<LoginForm setToken={setToken} />}
                    ></Route> */}
                    <Route path="/" element={<Homepage />}></Route>
                    <Route path="/signup-form" element={<SignUpForm />}></Route>
                    <Route path="/classify" element={<Model />}></Route>

                    {token === null ? (
                        <Route
                            path="/login-form"
                            element={<LoginForm />}
                        ></Route>
                    ) : (
                        <Route
                            path="/login-form"
                            element={<Homepage />}
                        ></Route>
                    )}

                    <Route element={<ProtectedRoutes token={token} />}>
                        <Route
                            exact
                            path="/profile"
                            element={
                                <>
                                    <Header token={removeToken} />

                                    <Profile
                                        token={token}
                                        setToken={setToken}
                                    />
                                </>
                            }
                        ></Route>
                        <Route
                            path="/contact-me"
                            element={<Backendfetch />}
                        ></Route>
                    </Route>
                </Routes>
                {/* <Button onClick={() => console.log(token)}>print token</Button> */}
                {/* <Routes>
                    {!token && token !== "" && token !== undefined ? (
                        <Route
                            path="/login-form"
                            element={<LoginForm setToken={setToken} />}
                        ></Route>
                    ) : (
                        <>
                            <Route path="/" element={<Homepage />}></Route>
                            <Route
                                path="/login-form"
                                element={<LoginForm />}
                            ></Route>
                            <Route
                                path="/signup-form"
                                element={<SignUpForm />}
                            ></Route>
                            <Route
                                exact
                                path="/profile"
                                element={
                                    <>
                                        <Header token={removeToken} />

                                        <Profile
                                            token={token}
                                            setToken={setToken}
                                        />
                                    </>
                                }
                            ></Route>
                            <Route
                                path="/members"
                                element={<Backendfetch />}
                            ></Route>
                            <Route path="/classify" element={<Model />}></Route>
                            <Route
                                path="/contact-me"
                                element={<Backendfetch />}
                            ></Route>
                        </>
                    )}
                </Routes> */}
            </div>
        </BrowserRouter>
    );
}

export default App;
