import React from "react";
import { Avatar, CircularProgress } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import { getFullAvatarUrl } from "../utils/urlHelpers";

const AvatarComponent = ({ size = 40, avatarUrl: propAvatarUrl }) => {
  const { avatarUrl: contextAvatarUrl, loading } = useUserContext();

  // Используем пропс avatarUrl, если он передан, иначе берем из контекста
  const avatarUrl = propAvatarUrl
    ? getFullAvatarUrl(propAvatarUrl)
    : contextAvatarUrl;

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
