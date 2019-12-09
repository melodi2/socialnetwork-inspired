import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            buttonText: "Edit your Bio..."
        };
    }

    componentDidMount() {}

    toggleEditBio() {
        this.setState({
            editingMode: !this.state.editingMode
        });
    }

    handleChange(textarea) {
        this.setState({
            [textarea.name]: textarea.value
        });
    }

    uploadBio() {
        axios
            .post("/bio", {
                bio: this.state.bio
            })
            .then(({ data }) => {
                console.log("inside post axios data", data);
                this.setState({
                    bio: data.bio
                });
                this.props.updateBio(this.state.bio);
                this.toggleEditBio();
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        let buttonText;
        this.props.bio
            ? (buttonText = "Edit your bio")
            : (buttonText = "Add your bio");
        if (this.state.editingMode) {
            return (
                <div>
                    <textarea
                        name="bio"
                        defaultValue={this.props.bio}
                        onChange={e => this.handleChange(e.target)}
                    />
                    <button onClick={() => this.uploadBio()}>Save</button>
                </div>
            );
        } else {
            return (
                <div>
                    <p>{this.props.bio}</p>
                    <button onClick={() => this.toggleEditBio()}>
                        {buttonText}
                    </button>
                </div>
            );
        }
    }
}
