import React from "react";
import ContentEditable from "./ContentEditable";
import { ComponentProps, LineItemComponentProps } from "../types";
import CustomComponent from "./CustomComponent";
import AddIcon from "./AddIcon";
import { useDrag, useDrop } from "react-dnd";

const LineItem: React.FC<LineItemComponentProps> = (props) => {
  const {
    line,
    components,
    isMouseClicked,
    lineItemIcon,
    lineItemClassName,
    lineItemIconStyle = {},
    lineItemStyle = {},
    onTextUpdateEnter,
    onTextUpdate,
    onFocusUp,
    onFocusDown,
    textFormats,
    onMoveItem,
    onToggleEdit,
    onRemoveLine,
    onOpenComponentToolbar,
  } = props;
  const component = components.find(
    (c: ComponentProps) => c.type === line.type
  );
  const dragRef = React.useRef(null);
  const iconDragRef = React.useRef(null);
  
  const [hover, setHover] = React.useState(false);
  const [isOver, setIsOver] = React.useState(false);
  const [, drop] = useDrop({
    accept: "ITEM",
    drop: (dragItem: any, monitor) => {
      onMoveItem(dragItem.index, line.order);
      setIsOver(false);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    canDrop: () => true,
    hover: (item, monitor) => {
      if (monitor.isOver()) {
        setIsOver(true);
      } else {
        setIsOver(false);
      }
    }
  });
  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: { index: line.order },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(iconDragRef);
  drop(dragRef);
  return (
    <div
      id={`editor-item-${line._id}`}
      ref={dragRef}
      className={`editor-item ${lineItemClassName || ""}`}
      style={{
        ...lineItemStyle,
        border: isOver ? "1px solid black" : "none",
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <button
        className="icon-button"
        ref={iconDragRef}
        onClick={onOpenComponentToolbar}
        style={{
          visibility: hover && components.length > 0 ? "visible" : "hidden",
          opacity: isDragging ? 0.5 : 1,
          ...lineItemIconStyle,
        }}
      >
        {lineItemIcon || <AddIcon />}
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
