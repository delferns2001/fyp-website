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

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useToken from "./useToken";
const eye = <FontAwesomeIcon icon={faEye} />;

const StatusEnum = Object.freeze({
    INIT: 1,
    LOADING: 2,
    SUCCESS: 3,
});

function LoginForm(props) {
    const { token, removeToken, setToken } = useToken();

    const [loginForm, setloginForm] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState("");
    const [status, setStatus] = useState(StatusEnum.INIT);

    function validateForm() {
        return loginForm.email.length > 0 && loginForm.password.length > 0;
    }

    function handleChange(event) {
        const { value, name } = event.target;
        setloginForm((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    }

    const handleSubmit = (event) => {
        axios({
            method: "POST",
            url: "/token",
            data: {
                email: loginForm.email,
                password: loginForm.password,
            },
        })
            .then((response) => {
                console.log(response.data.access_token);
                setToken(response.data.access_token);
                window.location.reload(true);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });

        // setloginForm({
        //     email: "",
        //     password: "",
        // });

        // event.preventDefault();
    };

    return (
        <>
            <Row className="border-bottom mt-5">
                <Container className="d-flex justify-content-center mb-5 px-0">
                    <Col className="px-3" style={{ maxWidth: 460 }}>
                        <h1 className="mb-0">Login</h1>{" "}
                    </Col>
                </Container>
            </Row>

            <Row className="d-flex justify-content-center py-4 my-2">
                <Col className="px-3" style={{ maxWidth: 460 }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address: </Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                required
                                placeholder="Enter email"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <label className="mb-2">Password: </label>

                            <InputGroup className="mb-2">
                                <FormControl
                                    id="inlineFormInputGroup"
                                    required
                                    type={
                                        showPassword === true
                                            ? "password"
                                            : "text"
                                    }
                                    placeholder="Password"
                                    name="password"
                                    onChange={handleChange}
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

                        <Button
                            variant="primary"
                            // type="submit"
                            className="w-100 mt-2"
                            onClick={handleSubmit}
                            disabled={!validateForm()}
                        >
                            {status === StatusEnum.LOADING
                                ? "Loading..."
                                : "Sign In"}
                        </Button>
                        <Button onClick={() => console.log(token)}>
                            print token
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default LoginForm;
