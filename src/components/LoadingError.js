import React from "react";
import { Typography } from "@mui/material";

const LoadingError = ({ loading, error }) => {
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return null;
};

export default LoadingError;
