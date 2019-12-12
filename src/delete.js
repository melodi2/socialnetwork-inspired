import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class Delete extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    deleteAccount() {
        console.log("deleted in front end");
        axios
            .post("/deleteAccount.json")
            .then(() => {
                console.log("inside post axios deleteaccount");
                location.replace("/");
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div className="deleteModal">
                <h3>Are you sure you want to delete your Account?</h3>
                <h1> You cannot undo this action!</h1>
                <button onClick={() => this.deleteAccount()} className="redBtn">
                    DELETE
                </button>
                <h3>
                    <Link to="/">No, take me back please.</Link>
                </h3>
            </div>
        );
    }
}
