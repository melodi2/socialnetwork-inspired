import React from "react";
import axios from "./axios";
import ProfilePic from "./profile-pic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        console.log("app has mounted");
        axios
            .get("/user")
            .then(({ data }) => {
                this.setState({
                    first: data.first,
                    last: data.last,
                    imgurl: data.imgurl
                });
                console.log(
                    "first, last, imgurl",
                    this.state.first,
                    this.state.last,
                    this.state.imgurl
                );
            })
            .catch(err => {
                console.log(err);
            });
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

    methodInApp(newImage) {
        console.log("method in App, newImage", newImage);
        this.setState({
            imgurl: newImage,
            uploaderIsVisible: false
        });
    }

    render() {
        return (
            <div>
                Hello! This is App calling you!
                <div onClick={this.toggleModal}>
                    <ProfilePic
                        firstname={this.state.first}
                        lastname={this.state.last}
                        imgurl={this.state.imgurl}
                    />
                </div>
                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
