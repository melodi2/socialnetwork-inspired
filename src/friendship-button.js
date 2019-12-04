import React, { useState, useEffect } from "react";
import axios from "./axios";

export function Friendshipbutton({ otherId }) {
    console.log("otherId in friendship", otherId);
    const [buttonText, setButtonText] = useState("Make Friend Request");

    useEffect(() => {
        console.log("button mounted", otherId);
        axios
            .get("/friendshipstatus/" + otherId)
            .then(res => {
                console.log("buttontext get res: ", res.data);
                setButtonText(res.data.buttontext);
            })
            .catch(err => console.log(err));
    });

    function submit() {
        console.log("clicked on the button", buttonText);
        axios
            .post("/friendshipstatus/" + otherId)
            .then(res => {
                console.log("submit post axios res: ", res.data);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <button className="btn" onClick={submit}>
                {buttonText}
            </button>
        </div>
    );
}
