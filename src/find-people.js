import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export function FindPeople() {
    const [users, setUsers] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        let ignore = false;
        (async () => {
            const { data } = await axios.get(`/users/` + input + ".json");
            console.log("data", data);

            if (!ignore) {
                if (input == "") {
                    setRecentUsers(data);
                    setUsers([]);
                } else {
                    setUsers(data);
                }
            }
        })();
        return () => (ignore = true);
    }, [input]);

    console.log("user", users);
    if (recentUsers) {
        return (
            <div className="find-people">
                <h3>See who just joined!</h3>

                <div className="people-container">
                    {recentUsers.map(u => (
                        <div key={u.id}>
                            <h4>
                                {u.firstname} {u.lastname}
                            </h4>
                            <Link to={`/user/${u.id}`}>
                                <img className="smallPic" src={u.imgurl} />
                            </Link>
                        </div>
                    ))}
                </div>

                <h3>Do you want to find someone particular?</h3>
                <input
                    onChange={e => setInput(e.target.value)}
                    defaultValue={input}
                    placeholder="Type a name"
                />

                <div className="people-container">
                    {users.map(u => (
                        <div key={u.id}>
                            <h4>
                                {u.firstname} {u.lastname}
                            </h4>
                            <Link to={`/user/${u.id}`}>
                                <img className="smallPic" src={u.imgurl} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return <p>Hello</p>;
    }
}
