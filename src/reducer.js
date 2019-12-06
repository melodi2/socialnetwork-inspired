export default function reducer(state = {}, action) {
    console.log("state: ", state);
    if (action.type == "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };
    }
    return state;
}
