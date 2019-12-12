import React from "react";
import ProfilePic from "./profile-pic";
import BioEditor from "./bio-editor";
import { Link } from "react-router-dom";

export default function Profile(props) {
    console.log("props in profile", props);
    return (
        <div className="profilePage">
            <h1>
                {props.first} {props.last}
            </h1>
            <ProfilePic
                first={props.first}
                last={props.last}
                imgurl={props.imgurl}
                profilePicClass={props.profilePicClass}
                toggleModal={props.toggleModal}
            />

            <BioEditor updateBio={props.updateBio} bio={props.bio} />
            <h4>
                <Link to="/delete" id="delete">
                    Delete your account
                </Link>
            </h4>
        </div>
    );
}
