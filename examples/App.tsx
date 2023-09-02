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
  const [lines, setLines]: any = useState([]);
  const [anchorEl, setAnchorEl]: any = useState(null);
  const textFormats = [
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
      label: <InsertLinkIcon />,
      tooltip: "Add link",
      onClickHandlerObj: {
        clickHandlerId: "clickhandler1",
        onClickHandlerFunc: function (e: any) {
          setAnchorEl(e.target);
        },
      },
    },
  ];

  const components = [
    {
      label: "Insert Image",
      type: "Image",
      elemProps: {
        imageUrl: "",
        width: 500,
        height: 300,
      },
      icon: <PhotoSizeSelectActualIcon />,
      elemHandlers: [
        {
          triggerModifyLine: true,
          funcPropName: "onChange",
          funCall: (value: any) => {
            return [
              {
                key: "imageUrl",
                value,
              },
            ];
          },
        },
        {
          triggerModifyLine: true,
          funcPropName: "onChangeResize",
          funCall: (width: number, height: number) => {
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
      onModifyItem: (line: any) => {
        setLines((prev: any) => {
          const newLines = [...prev];
          newLines[line.order] = line;
          return [...newLines];
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
      icon: <VideoLibraryIcon />,
      elemHandlers: [
        {
          triggerModifyLine: true,
          funcPropName: "onChange",
          funCall: (value: any) => {
            return [
              {
                key: "videoUrl",
                value,
              },
            ];
          },
        },
        {
          triggerModifyLine: true,
          funcPropName: "onChangeResize",
          funCall: (width: number, height: number) => {
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
      onModifyItem: (line: any) => {
        setLines((prev: any) => {
          const newLines = [...prev];
          newLines[line.order] = line;
          return [...newLines];
        });
      },
      component: VideoComponent,
    },
  ];

  React.useEffect(()=>{
    console.log(lines);
  }, [lines]);
  return (
    <>
      <AnchorLink
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        onModifyItem={(newLine: { _id: string; value: string }) => {
          setLines((prev: any) => {
            let newLines = [...prev];
            newLines = newLines.map((line: any) => {
              if (line._id === newLine._id) {
                return {
                  ...line,
                  value: newLine.value,
                };
              }
              return line;
            });
            return [...newLines];
          });
        }}
      />
      <Editor
        lines={lines}
        setLines={setLines}
        textFormats={textFormats}
        components={components}
      />
    </>
  );
}

export default App;