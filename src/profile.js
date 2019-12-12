import React from "react";
import ProfilePic from "./profile-pic";
import BioEditor from "./bio-editor";
import { Link } from "react-router-dom";

export default function Profile(props) {
    console.log("props in profile", props);
    return (
        <div className="form">
            <h2>
                {props.first} {props.last}
            </h2>
            <ProfilePic
                first={props.first}
                last={props.last}
                imgurl={props.imgurl}
                profilePicClass={props.profilePicClass}
                toggleModal={props.toggleModal}
            />

            <BioEditor updateBio={props.updateBio} bio={props.bio} />
            <Link to="/delete" id="delete">
                Delete your account
            </Link>
        </div>
    );
}
