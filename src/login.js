import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/register");
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
            <div className="form">
                {this.state.error && (
                    <div className="center error">
                        Oops! Something went wrong. Please, try again
                    </div>
                )}
                <h1>Login</h1>
                <input
                    name="email"
                    placeholder="Email"
                    onChange={e => this.handleChange(e.target)}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={e => this.handleChange(e.target)}
                />
                <button onClick={() => this.submit()}>Log In</button>

                <Link to="/">Register here</Link>
            </div>
        );
    }
}
