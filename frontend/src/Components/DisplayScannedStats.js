import { useContext, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import { Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export default function DisplayScannedStats() {
    const { token, user } = useContext(UserContext);
    const [stats, setStats] = useState([]);
    const height = 10;
    const width = 10;

    useEffect(() => {
        axios({
            method: "GET",
            url: "/getstats",

            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
                try {
                    setStats(response.data);
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }, []);

    useEffect(() => {
        console.log("stats updated");
    }, [stats]);

    return (
        <Row>
            <Col lg={4}>
                <Container
                    className="textcenter"
                    style={{
                        borderStyle: "solid",
                        height: "70vh",
                        display: "flex",
                        // flexDirection: "column",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <img
                        style={{ marginTop: "10px" }}
                        src="/CO2.png"
                        height="300vh"
                    ></img>
                    {user.carbon_footprint_score === 0 ? (
                        <p>
                            You currently do not have a carbon footprint score{" "}
                            <a
                                style={{ color: "black" }}
                                href="/carbonfootprintcalc"
                            >
                                click here to calculate it
                            </a>
                        </p>
                    ) : (
                        <p>
                            Previous Carbon Footprint Score:{" "}
                            {user.carbon_footprint_score}
                        </p>
                    )}
                </Container>
            </Col>
            <Col lg={8}>
                <Container
                    style={{
                        borderStyle: "solid",
                        height: "70vh",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <div className="icon">
                        <img src="/glass.png" height="100vh"></img>
                        <p className="textcenter"> GLASS = {stats.glass}</p>
                    </div>

                    <div className="icon">
                        <img src="/cardboard.png" height="100vh"></img>
                        <p className="textcenter">
                            {" "}
                            CARDBOARD {stats.cardboard}
                        </p>
                    </div>

                    <div className="icon">
                        <img src="/paper.png" height="100vh"></img>
                        <p className="textcenter"> PAPER {stats.paper}</p>
                    </div>

                    <div className="icon">
                        <img src="/trash.png" height="100vh"></img>
                        <p className="textcenter"> TRASH {stats.trash} </p>
                    </div>

                    <div className="icon">
                        <img src="/plastic.png" height="100vh"></img>
                        <p className="textcenter"> PLASTIC {stats.plastic}</p>
                    </div>

                    <div className="icon">
                        <img src="/metal.png" height="100vh"></img>
                        <p className="textcenter"> METAL {stats.metal}</p>
                    </div>
                </Container>
            </Col>
        </Row>

        // <div>
        //     <div
        //         style={{
        //             padding: "20px",
        //         }}
        //     >
        //         <Card
        //             style={{
        //                 width: "40vw",
        //                 backgroundColor: "#FF8601",
        //             }}
        //         >
        //             {user.carbon_footprint_score === 0 ? (
        //                 <p>
        //                     You currently do not have a carbon footprint score{" "}
        //                     <a
        //                         style={{ color: "black" }}
        //                         href="/carbonfootprintcalc"
        //                     >
        //                         click here to calculate it
        //                     </a>
        //                 </p>
        //             ) : (
        //                 <p>
        //                     Previous Carbon Footprint Score:{" "}
        //                     {user.carbon_footprint_score}
        //                 </p>
        //             )}
        //         </Card>
        //     </div>
        //     <div
        //         style={{
        //             padding: "20px",
        //         }}
        //     >
        //         <Card
        //             style={{
        //                 width: "40vw",
        //                 backgroundColor: "#FF8601",
        //             }}
        //         >
        //             <Card.Body>
        //                 <h3>Scanned Materials: </h3>

        //                 <div style={{ border: "10px", borderColor: "black" }}>
        //                     <p> METAL {stats.metal}</p>
        //                 </div>
        //                 <p> GLASS {stats.glass}</p>
        //                 <p> CARDBOARD {stats.cardboard}</p>
        //                 <p> PAPER {stats.paper}</p>
        //                 <p> TRASH {stats.trash}</p>
        //                 <p> PLASTIC {stats.plastic}</p>
        //             </Card.Body>
        //         </Card>
        //     </div>
        // </div>
    );
}
