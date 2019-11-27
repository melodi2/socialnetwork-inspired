import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        console.log("in submit this.state.first", this.state.first);
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                console.log(
                    "post request happening, this.state.password",
                    this.state.password
                );
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    handleChange(inputElement) {
        this.setState({
            [inputElement.name]: inputElement.value
        });
    }

    render() {
        return (
            <div>
                {this.state.error && (
                    <div className="error">
                        Oops! Something went wrong. Please, try again
                    </div>
                )}
                <h1>REGISTRATION</h1>
                <input
                    name="first"
                    placeholder="firstname"
                    onChange={e => this.handleChange(e.target)}
                />
                <input
                    name="last"
                    placeholder="lastname"
                    onChange={e => this.handleChange(e.target)}
                />
                <input
                    name="email"
                    placeholder="email"
                    onChange={e => this.handleChange(e.target)}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={e => this.handleChange(e.target)}
                />
                <button onClick={() => this.submit()}>Sign Up</button>
                <Link to="/login">Take me to login</Link>
            </div>
        );
    }
}
