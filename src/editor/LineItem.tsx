import React from "react";
import ContentEditable from "./ContentEditable";
import { ComponentProps, LineItemComponentProps } from "../types";
import CustomComponent from "./CustomComponent";
import AddIcon from "./AddIcon";

const LineItem: React.FC<LineItemComponentProps> = (props) => {
  const {
    line,
    components,
    isMouseClicked,
    onTextUpdateEnter,
    onTextUpdate,
    onFocusUp,
    onFocusDown,
    textFormats,
    onToggleEdit,
    onRemoveLine,
    onOpenComponentToolbar,
  } = props;
  const component = components.find((c: ComponentProps) => c.type === line.type);
  const [hover, setHover] = React.useState(false);
  return (
    <div
      className="editor-item"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <button
        className="icon-button"
        onClick={onOpenComponentToolbar}
        style={{
          visibility: hover ? "visible" : "hidden",
        }}
      >
        <AddIcon />
      </button>
      {line.type === "text" && (
        <ContentEditable
          _id={line._id}
          value={line.value}
          order={line.order}
          textFormats={textFormats}
          isEditing={line.isEditing}
          isMouseClicked={isMouseClicked}
          onTextUpdateEnter={onTextUpdateEnter}
          onTextUpdate={onTextUpdate}
          onFocusUp={onFocusUp}
          onFocusDown={onFocusDown}
          onRemoveLine={onRemoveLine}
          onToggleEdit={onToggleEdit}
        />
      )}
      {line.type !== "text" && (
        <CustomComponent
          line={line}
          component={component}
          onToggleEdit={onToggleEdit ? onToggleEdit : () => {}}
        />
      )}
    </div>
  );
};

export default LineItem;
