import React from "react";
interface ImageProps {
    imageUrl: string;
    width: number;
    height: number;
    onChange: Function;
    onChangeResize: Function;
}
declare const Image: React.FC<ImageProps>;
export default Image;
