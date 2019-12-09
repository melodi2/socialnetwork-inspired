import React from "react";
import ProfilePic from "./profile-pic";
import BioEditor from "./bio-editor";

export default function Profile(props) {
    console.log("props in profile", props);
    return (
        <div>
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
        </div>
    );
}
