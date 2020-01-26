import * as io from "socket.io-client";

import { getMessages, addMessage } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        //all our dispatches of actions will go in here

        socket.on("getMessages", msgs => store.dispatch(getMessages(msgs)));

        socket.on("addMessage", msg => store.dispatch(addMessage(msg)));
    }
};
