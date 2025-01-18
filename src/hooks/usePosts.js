import { useState, useCallback } from "react";
import axios from "axios";

const usePosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPost = useCallback(async (formData) => {
    try {
      setLoading(true);
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
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
      setLoading(false);
    }
  }, []);

  const fetchAllPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3003/api/posts");
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch posts");
      setLoading(false);
    }
  }, []);

  const fetchPostById = useCallback(async (postId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3003/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch post");
      setLoading(false);
    }
  }, []);

  const fetchUserPosts = useCallback(async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3003/api/posts/user/${userId}`, // Исправляем URL
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user posts");
      setLoading(false);
    }
  }, []);

  return {
    createPost,
    fetchAllPosts,
    fetchPostById,
    fetchUserPosts,
    loading,
    error,
  };
};

export default usePosts;
