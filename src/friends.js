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
            <div className="friendsBox">
                <h3>Your Friends:</h3>
                {friends &&
                    friends.map(el => (
                        <div key={el.id}>
                            <img className="smallPic" src={el.imgurl} />
                            {el.firstname}

                            <button
                                onClick={e => dispatch(deleteFriend(el.id))}
                            >
                                Delete
                            </button>
                        </div>
                    ))}

                <h3>Open Friend Requests:</h3>
                {friendRequests &&
                    friendRequests.map(el => (
                        <div key={el.id}>
                            <img className="smallPic" src={el.imgurl} />
                            {el.firstname}

                            <button
                                onClick={e => dispatch(acceptFriend(el.id))}
                            >
                                Accept
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}
