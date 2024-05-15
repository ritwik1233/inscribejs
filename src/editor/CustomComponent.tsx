import React, { useMemo } from "react";
import { CustomComponentProps, ElemHandlerType } from "../types";
import CustomClickAwayListener from "./ClickAway";

const CustomComponent: React.FC<CustomComponentProps> = (props) => {
  const { component, line, onToggleEdit } = props;
  const elem = useMemo(() => {
    if (component) {
      const handlers = component.elemHandlers.reduce(
        (acc: any, curr: ElemHandlerType) => {
          const { triggerModifyLine, funcPropName, funCall } = curr;
          if (triggerModifyLine) {
            acc[funcPropName] = (...args: any) => {
              const result = funCall(...args);
              const newLine = {
                ...line,
              };
              result.forEach((item: { key: string; value: string }) => {
                const { key, value } = item;
                newLine[key] = value;
              });

              component.onModifyItem(newLine);
            };
          } else {
            acc[funcPropName] = funCall;
          }
          return acc;
        },
        {}
      );
      const reactComp = React.createElement(component.component, {
        ...component.elemProps,
        ...line,
        ...handlers,
      });
      return reactComp;
    }
    return null;
  }, [line, component]);
  const containerStyle = {
    width: "inherit",
    opacity: line.isEditing ? 0.5 : 1,
    backgroundColor: line.isEditing ? "rgba(35,131,226,.28)" : "transparent",
  };
  return (
    <CustomClickAwayListener
      id={`clickaway-${line._id}`}
      onClickAway={() => {
        onToggleEdit(line.order, false);
      }}
    >
      <div
        style={containerStyle}
        id={`custom-component-${line._id}`}
        onClick={(e) => {
          onToggleEdit(line.order);
        }}
      >
        {elem}
      </div>
    </CustomClickAwayListener>
  );
};
export default CustomComponent;
