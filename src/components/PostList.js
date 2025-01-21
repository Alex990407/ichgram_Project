import React, { useState, useEffect } from "react";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import PostCard from "./PostCard";
import usePosts from "../hooks/usePosts";

const PostList = ({
  fetchPosts,
  params,
  emptyMessage = "No posts available",
}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedPosts = await fetchPosts(params);
        setPosts(fetchedPosts || []);
      } catch (err) {
        setError(err.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [fetchPosts, params]);

  if (loading) {
    return <CircularProgress style={{ margin: "auto", display: "block" }} />;
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (posts.length === 0) {
    return (
      <Typography align="center" variant="h6" color="text.secondary">
        {emptyMessage}
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post._id} sx={{ flexGrow: 1 }}>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
