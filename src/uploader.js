import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("uploader mounted");
        console.log("this.props", this.props);
        // this.props.methodInApp();
    }

    render() {
        return (
            <div>
                <h3>Uploader</h3>
            </div>
        );
    }
}
