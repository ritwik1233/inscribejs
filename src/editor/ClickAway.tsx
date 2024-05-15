import React, { useRef, useEffect } from "react";
import { ClickAwayListenerProps } from "../types";

const CustomClickAwayListener: React.FC<ClickAwayListenerProps> = ({
  onClickAway,
  children,
  id,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleDocumentClick = (event: Event) => {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        onClickAway(event);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [onClickAway]);

  return <div id={id} ref={containerRef}>{children}</div>;
};

export default CustomClickAwayListener;
