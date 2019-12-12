import React from "react";
import axios from "./axios";
import { Friendshipbutton } from "./friendship-button";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        // console.log("this.props.match: ", this.props.match);
        // console.log("this.props.match.params.id: ", this.props.match.params.id);
        axios
            .get(`/user/${this.props.match.params.id}.json`)
            .then(({ data }) => {
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
            <div className="profilePage">
                <h1>
                    {this.state.first} {this.state.last}
                </h1>
                <img
                    className="bigProfilePic"
                    src={this.state.imgurl}
                    alt={this.state.first + " " + this.state.last}
                />
                <p className="bio">{this.state.bio}</p>
                <Friendshipbutton otherId={this.props.match.params.id} />
            </div>
        );
    }
}
