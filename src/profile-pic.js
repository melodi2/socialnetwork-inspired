import React from "react";

export default function ProfilePic({ firstname, lastname, imgurl }) {
    console.log("firstname in profile pic", firstname);
    console.log("imgurl: ", imgurl);
    imgurl = imgurl || "/img/default.jpeg";
    return (
        <div>
            <h2>I am the Profile picture! {firstname}</h2>
            <img src={imgurl} />
        </div>
    );
}
