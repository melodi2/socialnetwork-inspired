import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriends } from "./actions";

export function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(state => {
        console.log("in function passed to useSelector", state);
        return (
            state.friends && state.friends.filter(elem => elem.accepted == true)
        );
    });

    useEffect(() => {
        dispatch(receiveFriends());
    }, []);

    return (
        <div>
            {" "}
            Your Friends:
            {friends && friends.map(el => el.firstname)}
        </div>
    );
}
