import React from "react";
import {
  Dialog,
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ReactComponent as ClosePageIcon } from "../assets/Close-page.svg";

const CreatePostModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Заголовок с кнопкой закрытия */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderBottom: "1px solid #ddd",
          padding: "16px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
          }}
        >
          Create new post
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "50%",
            right: "16px",
            transform: "translateY(-50%)", // Центрирование кнопки по вертикали
            padding: 0,
            width: "24px",
            height: "24px",
          }}
        >
          <ClosePageIcon width="24px" height="24px" />
        </IconButton>
      </Box>

      {/* Основное содержимое */}
      <Box display="flex" flexDirection="row" sx={{ height: "400px" }}>
        {/* Левая часть для загрузки изображения */}
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            borderRight: "1px solid #ddd",
            backgroundColor: "#fafafa",
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 64, color: "gray" }} />
        </Box>

        {/* Правая часть для описания */}
        <Box flex={1} p={2} display="flex" flexDirection="column">
          <Typography variant="subtitle1" fontWeight="bold" mb={2}>
            Add a caption
          </Typography>
          <TextField
            multiline
            rows={6}
            placeholder="Write a caption..."
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            sx={{
              marginTop: "16px",
              backgroundColor: "rgba(0, 149, 246, 1)",
              "&:hover": { backgroundColor: "rgba(0, 120, 200, 1)" },
            }}
          >
            Share
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CreatePostModal;
