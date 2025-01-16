import React from "react";
import { Avatar, CircularProgress } from "@mui/material";
import { useAvatar } from "../context/AvatarContext";

const AvatarComponent = ({ size = 40 }) => {
  const { avatarUrl, loading } = useAvatar();

  if (loading) {
    return <CircularProgress size={size} />;
  }

  return (
    <Avatar
      src={avatarUrl || "https://via.placeholder.com/150"}
      alt="User Avatar"
      sx={{
        width: size,
        height: size,
      }}
    />
  );
};

export default AvatarComponent;
