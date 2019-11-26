import React from "react";
import Registration from "./registration";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <div>WELCOME</div>
                <img src="./logo.png" />
                <Registration />
            </div>
        );
    }
}
