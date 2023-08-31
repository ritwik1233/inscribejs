import React, { useRef, useEffect } from "react";
import { ClickAwayListenerProps } from "../types";

const CustomClickAwayListener: React.FC<ClickAwayListenerProps> = ({
  onClickAway,
  children,
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

  return <div ref={containerRef}>{children}</div>;
};

export default CustomClickAwayListener;
