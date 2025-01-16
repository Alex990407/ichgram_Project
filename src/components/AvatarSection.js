import React from "react";
import { Box, Button, Typography } from "@mui/material";
import AvatarComponent from "./AvatarComponent";
import { useAvatar } from "../context/AvatarContext";

const AvatarSection = () => {
  const { uploadAvatar } = useAvatar();

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await uploadAvatar(file); // Загрузка нового аватара
    }
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
      <Box display="flex" alignItems="center" gap={2}>
        <AvatarComponent size={80} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Username
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line" }}
          >
            User about section...
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
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={handleAvatarChange}
        />
      </Button>
    </Box>
  );
};

export default AvatarSection;
