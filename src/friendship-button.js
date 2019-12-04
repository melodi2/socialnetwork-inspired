import React, { useState, useEffect } from "react";
import axios from "./axios";

export function Friendshipbutton({ otherId }) {
    console.log("otherId in friendship", otherId);
    const [buttonText, setButtonText] = useState("Make Friend Request");

    useEffect(() => {
        console.log("button mounted", otherId);
        axios.get("/friendshipstatus/" + otherId).then(({ res }) => {
            console.log("res: ", res);
            setButtonText(res.buttontext);
        });
    });

    return (
        <div>
            <button className="btn">{buttonText}</button>
        </div>
    );
}
