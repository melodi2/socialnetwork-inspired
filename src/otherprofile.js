import React from "react";
import axios from "./axios";

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
        if (this.props.match.params.id == 30) {
            this.props.history.push("/");
        }
        axios
            .get(`/user.json/${this.props.match.params.id}`)
            .then(({ data }) => {
                this.setState({
                    first: data.first,
                    last: data.last,
                    imgurl: data.imgurl,
                    bio: data.bio,
                    id: data.id
                });
            })
            .catch(err => console.log(err));
    }

    getOtherProfile() {}

    render() {
        return (
            <div>
                <h1>
                    Hello from other profile {this.state.first}
                    {this.state.last}
                </h1>
            </div>
        );
    }
}
