import { useState, useEffect } from "react";
import axios from "axios";

const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/comments/${postId}`);
      setComments(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (commentText) => {
    try {
      const response = await axios.post("/api/comments", {
        postId,
        commentText,
      });
      setComments([response.data, ...comments]);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`);
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
