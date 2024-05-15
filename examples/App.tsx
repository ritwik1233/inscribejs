import Editor from "../src/editor/Editor";
import "./App.css";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import ImageComponent from "./ImageComponent";
import React, { useState } from "react";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import AnchorLink from "./AnchorLink";
import VideoComponent from "./VideoComponent";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import DividerComponent from "./DividerComponent";
import uniqid from "uniqid";
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
      className: "heading-1",
      label: "H1",
      tooltip: "Heading 1",
    },
    {
      className: "heading-2",
      label: "H2",
      tooltip: "Heading 2",
    },
    {
      className: "heading-3",
      label: "H3",
      tooltip: "Heading 3",
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
                isEditing: false,
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
      component: ImageComponent,
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
                isEditing: false,
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
    {
      label: "Insert Divider",
      type: "Divider",
      elemProps: {},
      icon: <HorizontalRuleIcon />,
      elemHandlers: [],
      onModifyItem: (line: any) => {
        setLines((prev: any) => {
          const newLines = [...prev];
          newLines[line.order] = line;
          return [...newLines];
        });
      },
      component: DividerComponent,
    },
  ];

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
        containerStyle={{
          width: "90vw",
          marginLeft: "5vw",
          height: "60vh",
          overflowY: "auto",
          border: "1px solid black",
        }}
        lineItemStyle={{
          padding: "0px",
        }}
        lineItemIcon={
          <>
            <DragIndicatorIcon />
          </>
        }
        onGenerateId={()=>{
          return `text-${uniqid()}`;
        }}
        lineItemClassName="line-item-none"
        textFormatToolBarStyle={{
          borderRadius: "10px",
        }}
        setLines={setLines}
        textFormats={textFormats}
        components={components}
        componentPopoverStyle={{
          background: "white",
        }}
      />
    </>
  );
}

export default App;
