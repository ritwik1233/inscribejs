import React from "react";
import { Box, Divider } from "@mui/material";

interface DividerComponentProps {
  isEditing: boolean;
  _id: string;
}
const DividerComponent: React.FC<DividerComponentProps> = (props) => {
  const { _id, isEditing } = props;
  return (
    <Box
      id={`divider-container-${_id}`}
      sx={{
        width: "85vw",
        height: "10px",
        cursor: "pointer",
        backgroundColor: isEditing ? "rgba(35,131,226,.28)" : "transparent",
      }}
    >
      <Divider variant="fullWidth" />
    </Box>
  );
};

export default DividerComponent;
