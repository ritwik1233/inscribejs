import React from "react";
import { render } from "@testing-library/react";
import Editor from "../src/editor/Editor";
describe("<Editor />", function () {
    it("renders without crashing", function () {
        render(React.createElement(Editor, { lines: [], setLines: function () { }, textFormats: [], components: [] }));
    });
    // Test with different props
    it("displays provided lines", function () {
        var lines = [
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
        var getByText = render(React.createElement(Editor, { lines: lines, setLines: function () { }, textFormats: [], components: [] })).getByText;
        expect(getByText("Line 1")).toBeInTheDocument();
        expect(getByText("Line 2")).toBeInTheDocument();
    });
});
