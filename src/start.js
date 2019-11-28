import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

let elem = <Welcome />;

if (location.pathname != "/register") {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
