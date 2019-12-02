import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import ProfilePic from "./profile-pic";
import Uploader from "./uploader";
import Profile from "./profile";
import { OtherProfile } from "./otherprofile";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }

    componentDidMount() {
        axios
            .get("/user.json")
            .then(({ data }) => {
                this.setState({
                    first: data.first,
                    last: data.last,
                    imgurl: data.imgurl,
                    bio: data.bio,
                    id: data.id
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

    updateImage(newImage) {
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
                <BrowserRouter>
                    <div>
                        <div className="headerPic">
                            <img className="logo" src="/img/logo.png" />
                            <ProfilePic
                                first={this.state.first}
                                last={this.state.last}
                                imgurl={this.state.imgurl}
                                toggleModal={this.toggleModal}
                                profilePicClass="smallProfilePic"
                            />
                        </div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    imgurl={this.state.imgurl}
                                    profilePicClass="bigProfilePic"
                                    bio={this.state.bio}
                                    updateBio={this.updateBio}
                                    toggleModal={this.toggleModal}
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={props => (
                                <OtherProfile
                                    userid={this.state.id}
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </div>
                </BrowserRouter>

                {this.state.uploaderIsVisible && (
                    <Uploader updateImage={this.updateImage} />
                )}
            </div>
        );
    }
}
