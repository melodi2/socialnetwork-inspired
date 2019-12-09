import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import Welcome from "./welcome";
import * as io from "socket.io-client";

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import { Provider } from "react-redux";

const socket = io.connect();

socket.on("welcome", function(data) {
    console.log(data);
    socket.emit("thanks", {
        message: "Thank you. It is great to be here."
    });
});
socket.on("something", function(data) {
    console.log(data);
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem = <Welcome />;

if (location.pathname != "/register") {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
