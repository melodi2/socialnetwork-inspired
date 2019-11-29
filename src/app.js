import React from "react";
import axios from "./axios";
import ProfilePic from "./profile-pic";
import Uploader from "./uploader";
import Profile from "./profile";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.methodInApp = this.methodInApp.bind(this);
    }

    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                this.setState({
                    first: data.first,
                    last: data.last,
                    imgurl: data.imgurl
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    toggleModal() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }

    methodInApp(newImage) {
        this.setState({
            imgurl: newImage,
            uploaderIsVisible: false
        });
    }

    updateBio(newBio) {
        this.setState({
            bio: newBio
        });
    }

    render() {
        if (!this.state.first) {
            return null;
        }
        return (
            <div>
                Hello! This is App calling you!
                <div onClick={this.toggleModal}>
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        imgurl={this.state.imgurl}
                        profilePicClass="smallProfilePic"
                    />
                </div>
                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    imgurl={this.state.imgurl}
                    profilePicClass="bigProfilePic"
                    updateBio={this.updateBio}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
