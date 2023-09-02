import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Editor from "../src/editor/Editor";

describe("<Editor />", () => {
  it("renders without crashing", () => {
    render(
      <Editor lines={[]} setLines={() => {}} textFormats={[]} components={[]} />
    );
  });

  // Test with different props
  it("displays provided lines", () => {
    const lines = [
      {
        _id: "1",
        order: 1,
        isEditing: false,
        value: "Line 1",
        type: "text",
        textFormat: "text",
      },
      {
        _id: "2",
        order: 2,
        type: "text",
        isEditing: false,
        value: "Line 2",
        textFormat: "text",
      },
    ];
    const { getByText } = render(
      <Editor
        lines={lines}
        setLines={() => {}}
        textFormats={[]}
        components={[]}
      />
    );

    expect(getByText("Line 1")).toBeInTheDocument();
    expect(getByText("Line 2")).toBeInTheDocument();
  });
});
