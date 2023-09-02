import {
    Grid,
    IconButton,
    Popover,
    TextField,
    Tooltip,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { getParentLineItem } from "../src/editor/helpers";
  import OpenInNewIcon from "@mui/icons-material/OpenInNew";
  interface AnchorLinkProps {
    anchorEl: any;
    setAnchorEl: any;
    onModifyItem: (line: { _id: string; value: string }) => void;
  }
  
  const AnchorLink: React.FC<AnchorLinkProps> = (props) => {
    const { anchorEl, setAnchorEl, onModifyItem } = props;
    const [value, setValue]: any = useState("");
    React.useEffect(() => {
      if (anchorEl) {
        const url = anchorEl.getAttribute("data-url");
        setValue(url || "");
      }
    }, [anchorEl]);
    return (
      <>
        <Popover
          open={!!anchorEl}
          anchorEl={anchorEl}
          disableRestoreFocus
          sx={{
            minWidth: "100px",
            minHeight: "100px",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            setAnchorEl(null);
            setValue("");
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{
              margin: "3px",
            }}
          >
            <Grid item xs={12}>
              <Typography variant="caption">Add Link</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                value={value}
                onChange={(e: any) => {
                  setValue(e.target.value);
                }}
                onBlur={() => {
                  if (value.length > 0) {
                    const parentItem = getParentLineItem(anchorEl);
                    anchorEl?.setAttribute("data-url", value);
                    const parentId = parentItem?.id;
                    const elemId = parentId?.split("-")[1];
                    const newValue = parentItem.innerHTML;
                    const item = {
                      _id: elemId,
                      value: newValue,
                    };
                    onModifyItem(item);
                  }
                }}
              />
            </Grid>
            <Grid item xs={3}>
              {value.length > 0 && <Tooltip title="Open link in new tab">
                <IconButton
                  size="small"
                  onClick={() => {
                    const url = anchorEl.getAttribute("data-url");
                    if (url) {
                      window.open(url, "_blank");
                    }
                  }}
                >
                  <OpenInNewIcon />
                </IconButton>
              </Tooltip>}
            </Grid>
            <Grid item xs={12} />
          </Grid>
        </Popover>
      </>
    );
  };
  
  export default AnchorLink;