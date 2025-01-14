import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";

const AvatarSection = ({
  avatarPreview,
  avatarUrl,
  username,
  about,
  onAvatarChange,
}) => {
  const getFullAvatarUrl = (url) => {
    if (!url) return ""; // Если url отсутствует, возвращаем пустую строку
    return url.startsWith("/uploads/") ? `http://localhost:3003${url}` : url;
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={4}
      p={2}
      sx={{
        backgroundColor: "rgba(239, 239, 239, 1)",
        borderRadius: "12px",
      }}
    >
      {console.log("Avatar review", avatarPreview)}
      {console.log("avatarUrl", avatarUrl)}
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          src={
            getFullAvatarUrl(avatarPreview) ||
            getFullAvatarUrl(avatarUrl) ||
            "https://via.placeholder.com/150"
          }
          alt="Profile"
          sx={{
            width: 80,
            height: 80,
          }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {username}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line" }}
          >
            {about?.split("\n")[0]}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        component="label"
        sx={{
          textTransform: "none",
          fontSize: "14px",
          fontWeight: "500",
          width: "115px",
          height: "32px",
          padding: "6px 0",
          borderRadius: "8px",
          backgroundColor: "rgba(0, 149, 246, 1)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(0, 120, 200, 1)",
          },
        }}
      >
        New photo
        <input hidden accept="image/*" type="file" onChange={onAvatarChange} />
      </Button>
    </Box>
  );
};

export default AvatarSection;
