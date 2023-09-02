import React from "react";
import { ResizableBox } from "react-resizable";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { Box } from "@mui/material";
interface ImageProps {
  imageUrl: string;
  width: number;
  height: number;
  onChange: Function;
  onChangeResize: Function;
}

function fileToDataURL(file: any, callback: Function) {
  if (file) {
    const reader = new FileReader();

    reader.onload = function (event: any) {
      callback(event.target.result);
    };

    reader.readAsDataURL(file);
  } else {
    callback("");
  }
}
const MyHandle = React.forwardRef((props, ref) => {
  const { ...restProps }: any = props;
  return (
    <div
      ref={ref}
      {...restProps}
      style={{
        position: "absolute",
        right: "41%",
        bottom: "0.5%",
      }}
    >
      <AspectRatioIcon />
    </div>
  );
});
const Image: React.FC<ImageProps> = (props) => {
  const { imageUrl = "", width, height, onChange, onChangeResize } = props;
  const onResizeEnd = (e: any, data: any) => {
    const { size } = data;
    onChangeResize(size.width, size.height);
  };
  return (
    <React.Fragment>
      {imageUrl.length === 0 && (
        <input
          type="file"
          onChange={(e) => {
            const files = e.target.files || [];
            const file = files[0] || {};
            fileToDataURL(file, (dataURL: any) => {
              onChange(dataURL);
            });
          }}
        />
      )}
      {imageUrl.length > 0 && (
        <Box
          sx={{
            position: "relative",
          }}
        >
          <ResizableBox
            width={width}
            height={height}
            lockAspectRatio
            handle={<MyHandle />}
            onResizeStop={onResizeEnd}
            minConstraints={[100, 100]}
            maxConstraints={[500, 600]}
          >
            <img
              src={imageUrl}
              style={{
                width: "100%",
                height: "100%",
              }}
              draggable="false"
            />
          </ResizableBox>
        </Box>
      )}
    </React.Fragment>
  );
};

export default Image;