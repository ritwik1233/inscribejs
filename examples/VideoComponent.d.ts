import React from "react";
interface VideoComponentProps {
    videoUrl: string;
    width: number;
    height: number;
    onChange: (value: string) => void;
    onChangeResize: (width: number, height: number) => void;
}
declare const VideoComponent: React.FC<VideoComponentProps>;
export default VideoComponent;
