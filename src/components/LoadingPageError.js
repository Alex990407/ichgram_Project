import React from "react";
import { Typography, CircularProgress } from "@mui/material";

const LoadingError = ({ loading, error }) => {
  if (loading) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        <CircularProgress />
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 5 }}>
        {error}
      </Typography>
    );
  }

  return null;
};

export default LoadingError;
