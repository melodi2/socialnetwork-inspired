import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem = <Welcome />;

if (location.pathname != "/welcome") {
    elem = <img src="./logo.png" />;
}

ReactDOM.render(elem, document.querySelector("main"));
