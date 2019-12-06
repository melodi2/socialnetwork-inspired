import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriends, acceptFriend, deleteFriend } from "./actions";

export function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(state => {
        return (
            state.friends && state.friends.filter(elem => elem.accepted == true)
        );
    });
    const friendRequests = useSelector(state => {
        return (
            state.friends &&
            state.friends.filter(elem => elem.accepted == false)
        );
    });

    useEffect(() => {
        dispatch(receiveFriends());
    }, []);

    return (
        <div>
            {" "}
            <div>
                Your Friends:
                {friends &&
                    friends.map(el => (
                        <div key={el.id}>
                            {el.firstname}
                            <img src={el.imgurl} />

                            <button
                                onClick={e => dispatch(deleteFriend(el.id))}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
            </div>
            Want to be your Friends:
            {friendRequests &&
                friendRequests.map(el => (
                    <div key={el.id}>
                        {el.firstname}
                        <img src={el.imgurl} />
                        <button onClick={e => dispatch(acceptFriend(el.id))}>
                            Accept
                        </button>
                    </div>
                ))}
        </div>
    );
}
