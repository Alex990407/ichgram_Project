import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ReactComponent as ClosePageIcon } from "../../assets/Close-page.svg";

const SearchHeader = ({ onClose, isSmallScreen }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isSmallScreen ? "12px" : "16px",
      backgroundColor: "#fff",
    }}
  >
    <Typography
      variant={isSmallScreen ? "h6" : "h5"}
      fontWeight="bold"
      sx={{ textAlign: "start" }}
    >
      Search
    </Typography>
    <IconButton
      onClick={onClose}
      sx={{
        padding: isSmallScreen ? "4px" : "8px",
        width: "24px",
        height: "24px",
      }}
    >
      <ClosePageIcon width="24px" height="24px" />
    </IconButton>
  </Box>
);

export default SearchHeader;
