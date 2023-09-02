var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import Editor from "../src/editor/Editor";
import "./App.css";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Image from "./Image";
import React, { useState } from "react";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import AnchorLink from "./AnchorLink";
import VideoComponent from "./VideoComponent";
function App() {
    var _a = useState([]), lines = _a[0], setLines = _a[1];
    var _b = useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var textFormats = [
        {
            className: "blue-text",
            label: "Blue",
            tooltip: "Turn text blue",
        },
        {
            className: "red-text",
            label: "Red",
            tooltip: "Turn text red",
        },
        {
            className: "click-handler",
            label: React.createElement(InsertLinkIcon, null),
            tooltip: "Add link",
            onClickHandlerObj: {
                clickHandlerId: "clickhandler1",
                onClickHandlerFunc: function (e) {
                    setAnchorEl(e.target);
                },
            },
        },
    ];
    var components = [
        {
            label: "Insert Image",
            type: "Image",
            elemProps: {
                imageUrl: "",
                width: 500,
                height: 300,
            },
            icon: React.createElement(PhotoSizeSelectActualIcon, null),
            elemHandlers: [
                {
                    triggerModifyLine: true,
                    funcPropName: "onChange",
                    funCall: function (value) {
                        return [
                            {
                                key: "imageUrl",
                                value: value,
                            },
                        ];
                    },
                },
                {
                    triggerModifyLine: true,
                    funcPropName: "onChangeResize",
                    funCall: function (width, height) {
                        return [
                            {
                                key: "width",
                                value: width,
                            },
                            {
                                key: "height",
                                value: height,
                            },
                        ];
                    },
                },
            ],
            onModifyItem: function (line) {
                setLines(function (prev) {
                    var newLines = __spreadArray([], prev, true);
                    newLines[line.order] = line;
                    return __spreadArray([], newLines, true);
                });
            },
            component: Image,
        },
        {
            label: "Insert Video",
            type: "Video",
            elemProps: {
                videoUrl: "",
                width: 500,
                height: 300,
            },
            icon: React.createElement(VideoLibraryIcon, null),
            elemHandlers: [
                {
                    triggerModifyLine: true,
                    funcPropName: "onChange",
                    funCall: function (value) {
                        return [
                            {
                                key: "videoUrl",
                                value: value,
                            },
                        ];
                    },
                },
                {
                    triggerModifyLine: true,
                    funcPropName: "onChangeResize",
                    funCall: function (width, height) {
                        return [
                            {
                                key: "width",
                                value: width,
                            },
                            {
                                key: "height",
                                value: height,
                            },
                        ];
                    },
                },
            ],
            onModifyItem: function (line) {
                setLines(function (prev) {
                    var newLines = __spreadArray([], prev, true);
                    newLines[line.order] = line;
                    return __spreadArray([], newLines, true);
                });
            },
            component: VideoComponent,
        },
    ];
    React.useEffect(function () {
        console.log(lines);
    }, [lines]);
    return (React.createElement(React.Fragment, null,
        React.createElement(AnchorLink, { anchorEl: anchorEl, setAnchorEl: setAnchorEl, onModifyItem: function (newLine) {
                setLines(function (prev) {
                    var newLines = __spreadArray([], prev, true);
                    newLines = newLines.map(function (line) {
                        if (line._id === newLine._id) {
                            return __assign(__assign({}, line), { value: newLine.value });
                        }
                        return line;
                    });
                    return __spreadArray([], newLines, true);
                });
            } }),
        React.createElement(Editor, { lines: lines, setLines: setLines, textFormats: textFormats, components: components })));
}
export default App;
