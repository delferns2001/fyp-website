import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

function Profile(props) {
    const [profileData, setProfileData] = useState(null);
    // const { user, saveUser, getUser } = useUser();

    function getData() {
        // user = getUser();
        // console.log(user);
        axios({
            method: "GET",
            url: "/profile",
            data: {
                email: props.user.email.toLowerCase(),
            },
            headers: {
                Authorization: "Bearer " + props.token,
            },
        })
            .then((response) => {
                const res = response.data;
                res.access_token && props.setToken(res.access_token);
                setProfileData({
                    profile_name: res.name,
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
            <button onClick={getData}>Click me</button>
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
