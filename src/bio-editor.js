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

    componentDidMount() {
        console.log("props in Bioeditor", this.props);
        if (!this.props.bio) {
            console.log("no bio......");
            this.setState(
                {
                    buttonText: "Add your bio"
                },
                () => console.log("this.state", this.state)
            );
        }
    }
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
        console.log("this.state.bio", this.state.bio);
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
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        if (this.state.editingMode) {
            return (
                <div>
                    <h1>I am editing the bio</h1>
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
                    <h1>I am the bio</h1>
                    <button onClick={() => this.toggleEditBio()}>
                        {this.state.buttonText}
                    </button>
                </div>
            );
        }
    }
}
