import React, { useRef, useEffect } from "react";
import { ComponentProps, ComponentPopoverProps } from "../types";

const ComponentPopover: React.FC<ComponentPopoverProps> = ({
  isOpen,
  anchorEl,
  onClose,
  components,
  onSelectFormat,
  toolBarItem,
}) => {
  const popoverRef: any = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  // Calculate the position for the popover based on the anchor element.
  const top = anchorEl ? anchorEl.offsetTop + anchorEl.offsetHeight / 2 : 0;
  const left = anchorEl ? anchorEl.offsetLeft : 0;

  return (
    <div
      className="component-popover"
      ref={popoverRef}
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <ul className="component-list">
        {components.map((component: ComponentProps, index: number) => (
          <li
            key={index}
            className="list-item"
            onClick={() => onSelectFormat(toolBarItem, component)}
          >
            {component.icon && (
              <span className="list-icon">{component.icon}</span>
            )}
            <span className="list-text">{component.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComponentPopover;
