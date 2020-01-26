import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriends, acceptFriend, deleteFriend } from "./actions";
import { Link } from "react-router-dom";

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
            <div className="friends-container">
                <h2>Your Friends:</h2>
                <div className="friends">
                    {friends && friends.length == 0 && <div>No friends</div>}
                    {friends &&
                        friends.map(el => (
                            <div key={el.id}>
                                <h4>
                                    {el.firstname} {el.lastname}
                                </h4>
                                <Link to={`/user/${el.id}`}>
                                    <img className="smallPic" src={el.imgurl} />
                                </Link>
                                <button
                                    className="redBtn"
                                    onClick={e => dispatch(deleteFriend(el.id))}
                                >
                                    Unfriend
                                </button>
                            </div>
                        ))}
                </div>
                <h2>Open Friend Requests:</h2>
                <div className="friends">
                    {friendRequests && friendRequests.length == 0 && (
                        <div>No Friend Requests</div>
                    )}
                    {friendRequests &&
                        friendRequests.map(el => (
                            <div key={el.id}>
                                <h4>
                                    {el.firstname} {el.lastname}
                                </h4>
                                <Link to={`/user/${el.id}`}>
                                    <img className="smallPic" src={el.imgurl} />
                                </Link>

                                <button
                                    className="greenBtn"
                                    onClick={e => dispatch(acceptFriend(el.id))}
                                >
                                    Accept
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
