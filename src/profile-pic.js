import React from "react";

export default function ProfilePic({ first, last, imgurl, profilePicClass }) {
    imgurl = imgurl || "/img/default.jpeg";
    return (
        <div>
            <h2>I am the Profile picture! {first}</h2>
            <img
                className={profilePicClass}
                src={imgurl}
                alt={first + " " + last}
            />
        </div>
    );
}
