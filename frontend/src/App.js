// import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";

import Model from "./Components/Model";
import TopNavBar from "./Components/Navbar";
import Homepage from "./Components/HomePage";
import Backendfetch from "./Components/backendtest";
import LoginForm from "./Components/LoginForm";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignUpForm from "./Components/Signupform";
import Profile from "./Components/Profile";
import { ProtectedRoutes } from "./Components/ProtectedRoutes";
import UserContext from "./Components/UserContext";

function App() {
    const { user, token } = useContext(UserContext);

    return (
        <BrowserRouter>
            <div
                className="App"
                style={{ minHeight: "100vh", backgroundColor: "#EE9D47" }}
            >
                <TopNavBar />
                <Routes>
                    <Route path="/" element={<Homepage />}></Route>
                    <Route path="/classify" element={<Model />}></Route>

                    {token === null || token === undefined ? (
                        <>
                            <Route
                                path="/login-form"
                                element={<LoginForm />}
                            ></Route>
                            <Route
                                path="/signup-form"
                                element={<SignUpForm />}
                            ></Route>
                        </>
                    ) : (
                        <>
                            <Route
                                path="/login-form"
                                element={<Homepage />}
                            ></Route>
                            <Route
                                path="/signup-form"
                                element={<Homepage />}
                            ></Route>
                        </>
                    )}

                    <Route element={<ProtectedRoutes />}>
                        <Route
                            exact
                            path="/profile"
                            element={
                                <>
                                    <Profile />
                                </>
                            }
                        ></Route>
                        <Route
                            path="/contact-me"
                            element={<Backendfetch />}
                        ></Route>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
