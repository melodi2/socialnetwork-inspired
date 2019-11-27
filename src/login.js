import React from "react";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>I am login!</h1>
                <Link to="/">Take me to registration</Link>
            </div>
        );
    }
}
