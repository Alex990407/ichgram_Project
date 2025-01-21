import React from "react";
import { Avatar, CircularProgress } from "@mui/material";
import { useAvatar } from "../context/AvatarContext";
import { getFullAvatarUrl } from "../utils/urlHelpers";

const AvatarComponent = ({ size = 40, avatarUrl: propAvatarUrl }) => {
  const { avatarUrl: contextAvatarUrl, loading } = useAvatar();

  // Используем пропс avatarUrl, если он передан, иначе берем из контекста
  const avatarUrl = getFullAvatarUrl(propAvatarUrl) || contextAvatarUrl;

  console.log(avatarUrl);
  if (loading && !propAvatarUrl) {
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
