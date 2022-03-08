import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

function Profile(props) {
    const [profileData, setProfileData] = useState(null);
    const { user, token, saveToken } = useContext(UserContext);

    function getData() {
        console.log("email: " + user.email);
        console.log("token: " + token);
        axios({
            method: "GET",
            url: "/profile",

            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
                console.log(response.data);
                const res = response.data;
                res.access_token && saveToken(res.access_token);
                setProfileData({
                    profile_name: res.fullName,
                    about_me: res.about,
                });
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }

    return (
        <div className="Profile">
            <p>To get your profile details: </p>
            <button onClick={() => getData()}>Click me</button>
            {profileData && (
                <div>
                    <p>Profile name: {profileData.profile_name}</p>
                    <p>About me: {profileData.about_me}</p>
                </div>
            )}
        </div>
    );
}

export default Profile;
