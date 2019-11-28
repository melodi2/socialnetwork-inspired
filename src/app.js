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
