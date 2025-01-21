import React from "react";
import { Grid } from "@mui/material";
import PostCard from "./PostCard";

const PostsGrid = ({ posts, onPostClick }) => (
  <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
    {posts?.map((post) => (
      <Grid item xs={12} sm={6} md={4} key={post.id || post._id}>
        {/* Передаём объект поста в onClick через onPostClick */}
        <PostCard post={post} onClick={() => onPostClick(post)} />
      </Grid>
    ))}
  </Grid>
);

export default PostsGrid;
