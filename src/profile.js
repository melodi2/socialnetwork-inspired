import React from "react";
import ProfilePic from "./profile-pic";
import BioEditor from "./bio-editor";

export default function Profile(props) {
    console.log("props in profile", props);
    return (
        <div>
            <h1>I am the profile component!{props.first}</h1>
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
