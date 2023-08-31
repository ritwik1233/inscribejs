import React, { CSSProperties } from "react";
import { PopoverProps } from "../types";

const PositionPopover: React.FC<PopoverProps> = ({
  open,
  anchorPosition,
  onClose,
  children,
}) => {
  if (!open) return null;

  const style: CSSProperties = {
    top: anchorPosition?.top || 0,
    left: anchorPosition?.left || 0,
  };

  return (
    <div className="popover-overlay" onClick={onClose}>
      <div className="popover-content" style={style}>
        {children}
      </div>
    </div>
  );
};

export default PositionPopover;
