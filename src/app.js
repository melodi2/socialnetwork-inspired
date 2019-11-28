import React from "react";
import axios from "./axios";
import ProfilePic from "./profile-pic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "Ezgi",
            last: "Ojala",
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        console.log("app has mounted");
        //wants to do request to server
        //server will do sth with db query
        //this is where we want to contact the server and ask for info about the user.
        //axios.get()
        //when we get the info back, we want to add it to state..
        //this.setState({})
        //
    }

    toggleModal() {
        console.log("toggleModal is running");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }

    methodInApp(muffin) {
        console.log("I am a method in App");
        console.log("muffin", muffin);
    }

    render() {
        return (
            <div>
                Hello! This is App calling you!
                <ProfilePic
                    firstname={this.state.first}
                    lastname={this.state.last}
                    imgurl={this.state.imgurl}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
                <h1 onClick={this.toggleModal}>upload</h1>
            </div>
        );
    }
}
