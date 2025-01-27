import React from "react";
import { Box, TextField } from "@mui/material";

const SearchInput = ({ searchQuery, setSearchQuery, isSmallScreen }) => (
  <Box sx={{ padding: "16px" }}>
    <TextField
      fullWidth
      placeholder="Search"
      variant="outlined"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      InputProps={{
        sx: {
          borderRadius: "8px",
          backgroundColor: "#f3f4f6",
        },
      }}
    />
  </Box>
);

export default SearchInput;
