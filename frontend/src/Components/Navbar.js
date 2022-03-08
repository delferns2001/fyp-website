import { Button } from "bootstrap";
import { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "./ProtectedRoutes";
import UserContext from "./UserContext";

function TopNavBar() {
    const { token, removeToken } = useContext(UserContext);

    return (
        <>
            <Navbar
                expand="md"
                className="shadow-sm"
                style={{
                    backgroundColor: "#FF8601",
                    color: "#000000",
                }}
            >
                <Container>
                    {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/" className="nav-link">
                                Home
                            </Nav.Link>
                            <Nav.Link href="/profile" className="nav-link">
                                Profile
                            </Nav.Link>
                            <Nav.Link href="/classify" className="nav-link">
                                Classify
                            </Nav.Link>
                            <Nav.Link href="/contact-me" className="nav-link">
                                Contact Me
                            </Nav.Link>
                        </Nav>
                        <Nav
                            style={{
                                position: "absolute",
                                right: "15px",
                            }}
                        >
                            {token !== null && token !== undefined ? (
                                <Nav.Link
                                    onClick={() => removeToken()}
                                    href="/login-form"
                                    class="nav-link"
                                >
                                    Logout
                                </Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link
                                        href="/login-form"
                                        class="nav-link"
                                    >
                                        Login
                                    </Nav.Link>
                                    <Nav.Link
                                        href="/signup-form"
                                        className="nav-link"
                                    >
                                        SignUp
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default TopNavBar;
