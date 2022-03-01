import { Container } from "react-bootstrap";
export default function Homepage() {
    return (
        <>
            <figure className="position-relative">
                <img
                    className="img-fluid"
                    style={{ height: "inherit", width: "100vw" }}
                    alt="Image"
                    src="/Sky1.jpg"
                ></img>
                {/* <figcaption className="position-fluid">
                    Garbage Classification App
                </figcaption> */}
            </figure>
        </>
    );
}
