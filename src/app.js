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
        this.updateBio = this.updateBio.bind(this);
    }

    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                this.setState({
                    first: data.first,
                    last: data.last,
                    imgurl: data.imgurl,
                    bio: data.bio
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
                <div>
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        imgurl={this.state.imgurl}
                        toggleModal={this.toggleModal}
                        profilePicClass="smallProfilePic"
                    />
                </div>
                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    imgurl={this.state.imgurl}
                    bio={this.state.bio}
                    profilePicClass="bigProfilePic"
                    updateBio={this.updateBio}
                    toggleModal={this.toggleModal}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
