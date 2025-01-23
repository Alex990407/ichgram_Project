import { useState, useEffect } from "react";
import axios from "axios";

const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authToken = localStorage.getItem("authToken"); // Получаем токен из localStorage

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3003/api/comments/${postId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Передаем токен в заголовках
        },
      });
      setComments(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (commentText) => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/comments",
        { postId, commentText },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Передаем токен в заголовках
          },
        }
      );
      setComments([response.data, ...comments]);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3003/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Передаем токен в заголовках
        },
      });
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    comments,
    loading,
    error,
    fetchComments,
    addComment,
    deleteComment,
  };
};

export default useComments;
