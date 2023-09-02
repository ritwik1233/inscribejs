import { Grid, IconButton, Popover, TextField, Tooltip, Typography, } from "@mui/material";
import React, { useState } from "react";
import { getParentLineItem } from "../src/editor/helpers";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
var AnchorLink = function (props) {
    var anchorEl = props.anchorEl, setAnchorEl = props.setAnchorEl, onModifyItem = props.onModifyItem;
    var _a = useState(""), value = _a[0], setValue = _a[1];
    React.useEffect(function () {
        if (anchorEl) {
            var url = anchorEl.getAttribute("data-url");
            setValue(url || "");
        }
    }, [anchorEl]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Popover, { open: !!anchorEl, anchorEl: anchorEl, disableRestoreFocus: true, sx: {
                minWidth: "100px",
                minHeight: "100px",
            }, anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
            }, transformOrigin: {
                vertical: "top",
                horizontal: "center",
            }, onClose: function (e) {
                e.preventDefault();
                e.stopPropagation();
                setAnchorEl(null);
                setValue("");
            } },
            React.createElement(Grid, { container: true, spacing: 2, alignItems: "center", sx: {
                    margin: "3px",
                } },
                React.createElement(Grid, { item: true, xs: 12 },
                    React.createElement(Typography, { variant: "caption" }, "Add Link")),
                React.createElement(Grid, { item: true, xs: 9 },
                    React.createElement(TextField, { fullWidth: true, value: value, onChange: function (e) {
                            setValue(e.target.value);
                        }, onBlur: function () {
                            if (value.length > 0) {
                                var parentItem = getParentLineItem(anchorEl);
                                anchorEl === null || anchorEl === void 0 ? void 0 : anchorEl.setAttribute("data-url", value);
                                var parentId = parentItem === null || parentItem === void 0 ? void 0 : parentItem.id;
                                var elemId = parentId === null || parentId === void 0 ? void 0 : parentId.split("-")[1];
                                var newValue = parentItem.innerHTML;
                                var item = {
                                    _id: elemId,
                                    value: newValue,
                                };
                                onModifyItem(item);
                            }
                        } })),
                React.createElement(Grid, { item: true, xs: 3 }, value.length > 0 && React.createElement(Tooltip, { title: "Open link in new tab" },
                    React.createElement(IconButton, { size: "small", onClick: function () {
                            var url = anchorEl.getAttribute("data-url");
                            if (url) {
                                window.open(url, "_blank");
                            }
                        } },
                        React.createElement(OpenInNewIcon, null)))),
                React.createElement(Grid, { item: true, xs: 12 })))));
};
export default AnchorLink;
