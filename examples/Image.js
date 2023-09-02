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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { ResizableBox } from "react-resizable";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { Box } from "@mui/material";
function fileToDataURL(file, callback) {
    if (file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            callback(event.target.result);
        };
        reader.readAsDataURL(file);
    }
    else {
        callback("");
    }
}
var MyHandle = React.forwardRef(function (props, ref) {
    var restProps = __rest(props, []);
    return (React.createElement("div", __assign({ ref: ref }, restProps, { style: {
            position: "absolute",
            right: "41%",
            bottom: "0.5%",
        } }),
        React.createElement(AspectRatioIcon, null)));
});
var Image = function (props) {
    var _a = props.imageUrl, imageUrl = _a === void 0 ? "" : _a, width = props.width, height = props.height, onChange = props.onChange, onChangeResize = props.onChangeResize;
    var onResizeEnd = function (e, data) {
        var size = data.size;
        onChangeResize(size.width, size.height);
    };
    return (React.createElement(React.Fragment, null,
        imageUrl.length === 0 && (React.createElement("input", { type: "file", onChange: function (e) {
                var files = e.target.files || [];
                var file = files[0] || {};
                fileToDataURL(file, function (dataURL) {
                    onChange(dataURL);
                });
            } })),
        imageUrl.length > 0 && (React.createElement(Box, { sx: {
                position: "relative",
            } },
            React.createElement(ResizableBox, { width: width, height: height, lockAspectRatio: true, handle: React.createElement(MyHandle, null), onResizeStop: onResizeEnd, minConstraints: [100, 100], maxConstraints: [500, 600] },
                React.createElement("img", { src: imageUrl, style: {
                        width: "100%",
                        height: "100%",
                    }, draggable: "false" }))))));
};
export default Image;
