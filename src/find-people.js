import React, { useState, useEffect } from "react";
import axios from "./axios";

export function FindPeople() {
    const [user, setUser] = useState();
    const [input, setInput] = useState("");

    useEffect(() => {
        (async () => {
            // let ignore = false;
            const { data } = await axios.get(`/users/` + input);
            console.log("data", data);

            // if (!ignore) {
            setUser(data);
            // }
        })();
        // return () => {
        //     let ignore = true;
        // };
    }, [input]);

    console.log("user", user);
    return (
        <div>
            <p>Hello</p>
            {user.map(c => (
                <div key={c}>{c}</div>
            ))}
            <input
                onChange={e => setInput(e.target.value)}
                defaultValue={input}
            />
        </div>
    );
}
