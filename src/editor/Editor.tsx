import React, { useEffect, useRef, useState } from "react";
import ContentEditable from "./ContentEditable";
import LineItem from "./LineItem";
import uniqid from "uniqid";
import {
  createTextSelectionRange,
  formatItem,
  getAttributeValue,
  getFirstTextNode,
  getLastTextNode,
  getParentLineItem,
  optimizeChildNodes,
} from "./helpers";
import TextFormatToolBar from "./TextFormatToolBar";
import {
  ClickHanderType,
  ComponentProps,
  EditorProps,
  LineItemProps,
} from "../types";
import ComponentPopover from "./ComponentPopover";
import "./Editor.css";

const Editor: React.FC<EditorProps> = (props) => {
  const { lines, setLines, textFormats, components } = props;

  const [isMouseClicked, setIsMouseClicked] = useState(false);
  const isMouseClickedRef = useRef(false);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [insertComponentToolBar, setInsertComponentToolBar] = useState(null);
  const [toolBarItem, setToolBarItem] = useState({});
  const rangeArray = useRef<any>([]);
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection: any = window.getSelection();
      let range: any = {};
      try {
        range = selection.getRangeAt(0);
      } catch (e) {
        range.collapsed = true;
      }
      if (range.collapsed) {
        rangeArray.current = [];
        if (isMouseClickedRef.current) {
          isMouseClickedRef.current = false;
          setIsMouseClicked(false);
        }
      } else {
        isMouseClickedRef.current = true;
        setIsMouseClicked(true);
      }
    };
    const onMouseUp = () => {
      if (isMouseClickedRef.current) {
        isMouseClickedRef.current = false;
        setIsMouseClicked(false);
        const selection: any = window.getSelection();
        let range: any = {};
        try {
          range = selection.getRangeAt(0);
        } catch (e) {
          range.collapsed = true;
        }
        if (!range.collapsed) {
          const mousePosition = mousePositionRef.current;
          setTooltipPosition(mousePosition);
          setShowTooltip(true);
          const startNode = range.startContainer;
          const startParent = getParentLineItem(startNode);
          const endNode = range.endContainer;
          const endParent = getParentLineItem(endNode);
          const startParentId = startParent?.id;
          const endParentId = endParent?.id;
          const startOffset = range.startOffset;
          const endOffset = range.endOffset;
          if (startParentId && endParentId) {
            if (startParentId === endParentId) {
              const newRange = createTextSelectionRange(
                startNode,
                startOffset,
                endNode,
                endOffset
              );
              rangeArray.current = [newRange];
            } else {
              let startOrder = -1;
              let endOrder = -1;
              if (startParent) {
                startOrder = parseInt(
                  getAttributeValue(
                    startParent as Element,
                    "data-order"
                  )?.split("-")[1] || ""
                );
              }
              if (endParent) {
                endOrder = parseInt(
                  getAttributeValue(endParent as Element, "data-order")?.split(
                    "-"
                  )[1] || ""
                );
              }
              const selectedLines = lines.filter((l: any) => {
                return l.order >= startOrder && l.order <= endOrder;
              });
              const newRangeArray = selectedLines.map((line: any) => {
                if (line.order === startOrder) {
                  const ec = getLastTextNode(startParent);
                  const textContent = ec.textContent;
                  const newRange = createTextSelectionRange(
                    startNode,
                    startOffset,
                    ec,
                    textContent.length
                  );
                  return newRange;
                } else if (line.order === endOrder) {
                  const sc = getFirstTextNode(endParent);
                  const newRange = createTextSelectionRange(
                    sc,
                    0,
                    endNode,
                    endOffset
                  );
                  return newRange;
                } else {
                  const elem = document.getElementById(`lineItem-${line._id}`);
                  const sc = getFirstTextNode(elem);
                  const ec = getLastTextNode(elem);
                  const textContent = ec.textContent;
                  const newRange = createTextSelectionRange(
                    sc,
                    0,
                    ec,
                    textContent.length
                  );
                  return newRange;
                }
              });
              rangeArray.current = newRangeArray;
            }
          }
        }
      }
    };
    const onMouseMove = (e: any) => {
      if (isMouseClickedRef.current) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        mousePositionRef.current = { x: mouseX, y: mouseY };
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [lines]);

  const selectedLine: LineItemProps | undefined = lines.find(
    (line: LineItemProps) => line.isEditing
  );

  useEffect(() => {
    const onKeyDown = (e: any) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        onRemoveLine(selectedLine?.order || -1);
      } else if (e.key === "ArrowUp") {
        onFocusUp("", selectedLine?.order || -1);
      } else if (e.key === "ArrowDown") {
        onFocusDown("", selectedLine?.order || -1);
      } else if (e.key === "Enter") {
        onTextUpdateEnter("", selectedLine?.order || -1);
      }
    };
    if (selectedLine) {
      if (selectedLine.type !== "text") {
        document.addEventListener("keydown", onKeyDown);
      } else {
        document.removeEventListener("keydown", onKeyDown);
      }
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedLine]);

  const onAddFormat = (className: string, onClickHandler?: ClickHanderType) => {
    const updatedLines: {
      _id: string;
      value: string;
    }[] = [];
    rangeArray.current.forEach((range: any) => {
      if (!range.collapsed && range.collapsed !== undefined) {
        const startNode = range.startContainer;
        const rootParent = getParentLineItem(startNode);
        const clickHandlerId = onClickHandler?.clickHandlerId;
        formatItem(range, className, clickHandlerId);
        optimizeChildNodes(rootParent);
        const newValue = rootParent?.innerHTML || "";
        const itemId = rootParent?.id || "";
        updatedLines.push({
          _id: itemId.split("-")[1],
          value: newValue,
        });
      }
    });
    setLines((prev: LineItemProps[]) => {
      let newLines: LineItemProps[] = [...prev];
      newLines = newLines.map((line: LineItemProps) => {
        const lineItem:
          | {
              _id: string;
              value: string;
            }
          | undefined = updatedLines.find(
          (l: { _id: string; value: string }) => {
            return l._id === line._id;
          }
        );
        if (lineItem?._id) {
          return {
            ...line,
            value: lineItem.value,
          };
        }
        return line;
      });
      return [...newLines];
    });
  };

  const onSelectFormat = (toolBarItem: any, component: ComponentProps) => {
    let newOrder = toolBarItem.order || -1;
    let value = toolBarItem.value || "";
    value = value.trim();
    if (toolBarItem._id) {
      newOrder = value !== "" ? newOrder + 1 : newOrder;
    }
    const elemProps = component.elemProps || {};
    const newLine = {
      _id: uniqid(),
      value: "",
      order: newOrder,
      isEditing: false,
      type: component.type,
      ...elemProps,
    };
    setLines((prev: LineItemProps[]) => {
      let newLines: LineItemProps[] = [...prev];
      newLines.splice(newOrder, 0, newLine);
      newLines = newLines.map((line: LineItemProps, index: number) => {
        return {
          ...line,
          isEditing: false,
          order: index,
        };
      });
      return [...newLines];
    });
    setInsertComponentToolBar(null);
    setToolBarItem({});
  };

  const onRemoveLine = (order: number) => {
    setLines((prev: LineItemProps[]) => {
      let newLines: LineItemProps[] = [...prev];
      newLines.splice(order, 1);
      newLines = newLines.map((line: LineItemProps, index: number) => {
        if (index === order) {
          return {
            ...line,
            isEditing: true,
            order: index,
          };
        } else if (order >= newLines.length) {
          if (index === newLines.length - 1) {
            return {
              ...line,
              isEditing: true,
              order: index,
            };
          }
        }
        return {
          ...line,
          order: index,
        };
      });
      return [...newLines];
    });
  };
  const onToggleEdit = (order: number, val?: boolean) => {
    setLines((prev: LineItemProps[]) => {
      let newLines: LineItemProps[] = [...prev];
      newLines[order].isEditing = val !== undefined ? val : true;
      return [...newLines];
    });
  };

  const onFocusDown = (val: string, order: number) => {
    setLines((prev: LineItemProps[]) => {
      if (order !== lines.length - 1) {
        let newLines: LineItemProps[] = [...prev];
        if (val !== newLines[order].value) {
          newLines[order].value = val;
        }
        newLines[order].isEditing = false;
        newLines[order + 1].isEditing = true;
        return [...newLines];
      }
      return prev;
    });
  };

  const onFocusUp = (val: string, order: number) => {
    setLines((prev: LineItemProps[]) => {
      if (order !== 0) {
        let newLines: LineItemProps[] = [...prev];
        if (val !== newLines[order].value) {
          newLines[order].value = val;
        }
        newLines[order].isEditing = false;
        newLines[order - 1].isEditing = true;
        return [...newLines];
      }
      return prev;
    });
  };
  const onTextUpdate = (val: string, order?: number) => {
    setLines((prev: LineItemProps[]) => {
      if (order || order === 0) {
        let newLines: LineItemProps[] = [...prev];
        if (val !== newLines[order].value) {
          newLines[order].value = val;
        }
        newLines[order].isEditing = false;
        return [...newLines];
      }
      return prev;
    });
  };

  const onTextUpdateEnter = (val: string, order?: number) => {
    setLines((prev: LineItemProps[]) => {
      if (order || order === 0) {
        let newLines: LineItemProps[] = [...prev];
        newLines[order].value = val;
        newLines[order].isEditing = false;
        newLines.splice(order + 1, 0, {
          _id: uniqid(),
          value: "",
          type: "text",
          order: order + 1,
          isEditing: true,
        });
        newLines = newLines.map((line: LineItemProps, index: number) => {
          return {
            ...line,
            order: index,
          };
        });
        return [...newLines];
      }
      return prev;
    });
  };
  return (
    <div className="editor-container">
      <ComponentPopover
        isOpen={!!insertComponentToolBar}
        anchorEl={insertComponentToolBar}
        onClose={() => {
          setInsertComponentToolBar(null);
          setToolBarItem({});
        }}
        components={components}
        onSelectFormat={onSelectFormat}
        toolBarItem={toolBarItem}
      />
      <TextFormatToolBar
        open={showTooltip}
        anchorPosition={{
          top: tooltipPosition.y,
          left: tooltipPosition.x,
        }}
        textFormats={textFormats}
        onAddFormat={onAddFormat}
        onClose={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          setShowTooltip(false);
          setTooltipPosition({
            x: 0,
            y: 0,
          });
          rangeArray.current = [];
          const selection = window.getSelection();
          selection?.removeAllRanges();
        }}
      />
      <div className="editor-item-container">
        {lines.map((line: any) => {
          return (
            <LineItem
              key={line._id}
              line={line}
              textFormats={textFormats}
              components={components}
              isMouseClicked={isMouseClicked}
              onOpenComponentToolbar={(e: any) => {
                setInsertComponentToolBar(e.currentTarget);
                setToolBarItem(line);
              }}
              onTextUpdateEnter={onTextUpdateEnter}
              onTextUpdate={onTextUpdate}
              onFocusUp={onFocusUp}
              onFocusDown={onFocusDown}
              onRemoveLine={onRemoveLine}
              onToggleEdit={onToggleEdit}
            />
          );
        })}
        {lines.length === 0 && (
          <div className="editor-item">
            <ContentEditable
              _id=""
              value=""
              order={0}
              isEditing={true}
              onTextUpdateEnter={(val: string) => {
                setLines((prev: LineItemProps[]) => {
                  let newLines: LineItemProps[] = [...prev];
                  newLines.push({
                    _id: uniqid(),
                    value: val,
                    type: "text",
                    order: 0,
                    isEditing: false,
                  });
                  newLines.push({
                    _id: uniqid(),
                    type: "text",
                    value: "",
                    order: 1,
                    isEditing: true,
                  });
                  return [...newLines];
                });
              }}
              onTextUpdate={(val: string) => {
                if (val.length > 0) {
                  setLines((prev: LineItemProps[]) => {
                    let newLines: LineItemProps[] = [...prev];
                    newLines.push({
                      _id: uniqid(),
                      type: "text",
                      value: val,
                      order: 0,
                      isEditing: false,
                    });
                    newLines.push({
                      _id: uniqid(),
                      type: "text",
                      value: "",
                      order: 1,
                      isEditing: true,
                    });
                    return [...newLines];
                  });
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
