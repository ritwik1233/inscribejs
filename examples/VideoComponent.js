import React from "react";
import { Box, Card, CardContent, Grid, TextField } from "@mui/material";
import { ResizableBox } from "react-resizable";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import ReactPlayer from "react-player";
var VideoComponent = function (props) {
    var videoUrl = props.videoUrl, width = props.width, height = props.height, onChange = props.onChange, onChangeResize = props.onChangeResize;
    var _a = React.useState(""), url = _a[0], setUrl = _a[1];
    var _b = React.useState(width), currentWidth = _b[0], setCurrentWidth = _b[1];
    var _c = React.useState(height), currentHeight = _c[0], setCurrentHeight = _c[1];
    var onResizeEnd = function (e, data) {
        var size = data.size;
        onChangeResize(size.width, size.height);
    };
    return (React.createElement(Box, null,
        React.createElement(Box, { sx: {
                position: "relative",
            } },
            React.createElement(ResizableBox, { width: width, height: height, lockAspectRatio: true, handle: React.createElement("div", { style: {
                        cursor: "se-resize",
                        position: "absolute",
                        left: currentWidth - 10,
                        top: currentHeight - 10,
                    } },
                    React.createElement(AspectRatioIcon, null)), onResize: function (e, data) {
                    var size = data.size;
                    setCurrentWidth(size.width);
                    setCurrentHeight(size.height);
                }, onResizeStop: onResizeEnd, minConstraints: [200, 100], maxConstraints: [1000, 800] },
                React.createElement(Card, { sx: {
                        width: "100%",
                        height: "100%",
                        padding: "0px",
                    } },
                    React.createElement(CardContent, { sx: {
                            width: "100%",
                            height: "100%",
                            padding: "0px",
                        } },
                        React.createElement(Grid, { container: true, spacing: 0 },
                            videoUrl.length === 0 && (React.createElement(Grid, { item: true, xs: 12 },
                                React.createElement(TextField, { label: "add youtube url", value: url, fullWidth: true, onChange: function (e) {
                                        setUrl(e.target.value);
                                    }, onBlur: function () {
                                        onChange(url);
                                    } }))),
                            videoUrl.length > 0 && (React.createElement(Grid, { item: true, xs: 12 },
                                React.createElement(ReactPlayer, { width: width, height: height, url: videoUrl }))))))))));
};
export default VideoComponent;
