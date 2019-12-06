import axios from "./axios";

export async function receiveFriends() {
    const { data } = await axios.get("/friends.json");
    console.log("data", data);
    return {
        type: "RECEIVE_FRIENDS",
        friends: data
    };
}
