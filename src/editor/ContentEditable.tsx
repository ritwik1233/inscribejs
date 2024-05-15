import React, { useEffect } from "react";
import { ContentEditableProps } from "../types";

function setCaretToEnd(element: HTMLElement) {
  const range = document.createRange();
  const selection = window.getSelection();

  range.selectNodeContents(element);
  range.collapse(false); // Collapse to end
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

const ContentEditable: React.FC<ContentEditableProps> = (props) => {
  const {
    _id,
    value,
    previewMode,
    textFormats,
    order,
    isEditing,
    isMouseClicked,
    onTextUpdateEnter,
    onRemoveLine,
    onTextUpdate,
    onFocusUp,
    onFocusDown,
    onToggleEdit,
  } = props;

  const textRef = React.useRef<HTMLDivElement>(null);
  const isEditorClicked = React.useRef(false);

  useEffect(() => {
    if (value.length > 0 && textFormats) {
      const elem = document.getElementById(`lineItem-${_id}`);
      if (elem) {
        let spanChildren = elem.querySelectorAll("span[data-clickhandlerid]");
        spanChildren.forEach((span: any) => {
          const handlerId = span.getAttribute("data-clickhandlerid");
          const clickHandlerObj = textFormats?.find((format) => {
            const onClickHandlerObj = format.onClickHandlerObj;
            return onClickHandlerObj?.clickHandlerId === handlerId;
          })?.onClickHandlerObj;
          const handlerFunc = clickHandlerObj?.onClickHandlerFunc;
          if (handlerFunc) {
            span.onclick = handlerFunc;
          }
        });
      }
    }
  }, [value, textFormats]);

  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        if (textRef.current) {
          if (!isEditorClicked.current) {
            textRef.current.focus();
            setCaretToEnd(textRef.current);
          } else {
            isEditorClicked.current = false;
          }
        }
      }, 100);
    } else {
      if (textRef.current) {
        textRef.current?.blur();
      }
    }
  }, [isEditing]);

  return (
    <div
      ref={textRef}
      id={`lineItem-${_id}`}
      data-order={`lineItem-${order}`}
      contentEditable={
        previewMode ? "false" : isMouseClicked ? "false" : "true"
      }
      suppressContentEditableWarning={true}
      placeholder="type @ for command"
      onClick={(e) => {
        isEditorClicked.current = !isEditorClicked.current;
        if (_id.length > 0 && onToggleEdit && !isEditing) {
          onToggleEdit(order);
          return;
        }
      }}
      className="editor-item-editable-text"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const val = textRef.current?.innerHTML || "";
          if (_id.length === 0) {
            onTextUpdateEnter(val);
            return;
          }
        }
        if (_id?.length) {
          const val = textRef.current?.innerHTML || "";
          if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            onTextUpdateEnter(val, order);
            return;
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            e.stopPropagation();
            if (onFocusUp) {
              onFocusUp(val, order);
              return;
            }
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            e.stopPropagation();
            if (onFocusDown) {
              onFocusDown(val, order);
              return;
            }
          }
          if (e.key === "Backspace" && val.length === 0 && onRemoveLine) {
            e.preventDefault();
            e.stopPropagation();
            onRemoveLine(order);
            return;
          }
        }
      }}
      onBlur={(e) => {
        const val = textRef.current?.innerHTML || "";
        if (_id.length === 0) {
          e.preventDefault();
          onTextUpdate(val);
          return;
        }
        if (_id.length && isEditing) {
          e.preventDefault();
          onTextUpdate(val, order);
          return;
        }
      }}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};
export default ContentEditable;
