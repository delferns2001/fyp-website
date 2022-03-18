// https://justenergy.com/blog/how-to-calculate-your-carbon-footprint/

import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import {
    FormGroup,
    FormControl,
    Row,
    Col,
    Card,
    FormLabel,
    Form,
    Button,
    Modal,
} from "react-bootstrap";

import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import UserContext from "./UserContext";

export default function CarbonFootprintCalc() {
    const initialanswers = {
        electric: 0,
        gas: 0,
        oil: 0,
        car: 0,
        flights_less_4: 0,
        flights_greater_4: 0,
    };

    const { signIn, user, token } = useContext(UserContext);
    const [answers, setAnswers] = useState(initialanswers);
    const [total, setTotal] = useState(0); //add user.total as the init value
    const [newspaperChecked, setNewspaperChecked] = useState(false);
    const [metalChecked, setMetalChecked] = useState(false);
    const [performance, setPerformance] = useState();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleChange(event) {
        const { value, name } = event.target;
        setAnswers((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    }

    function getPerformance(count) {
        if (count <= 15999) {
            setPerformance("low");
        } else if (count <= 22000) {
            setPerformance("average");
        } else {
            setPerformance("high");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var count = 0;
        count =
            answers.electric * 105 +
            answers.gas * 105 +
            answers.oil * 113 +
            answers.car * 0.79 +
            answers.flights_less_4 * 1100 +
            answers.flights_greater_4 * 4400;

        if (!newspaperChecked) {
            count = count + 184;
        }
        if (!metalChecked) {
            count = count + 166;
        }
        getPerformance(count);
        setTotal(count);

        axios({
            method: "POST",
            url: "/updateuser/carbonFootprint",
            data: {
                carbon_footprint_score: count,
            },
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
                try {
                    console.log(response.data);
                    signIn(JSON.stringify(response.data));
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
        handleShow();
        count = 0;
    };

    return (
        <>
            <Container className="d-flex justify-content-center mb-5 px-0 mt-5">
                <Col className="px-3" style={{ maxWidth: 540 }}>
                    <h1 className="mb-0">Carbon Footprint Calculator</h1>
                </Col>
            </Container>
            <div
                onSubmit={handleSubmit}
                class="d-flex justify-content-center"
                style={{ padding: "10px" }}
            >
                <Card
                    style={{
                        // maxWidth: "40vw",
                        backgroundColor: "#FF8601",
                    }}
                >
                    <Form style={{ maxWidth: "inherit", padding: "10px" }}>
                        <FormGroup style={{ padding: "10px" }}>
                            <FormLabel>Montly Electric Bill?</FormLabel>
                            <FormControl
                                required
                                type="number"
                                name="electric"
                                onChange={handleChange}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup style={{ padding: "10px" }}>
                            <FormLabel>Montly Gas Bill?</FormLabel>
                            <FormControl
                                required
                                type="number"
                                name="gas"
                                onChange={handleChange}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup style={{ padding: "10px" }}>
                            <FormLabel>Montly Oil Bill?</FormLabel>
                            <FormControl
                                required
                                type="number"
                                name="oil"
                                onChange={handleChange}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup style={{ padding: "10px" }}>
                            <FormLabel>
                                Total yearly mileage on your car?
                            </FormLabel>
                            <FormControl
                                required
                                type="number"
                                name="car"
                                onChange={handleChange}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup style={{ padding: "10px" }}>
                            <FormLabel>
                                Number of flights you’ve taken in the past year?
                                (4 hours or less)
                            </FormLabel>
                            <FormControl
                                required
                                type="number"
                                name="flights_less_4"
                                onChange={handleChange}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup style={{ padding: "10px" }}>
                            <FormLabel>
                                Number of flights you’ve taken in the past year?
                                (4 hours or more)
                            </FormLabel>
                            <FormControl
                                required
                                type="number"
                                name="flights_greater_4"
                                onChange={handleChange}
                            ></FormControl>
                        </FormGroup>
                        <Row>
                            <Col>
                                <FormGroup style={{ padding: "10px" }}>
                                    <FormLabel>
                                        Do you recycle Newspaper?
                                    </FormLabel>
                                    <FormCheckInput
                                        name="newspaper"
                                        className="newspaper"
                                        onChange={(e) => {
                                            setNewspaperChecked(
                                                e.target.checked
                                            );
                                        }}
                                    ></FormCheckInput>
                                </FormGroup>
                                {/* </Col>
                            <Col> */}
                                <FormGroup style={{ padding: "10px" }}>
                                    <FormLabel>
                                        Do you recycle aluminium and tin?
                                    </FormLabel>
                                    <FormCheckInput
                                        name="metal"
                                        onChange={(e) => {
                                            setMetalChecked(e.target.checked);
                                        }}
                                    ></FormCheckInput>
                                </FormGroup>
                            </Col>
                        </Row>
                        <div
                            className="d-flex justify-content-center"
                            style={{ paddingBottom: "10px" }}
                        >
                            <Button
                                variant="primary"
                                type="submit"
                                style={{ width: "35vw" }}
                                // onClick={handleSubmit}
                            >
                                Calculate Carbon Footprint
                            </Button>
                        </div>
                    </Form>
                </Card>
                {/* <div>
                <p>
                    Keep in mind that an “ideal” carbon footprint (or a “low”
                    footprint) is anywhere from 6,000 to 15,999 pounds per year.
                    16,000-22,000 is considered average. Under 6,000 is
                    considered very low. Over 22,000? You may want to take some
                    of these “living green” practices into consideration.
                </p>
            </div> */}
            </div>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Carbon Footprint Calculator Results
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    We calculate your score to be {total}
                    {performance === "low" ? (
                        <p>You're doing great! </p>
                    ) : (
                        <>
                            <p>Not bad! But i think you can do better!</p>
                            <p>
                                The Following article has some great tips that
                                will help you reduce your score{" "}
                                <a href="https://www.wired.co.uk/article/reduce-carbon-footprint">
                                    take me there
                                </a>
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    Ideal carbon footprint is a low carbon footprint - 6,000 to
                    15,999. Above 15999 to 21,999 is considered average.
                    Anything above 22000 is considered to high
                </Modal.Footer>
            </Modal>
        </>
    );
}
