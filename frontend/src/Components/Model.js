import * as tf from "@tensorflow/tfjs";
import React from "react";
import "@tensorflow/tfjs-backend-webgl";
import { useState, useRef, useEffect } from "react";
import { image } from "@tensorflow/tfjs";
import { Container, Card, Button, Row, Col, Figure } from "react-bootstrap";
import "./Model.css";
import axios from "axios";
import { useContext } from "react";
import UserContext from "./UserContext";

export default function Model() {
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [model, setModel] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [results, setResults] = useState([]);
    const [history, setHistory] = useState([]);
    const [probability, setProbability] = useState([]);
    const { token } = useContext(UserContext);

    const imageRef = useRef();
    const fileInputRef = useRef();

    const labels = ["Cardboard", "Glass", "Metal", "Paper", "Plastic", "Trash"];

    const loadModel = async () => {
        setIsModelLoading(true);
        try {
            const model = await tf.loadLayersModel(
                "https://raw.githubusercontent.com/delferns2001/FYP/master/Practice%20Trained%20Model/6classes_Mobilenet_100E_100TE.h5/model.json"
            );
            setModel(model);
            setIsModelLoading(false);
        } catch (error) {
            console.log(error);
            return <div>Error Loading the model </div>;
            setIsModelLoading(false);
        }
    };

    const uploadImage = (e) => {
        const { files } = e.target;
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0]);
            setImageURL(url);
        } else {
            setImageURL(null);
        }
        setResults([]);
    };

    function indexOfMax(arr) {
        if (arr.length === 0) {
            return -1;
        }
        var max = arr[0];
        var maxIndex = 0;

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }

        return maxIndex;
    }

    const identify = async () => {
        fileInputRef.current.value = "";

        const offset = tf.scalar(127.5);
        let image = imageRef.current;
        let tensor = tf.browser
            .fromPixels(image)
            .resizeNearestNeighbor([225, 225])
            .toFloat()
            .sub(offset)
            .div(offset)
            .expandDims();

        const prob = await model.predict(tensor).reshape([6]).array();
        setProbability(prob);
        tf.reshape(prob, [6]);

        const values = [0, 0, 0, 0, 0, 0];
        values[indexOfMax(prob)] = 1;
        console.log(values);
        updatestats(values);

        console.log(labels[indexOfMax(prob)]);
        setResults(labels[indexOfMax(prob)]);
    };

    useEffect(() => {
        loadModel();
    }, []);

    useEffect(() => {
        if (imageURL) {
            setHistory([imageURL, ...history]);
        }
    }, [imageURL]);

    if (isModelLoading) {
        return <p>Model Loading...</p>;
    }

    const updatestats = (prob) => {
        console.log(prob);

        axios({
            method: "POST",
            url: "/updatestats",
            data: {
                metal: prob[2],
                glass: prob[1],
                cardboard: prob[0],
                paper: prob[3],
                trash: prob[5],
                plastic: prob[4],
            },

            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    };

    return (
        <Row
            style={{
                padding: "10vh",
            }}
            className="gx-0"
        >
            <Col
                lg={4}
                className="textcenter"
                style={{
                    minHeight: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <Container
                    style={{
                        borderStyle: "solid",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {imageURL && (
                        <img
                            src={imageURL}
                            alt="Upload Preview"
                            crossOrigin="anonymous"
                            ref={imageRef}
                            style={{
                                height: "inherit",
                                width: "inherit",
                            }}
                        />
                    )}
                </Container>
            </Col>

            <Col
                lg={8}
                style={{
                    paddingInline: "5vw",
                    minHeight: "80vh",
                }}
            >
                <Container
                    style={{
                        borderStyle: "solid",
                        height: "80vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                    }}
                >
                    <Container style={{ padding: "10px", textAlign: "center" }}>
                        <h1>Garbage Classifier Application</h1>
                        <p>
                            Ullamco ullamco duis reprehenderit veniam consequat
                            est cupidatat pariatur. Cillum fugiat ad
                            exercitation consectetur mollit Lorem sit aliqua
                            incididunt commodo aliqua nulla qui. Ea cillum
                            cupidatat labore dolor. Veniam consectetur ea
                            eiusmod laboris ipsum eu ut Lorem mollit.
                        </p>
                    </Container>

                    <Container
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            capture="camera"
                            onChange={uploadImage}
                            ref={fileInputRef}
                        />
                        {imageURL && (
                            <button onClick={identify}>Identify Image</button>
                        )}
                    </Container>
                    <Container
                        style={{
                            padding: "20px",
                        }}
                    >
                        <div
                            style={{
                                borderStyle: "solid",
                                borderColor: "black",
                                minHeight: "35vh",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around",
                            }}
                        >
                            <div style={{ padding: "10px" }}>
                                <h5>
                                    Your item is identified to be:{" "}
                                    <span>{results}</span>
                                </h5>
                                {(() => {
                                    if (results === "Plastic") {
                                        return (
                                            <div className="iconContainer">
                                                <img
                                                    src="./plastic.png"
                                                    height="100vh"
                                                ></img>
                                            </div>
                                        );
                                    } else if (results === "Paper") {
                                        return (
                                            <div className="iconContainer">
                                                <img
                                                    src="./paper.png"
                                                    height="100vh"
                                                ></img>
                                            </div>
                                        );
                                    } else if (results === "Glass") {
                                        return (
                                            <div className="iconContainer">
                                                <img
                                                    src="./glass.png"
                                                    height="100vh"
                                                ></img>
                                            </div>
                                        );
                                    } else if (results === "Cardboard") {
                                        return (
                                            <div className="iconContainer">
                                                <img
                                                    src="./cardboard.png"
                                                    height="100vh"
                                                ></img>
                                            </div>
                                        );
                                    } else if (results === "Metal") {
                                        return (
                                            <div className="iconContainer">
                                                <img
                                                    src="./metal.png"
                                                    height="100vh"
                                                ></img>
                                            </div>
                                        );
                                    } else if (results === "Trash") {
                                        return (
                                            <div className="iconContainer">
                                                <img
                                                    src="./trash.png"
                                                    height="100vh"
                                                ></img>
                                            </div>
                                        );
                                    } else {
                                        return <div></div>;
                                    }
                                })()}
                            </div>

                            {(() => {
                                if (results === "Plastic") {
                                    return (
                                        <div className="binContainer">
                                            Plastic waste should be recycled in
                                            green bins
                                            <img src="./green.png"></img>
                                        </div>
                                    );
                                } else if (results === "Paper") {
                                    return (
                                        <div className="binContainer">
                                            <p>
                                                {" "}
                                                Paper waste should be recycled
                                                in blue bins
                                            </p>
                                            <img src="./blue.png"></img>
                                        </div>
                                    );
                                } else if (results === "Glass") {
                                    return (
                                        <div className="binContainer">
                                            <p>
                                                Glass waste should be recycled
                                                in red bins
                                            </p>
                                            <img src="./red.png"></img>
                                        </div>
                                    );
                                } else if (results === "Cardboard") {
                                    return (
                                        <div className="binContainer">
                                            <p>
                                                Cardboard waste should be
                                                recycled in blue bins
                                            </p>
                                            <img src="./blue.png"></img>
                                        </div>
                                    );
                                } else if (results === "Metal") {
                                    return (
                                        <div className="binContainer">
                                            <p>
                                                Metal waste should be recycled
                                                in green bins
                                            </p>
                                            <img src="./green.png"></img>
                                        </div>
                                    );
                                } else if (results === "Trash") {
                                    return (
                                        <div className="binContainer">
                                            <p>
                                                General Waste should be recycled
                                                in black bins
                                            </p>
                                            <img src="./black.jpg"></img>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div>
                                            Please Upload an image to classify
                                        </div>
                                    );
                                }
                            })()}
                        </div>
                    </Container>
                </Container>
            </Col>

            {/* <Col
                class="gx-0"
                style={{
                    paddingInline: "5vw",
                    minHeight: "80vh",
                    minWidth: "30vw",
                }}
            >
                <Card style={{ backgroundColor: "#FF8601" }}>
                    <section>
                        <h1>Garbage Classifier Application</h1>
                        <p>
                            Ullamco ullamco duis reprehenderit veniam consequat
                            est cupidatat pariatur. Cillum fugiat ad
                            exercitation consectetur mollit Lorem sit aliqua
                            incididunt commodo aliqua nulla qui. Ea cillum
                            cupidatat labore dolor. Veniam consectetur ea
                            eiusmod laboris ipsum eu ut Lorem mollit.
                        </p>
                    </section>
                    <input
                        type="file"
                        accept="image/*"
                        capture="camera"
                        onChange={uploadImage}
                        ref={fileInputRef}
                        style={{ paddingTop: "10vh " }}
                    />

                    {imageURL && (
                        <button onClick={identify}>Identify Image</button>
                    )}

                    <Card
                        style={{
                            backgroundColor: "#FF8601",
                            height: "40vh",
                            width: "inherit",
                            padding: "10vh",
                        }}
                    >
                        <div key={results}>
                            <h3>
                                Results: <span>{results}</span>
                            </h3>
                        </div>
                    </Card>
                </Card>
            </Col> */}
        </Row>
    );
}
