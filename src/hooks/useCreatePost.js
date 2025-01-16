// hooks/useCreatePost.js
import { useState } from "react";
import axios from "axios";

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createPost = async (image, caption) => {
    if (!image) {
      setError("Please upload an image");
      return false;
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
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      // Возвращаем данные, если пост успешно создан
      return response.data;
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to create post");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createPost, loading, error };
};

export default useCreatePost;