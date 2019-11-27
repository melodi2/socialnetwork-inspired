import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem = <Welcome />;

if (location.pathname != "/register") {
    elem = <img src="./logo.png" />;
}

ReactDOM.render(elem, document.querySelector("main"));
