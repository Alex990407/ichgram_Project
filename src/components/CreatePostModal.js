import React, { useState } from "react";
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
import axios from "axios";

const CreatePostModal = ({ open, onClose }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Обработчик выбора файла
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Отправка данных на сервер
  const handleSubmit = async () => {
    if (!image) {
      setError("Please upload an image");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", caption);

    try {
      const response = await axios.post(
        "http://localhost:3003/api/posts/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Токен авторизации
          },
        }
      );

      // Если пост успешно создан
      console.log("Post created:", response.data);
      alert("Post created successfully!");
      setCaption("");
      setImage(null);
      onClose(); // Закрываем модалку
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

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
          <label htmlFor="upload-image">
            <CloudUploadIcon
              sx={{ fontSize: 64, color: "gray", cursor: "pointer" }}
            />
          </label>
          <input
            type="file"
            id="upload-image"
            style={{ display: "none" }}
            onChange={handleImageChange}
            accept="image/*" // Ограничение выбора файлов
          />
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
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            fullWidth
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              marginTop: "16px",
              backgroundColor: "rgba(0, 149, 246, 1)",
              "&:hover": { backgroundColor: "rgba(0, 120, 200, 1)" },
            }}
          >
            {loading ? "Uploading..." : "Share"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CreatePostModal;
