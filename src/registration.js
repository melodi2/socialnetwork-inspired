import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/register", {
                email: this.state.email,
                password: this.state.password,
                first: this.state.first
            })
            .then(({ data }) => {
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

        //alternatively
        //this[inputElement.name] = inputElement.value
    }

    render() {
        return (
            <div>
                {this.state.error && <div className="error">Oops!</div>}
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
                <button onClick={() => this.submit()}>Sign Up</button>{" "}
                <a href="/login">Log In</a>
            </div>
        );
    }
}
