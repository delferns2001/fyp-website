import { Button } from "bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "./ProtectedRoutes";
import useToken from "./useToken";

function TopNavBar(props) {
    // const isAuth = useAuth();
    // window.onscroll = function () {
    //     scrollFunction();
    // };

    // function scrollFunction() {
    //     if (
    //         document.body.scrollTop > 50 ||
    //         document.documentElement.scrollTop > 50
    //     ) {
    //         document.getElementById("header").style.fontSize = "10px";
    //     } else {
    //         document.getElementById("header").style.fontSize = "20px";
    //     }
    // }

    return (
        <>
            <Navbar
                bg="primary"
                variant="dark"
                expand="md"
                className="shadow-sm"
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
                                // top: "0px",
                                right: "15px",
                            }}
                        >
                            {props.token !== null ? (
                                <Nav.Link onClick={() => props.removeToken()}>
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
