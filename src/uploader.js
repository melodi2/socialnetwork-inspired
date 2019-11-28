import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.uploadProfilePic = this.uploadProfilePic.bind(this);
    }

    componentDidMount() {}

    handleChange(inputElement) {
        console.log(
            "inputElement.name,inputElement.value",
            inputElement.name,
            inputElement.files[0]
        );
        this.setState({
            [inputElement.name]: inputElement.files[0]
        });
    }

    uploadProfilePic() {
        var fd = new FormData();
        fd.append("file", this.state.file);
        axios
            .post("/upload", fd)
            .then(({ data }) => {
                console.log("inside post axios data.imgurl", data.imgurl);
                this.setState({
                    imgurl: data.imgurl
                });
                this.props.methodInApp(this.state.imgurl);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <h3>Uploader</h3>
                <input
                    type="file"
                    name="file"
                    id="file"
                    className="inputfile"
                    accept="image/*"
                    onChange={e => this.handleChange(e.target)}
                />
                <button onClick={this.uploadProfilePic}>UPLOAD</button>
            </div>
        );
    }
}
