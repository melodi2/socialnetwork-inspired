import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            buttonText: "Edit your Bio..."
        };
        // this.uploadBio = this.uploadBio.bind(this);
        // this.toggleEditBio = this.toggleEditBio.bind(this);
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
                    <h1>{this.props.bio}</h1>
                    <button onClick={() => this.toggleEditBio()}>
                        {this.state.buttonText}
                    </button>
                </div>
            );
        }
    }
}
