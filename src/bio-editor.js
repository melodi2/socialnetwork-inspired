import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            buttonText: "Edit your Bio...",
            bio: this.props.bio || ""
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
                <div className="form">
                    <textarea
                        rows="3"
                        maxLength="150"
                        name="bio"
                        defaultValue={this.props.bio}
                        placeholder="max. 150 characters"
                        onChange={e => this.handleChange(e.target)}
                    />
                    <button onClick={() => this.uploadBio()}>Save</button>
                </div>
            );
        } else {
            return (
                <div className="form">
                    <p className="bio">{this.props.bio}</p>
                    <button onClick={() => this.toggleEditBio()}>
                        {buttonText}
                    </button>
                </div>
            );
        }
    }
}
