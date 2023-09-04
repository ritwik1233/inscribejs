# Inscribe-js

Inscribe is a powerful, customizable React-based rich text editor that allows developers to seamlessly integrate their own components. Whether you're building a blog platform, a CMS, or any application that requires text editing with a touch of personalization, inscribe has got you covered.

## Features

- **Custom Components**: Embed your own React components inside the editor.
- **Event Handlers**: Attach custom event handlers to text items, components, and more.
- **Line Item Management**: Control and manage individual lines in the editor.

## Installation

```bash
npm install inscribe-js
```

## API & Type Definitions

### `ClickHanderType`

- `clickHandlerId`: Identifier for the click handler.
- `onClickHandlerFunc?`: Optional function to be executed on click.

### `ClickAwayListenerProps`

- `onClickAway`: Function executed when a click event is detected outside the component's children.
- `children`: React child components.

### `PopoverProps`

- `open`: Boolean to control the visibility of the popover.
- `anchorPosition`: Object with `top` and `left` properties to position the popover.
- `onClose`: Function called when the popover is closed.
- `children`: React child components.

### `TextItem`

- `className`: CSS class name for the text item.
- `label`: Label displayed for the text item. Can be a string or a React node.
- `onClickHandlerObj?`: Optional click handler object of type `ClickHanderType`.

### `ElemHandlerType`

- `triggerModifyLine`: Boolean to decide if the line should be modified.
- `funcPropName`: Name of the function property.
- `funCall`: Function to be called.

### `ComponentProps`

- `label`: Label for the component.
- `type`: Type of the component.
- `icon?`: Optional icon for the component. Can be a React node.
- `elemProps`: Properties for the React element.
- `elemHandlers`: Array of element handlers of type `ElemHandlerType`.
- `onModifyItem`: Function called to modify an item.
- `component`: React functional component.

### `LineItemProps`

- `_id`: Unique identifier for the line item.
- `isEditing`: Boolean to indicate if the line item is being edited.
- `order`: Order number for the line item.
- Additional key-value pairs can also be added.

## Example

### Editor with anchorlink
Below examples demonstrates how you can integrate a simple functionality of highlighting text and converting them into links

#### App.js

```
import Editor from "../src/editor/Editor";
import "./App.css";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import React, { useState } from "react";
import AnchorLink from "./AnchorLink";
function App() {
  const [lines, setLines]: any = useState([]);
  const [anchorEl, setAnchorEl]: any = useState(null);
  const textFormats = [
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
      />
    </>
  );
}

export default App;

```

#### App.css

```
click-handler {
    color: #61dafb;
    cursor: pointer !important;
    transition: border 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease;
    border: 2px solid transparent;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    padding: 0;
  }

  .click-handler:hover {
    border: 2px solid lightblue;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
  }

```


### Editor with Custom Component

Below examples demonstrates how you can intergrate a simple image component in the editor

#### App.js
```
import Editor from "../src/editor/Editor";
import "./App.css";
import React, { useState } from "react";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import VideoComponent from "./VideoComponent";
function App() {
  const [lines, setLines]: any = useState([]);
  const components = [
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

  return (
    <>
      <Editor
        lines={lines}
        setLines={setLines}
        components={components}
      />
    </>
  );
}

export default App;
```

#### VideoComponent.tsx
```
import React from "react";
import { Box, Card, CardContent, Grid, TextField } from "@mui/material";
import { ResizableBox } from "react-resizable";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import ReactPlayer from "react-player";

interface VideoComponentProps {
  videoUrl: string;
  width: number;
  height: number;
  onChange: (value: string) => void;
  onChangeResize: (width: number, height: number) => void;
}
const VideoComponent: React.FC<VideoComponentProps> = (props) => {
  const { videoUrl, width, height, onChange, onChangeResize } = props;
  const [url, setUrl] = React.useState<string>("");
  const [currentWidth, setCurrentWidth] = React.useState<number>(width);
  const [currentHeight, setCurrentHeight] = React.useState<number>(height);
  const onResizeEnd = (e: any, data: any) => {
    const { size } = data;
    onChangeResize(size.width, size.height);
  };

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <ResizableBox
          width={width}
          height={height}
          lockAspectRatio
          handle={
            <div
              style={{
                cursor: "se-resize",
                position: "absolute",
                left: currentWidth - 10,
                top: currentHeight - 10,
              }}
            >
              <AspectRatioIcon />
            </div>
          }
          onResize={(e, data) => {
            const { size } = data;
            setCurrentWidth(size.width);
            setCurrentHeight(size.height);
          }}
          onResizeStop={onResizeEnd}
          minConstraints={[200, 100]}
          maxConstraints={[1000, 800]}
        >
          <Card
            sx={{
              width: "100%",
              height: "100%",
              padding: "0px",
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                height: "100%",
                padding: "0px",
              }}
            >
              <Grid container spacing={0}>
                {videoUrl.length === 0 && (
                  <Grid item xs={12}>
                    <TextField
                      label="add youtube url"
                      value={url}
                      fullWidth
                      onChange={(e) => {
                        setUrl(e.target.value);
                      }}
                      onBlur={() => {
                        onChange(url);
                      }}
                    />
                  </Grid>
                )}
                {videoUrl.length > 0 && (
                  <Grid item xs={12}>
                    <ReactPlayer width={width} height={height} url={videoUrl} />
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </ResizableBox>
      </Box>
    </Box>
  );
};

export default VideoComponent;

```
