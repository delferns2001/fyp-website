import React, { useState } from "react";
import axios from "axios";
import {
    Button,
    Form,
    FormControl,
    InputGroup,
    Container,
    FormLabel,
    Col,
    Row,
} from "react-bootstrap";

import useToken from "./useToken";
import Feedback from "react-bootstrap/esm/Feedback";
import UserContext from "./UserContext";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const eye = <FontAwesomeIcon icon={faEye} />;

const StatusEnum = Object.freeze({
    INIT: 1,
    LOADING: 2,
    SUCCESS: 3,
    Error: 4,
});

function SignUpForm(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [showRepeatPassword, setShowRepeatPassword] = useState(true);
    const [status, setStatus] = useState(StatusEnum.INIT);

    function validateForm() {
        return (
            firstName > 1 &&
            lastName > 1 &&
            email.length > 0 &&
            password == repeatPassword
        );
    }

    const handleSubmit = (event) => {
        setStatus(StatusEnum.LOADING);
        axios({
            method: "POST",
            url: "/signup",
            data: {
                name: firstName,
                surname: lastName,
                email: email.toLowerCase(),
                password: password,
            },
        })
            .then((response) => {
                props.setToken(response.data.access_token);
                props.saveUser(response.data);
                console.log(response.data);
                window.location.assign("./");
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    setStatus(StatusEnum.ERROR);
                }
            });

        // setloginForm({
        //     email: "",
        //     password: "",
        // });

        event.preventDefault();
    };

    return (
        <>
            <Row className="border-bottom mt-5">
                <Container className="d-flex justify-content-center mb-5 px-0">
                    <Col className="px-3" style={{ maxWidth: 460 }}>
                        <h1 className="mb-0">Sign Up</h1>
                    </Col>
                </Container>
            </Row>

            <Row className="d-flex justify-content-center py-4 my-2">
                <Col className="px-3" style={{ maxWidth: 460 }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter first name"
                                name="firstname"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter last name"
                                name="lastname"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address </Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <label className="mb-2">Password</label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    required
                                    type={
                                        showPassword === true
                                            ? "password"
                                            : "text"
                                    }
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <InputGroup.Text
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {eye}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <label className="mb-2">Repeat Password</label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    required
                                    type={
                                        showRepeatPassword === true
                                            ? "password"
                                            : "text"
                                    }
                                    placeholder="Password again"
                                    value={repeatPassword}
                                    onChange={(e) =>
                                        setRepeatPassword(e.target.value)
                                    }
                                />
                                <InputGroup.Text
                                    onClick={() =>
                                        setShowRepeatPassword(
                                            !showRepeatPassword
                                        )
                                    }
                                >
                                    {eye}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                                required
                                type="checkbox"
                                label="Accept some terms"
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 mt-3"
                            disabled={!validateForm}
                        >
                            SignUp
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default SignUpForm;
