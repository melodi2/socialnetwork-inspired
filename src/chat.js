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
                <p>FIRST Chat message will go here...</p>
                <p>Chat message will go here...</p>
                <p>Chat message will go here...</p>
                <p>Chat message will go here...</p>
                <p>Chat message will go here...</p>
                <p>Chat message will go here...</p>
                <p>Chat message will go here...</p>
                <p>Chat message will go here...</p>
                <p>Chat message will go here...</p>
                <p>LAST Chat message will go here...</p>
                {chatMessages &&
                    chatMessages.map(el => (
                        <p key={el.messages_id}>
                            <img className="smallPic" src={el.imgurl} />
                            {el.firstname}
                            {el.msg}
                        </p>
                    ))}
            </div>
            <textarea placeholder="Add a Comment" onKeyUp={keyCheck}></textarea>
        </div>
    );
}
