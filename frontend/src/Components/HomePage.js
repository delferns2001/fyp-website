import { Container, Row } from "react-bootstrap";
import "./Homepage.css";

export default function Homepage() {
    return (
        <>
            <div
                className="d-flex justify-content-center"
                style={{
                    background: "url('/Mountain.jpg')",
                    backgroundPosition: "center -60px",
                    backgroundSize: "cover",
                    height: "92vh",
                    width: "100vw",
                }}
            >
                <div
                    className="d-flex flex-column justify-content-center pb-5"
                    style={{ width: 1100 }}
                >
                    <div
                        style={{
                            background: "rgba(255,255,255,.4)",
                            padding: 50,
                        }}
                    >
                        <h1
                            className="mb-5"
                            style={{ fontSize: "3.6em", fontWeight: "bold" }}
                        >
                            "We Have a Single mission: to protect and hand on
                            the planet to the next generation"
                            <h5 style={{ position: "absolute", right: "20vw" }}>
                                - Francois Hallande (Former President of France)
                            </h5>
                        </h1>

                        {/* <div className="d-flex align-items-stretch">
                            <div className="w-100 d-flex flex-column justify-content-between">
                                <div>
                                    <h2 style={{ fontWeight: "bold" }}>
                                        For people in need
                                    </h2>
                                    <p style={{ fontSize: "1.2em" }}>
                                        Find people and places providing the
                                        support you need
                                    </p>
                                </div>
                                <Link to="/map">
                                    <Button variant="primary">
                                        Search locations
                                    </Button>
                                </Link>
                            </div>

                            <div className="w-100  d-flex flex-column justify-content-between">
                                <div>
                                    <h2 style={{ fontWeight: "bold" }}>
                                        For volunteers
                                    </h2>
                                    <p style={{ fontSize: "1.2em" }}>
                                        Find charities and events to get
                                        involved with
                                    </p>
                                </div>
                                <Link to="/organisers">
                                    <Button variant="primary">
                                        Browse organisations
                                    </Button>
                                </Link>
                            </div>

                            <div className="w-100 d-flex flex-column justify-content-between">
                                <div>
                                    <h2 style={{ fontWeight: "bold" }}>
                                        For charities
                                    </h2>
                                    <p style={{ fontSize: "1.2em" }}>
                                        Communicate your mission and connect
                                        with volunteers
                                    </p>
                                </div>
                                <Link to="/sign-up">
                                    <Button variant="primary">
                                        Register your organisation
                                    </Button>
                                </Link>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

{
    /* <figure className="position-relative">
                <img
                    className="img-fluid"
                    style={{ height: "inherit", width: "100vw" }}
                    alt="Image"
                    src="/Mountain.jpg"
                ></img>
            </figure> */
}
