import React from "react";
import { Grid, Typography } from "@mui/material";
import PostCard from "./PostCard";

const PostGrid = ({ posts }) => {
  if (!posts.length) {
    return (
      <Typography align="center" variant="h6" color="text.secondary">
        No posts available.
      </Typography>
    );
  }
  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post._id}>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostGrid;
