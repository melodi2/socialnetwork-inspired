import React from "react";
import axios from "./axios";
import { Friendshipbutton } from "./friendship-button";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("this.props.match: ", this.props.match);
        //figure out the user id of the user...
        console.log("this.props.match.params.id: ", this.props.match.params.id);
        //make a request to the server, passing along this.props.match.params.
        //the server needs to look up the data about that user
        //and send back information about the currently logged in user
        //figure out if the other users id is the same as the logged in users
        //if it is then send them away...
        axios
            .get(`/user/${this.props.match.params.id}.json`)
            .then(({ data }) => {
                console.log("data", data);
                this.setState({
                    first: data.first,
                    last: data.last,
                    imgurl: data.imgurl,
                    bio: data.bio,
                    id: data.id,
                    userid: data.userid
                });
                if (this.props.match.params.id == this.state.userid) {
                    this.props.history.push("/");
                }
            })
            .catch(err => console.log(err));
    }

    getOtherProfile() {}

    render() {
        if (!this.state.first) {
            return <h1>This user does not exist!</h1>;
        }
        return (
            <div>
                <h1>
                    This is the profile of {this.state.first} {this.state.last}
                </h1>
                <img
                    src={this.state.imgurl}
                    alt={this.state.first + " " + this.state.last}
                />
                <Friendshipbutton otherId={this.props.match.params.id} />
                <p>{this.state.bio}</p>
            </div>
        );
    }
}
