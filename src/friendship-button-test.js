import React from "react";
import { BioEditor } from "./bio-button";
// import axios from "./axios";
import { render, fireEvent } from "@testing-library/react";

// jest.mock("./axios");

test("Renders correctly when no prop is passed", () => {
    const onClick = jest.fn();
    const { container } = render(<Friendshipbutton onClick={onClick} />);

    fireEvent.click(container.querySelector("button"));

    expect(onClick.mock.calls.length).toBe(1);
    expect(container.querySelector("button").innerHTML).toContain(
        "Cancel Request"
    );
});
