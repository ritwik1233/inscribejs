import React from "react";
import { TextFormatToolBarProps, TextItem } from "../types";
import PositionPopover from "./PositionPopover";

const TextFormatToolBar: React.FC<TextFormatToolBarProps> = (props) => {
  const { open, anchorPosition, textFormats, onAddFormat, onClose } = props;
  return (
    <PositionPopover
      open={open}
      anchorPosition={anchorPosition}
      onClose={onClose}
    >
      <div className="textformat-button-group">
        <button
          className="textformat-btn"
          onClick={(e: any) => {
            onAddFormat("span-decorator-bold");
            onClose(e);
          }}
        >
          B
        </button>
        <button
          className="textformat-btn"
          onClick={(e: any) => {
            onAddFormat("span-decorator-italic");
            onClose(e);
          }}
        >
          I
        </button>
        <button
          className="textformat-btn"
          onClick={(e: any) => {
            onAddFormat("span-decorator-underline");
            onClose(e);
          }}
        >
          U
        </button>
        {textFormats.map((format: TextItem, index) => {
          return (
            <button
              className="textformat-btn"
              key={index}
              onClick={(e: any) => {
                onAddFormat(format.className, format.onClickHandlerObj);
                onClose(e);
              }}
            >
              {format.label}
            </button>
          );
        })}
      </div>
    </PositionPopover>
  );
};

export default TextFormatToolBar;
