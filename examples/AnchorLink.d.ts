import React from "react";
interface AnchorLinkProps {
    anchorEl: any;
    setAnchorEl: any;
    onModifyItem: (line: {
        _id: string;
        value: string;
    }) => void;
}
declare const AnchorLink: React.FC<AnchorLinkProps>;
export default AnchorLink;
