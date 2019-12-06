import axios from "./axios";

export async function receiveFriends() {
    const { data } = await axios.get("/friends.json");
    console.log("data", data);
    return {
        type: "RECEIVE_FRIENDS",
        friends: data
    };
}

export async function acceptFriend(id) {
    await axios.post("/friendshipstatus/" + id);
    return {
        type: "ACCEPT_FRIENDS",
        accepted: true,
        id
    };
}

export async function deleteFriend(id) {
    await axios.post("/friendshipstatus/" + id);
    return {
        type: "DELETE_FRIENDS",
        id
    };
}
