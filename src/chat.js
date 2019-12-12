import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const chatMessages = useSelector(state => state && state.messages);
    console.log("chatMessages", chatMessages);
    const elemRef = useRef();

    useEffect(() => {
        // console.log("elemRef.current", elemRef.current);
        // console.log("scroll top", elemRef.current.scrollTop);
        // console.log("clientHeight", elemRef.current.clientHeight);
        // console.log("scrollHeight", elemRef.current.scrollHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    });

    const keyCheck = e => {
        if (e.key === "Enter") {
            socket.emit("new chat message", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="chat">
            <h1>Chat Room...</h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(el => (
                        <p id="chatMessage" key={el.messages_id}>
                            <p id="leftCorner">
                                <h4>{el.firstname}</h4>
                                <img className="smallPic" src={el.imgurl} />
                            </p>

                            <p id="chatText">
                                <p>{el.msg}</p>
                                <p id="postedTimeStamp">{el.posted_at}</p>
                            </p>
                        </p>
                    ))}
            </div>
            <textarea
                placeholder="Type a message"
                onKeyUp={keyCheck}
            ></textarea>
        </div>
    );
}
