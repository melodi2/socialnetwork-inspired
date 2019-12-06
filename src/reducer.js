export default function reducer(state = {}, action) {
    // console.log("state: ", state);
    if (action.type == "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };
    }
    if (action.type == "ACCEPT_FRIENDS") {
        const friends = [
            ...state.friends.map(friend => {
                if (action.id == friend.id) {
                    friend.accepted = action.accepted;
                    return friend;
                } else return friend;
            })
        ];

        console.log("friends in accept", friends);

        state = {
            ...state,
            friends
        };
    }
    if (action.type == "DELETE_FRIENDS") {
        const friends = [
            ...state.friends.filter(friend => action.id != friend.id)
        ];

        state = {
            ...state,
            friends
        };
    }

    return state;
}
