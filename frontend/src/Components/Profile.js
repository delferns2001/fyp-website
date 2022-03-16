import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import CarbonFootprintCalc from "./CarbonFootprintCalc";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import DisplayScannedStats from "./DisplayScannedStats";

function Profile() {
    const { user, token, saveToken } = useContext(UserContext);

    return (
        <div>
            <div>
                <Row className=" mt-3 mb-5 gx-0">
                    <Container className="d-flex justify-content-left mb-2 px-0">
                        <Col className="px-3">
                            <h2>Welcome back {user.firstname} </h2>
                        </Col>
                    </Container>
                </Row>
                <Row className=" mt-3 mb-5 gx-0">
                    <DisplayScannedStats></DisplayScannedStats>
                </Row>
            </div>
        </div>
        // <div className="Profile">
        //     <p>To get your profile details: </p>
        //     <button onClick={() => getData()}>Click me</button>
        //     {profileData && (
        //         <div>
        //             <p>Profile name: {profileData.profile_name}</p>
        //             <p>About me: {profileData.about_me}</p>
        //         </div>
        //     )}
        //     <CarbonFootprintCalc></CarbonFootprintCalc>
        // </div>
    );
}

export default Profile;
