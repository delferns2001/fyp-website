import * as tf from "@tensorflow/tfjs";
import React from "react";
import "@tensorflow/tfjs-backend-webgl";
import { useState, useRef, useEffect } from "react";
import { image } from "@tensorflow/tfjs";
import { Container, Card, Button, Row, Col, Figure } from "react-bootstrap";
import "./Model.css";

export default function Model() {
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [model, setModel] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [results, setResults] = useState([]);
    const [history, setHistory] = useState([]);
    const [probability, setProbability] = useState([]);

    const imageRef = useRef();
    const fileInputRef = useRef();

    const labels = ["cardboard", "glass", "metal", "paper", "plastic", "trash"];

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

    return (
        <Row
            style={{
                backgroundColor: "cyan",
                minHeight: "110vh",
                maxWidth: "inherit",
                paddingTop: "10vh",
            }}
        >
            <Col>
                <Container>
                    <div
                        className="imageholder"
                        style={{
                            borderColor: "black",
                            borderStyle: "solid",
                            // backgroundColor: "black"
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
                    </div>
                </Container>
            </Col>
            <Col>
                <Container
                    style={{ paddingTop: "10vh", paddingBottom: "10vh" }}
                >
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
                </Container>
                <Container>
                    <div style={{ borderColor: "black", borderStyle: "solid" }}>
                        <div key={results}>
                            <h3>
                                Results: <span>{results}</span>
                            </h3>
                        </div>
                        {imageURL && (
                            <button onClick={identify}>Identify Image</button>
                        )}
                    </div>
                </Container>
            </Col>
            {/* <Container>
                <Row>
                    {history.map((image) => (
                        <Col>
                            <div style={{ paddingTop: "10px" }}>
                                <Card style={{ width: "18rem" }}>
                                    <Card.Img
                                        style={{
                                            height: "100px",
                                            width: "inherit",
                                        }}
                                        variant="top"
                                        src={image}
                                    />
                                    <Card.Body>
                                        <Card.Title>image</Card.Title>
                                        <Card.Text> {image}</Card.Text>
                                        <Button
                                            href={image}
                                            target="_black"
                                            variant="primary"
                                        >
                                            View Image
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container> */}
        </Row>
    );
}
