import React from "react";
import PostHeader from "./PostCard/PostHeader";
import PostImage from "./PostCard/PostImage";
import PostActions from "./PostCard/PostActions";
import PostDescription from "./PostCard/PostDescription";

const PostCard = ({ post, onClick }) => (
  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: "16px",
      overflow: "hidden",
      cursor: "pointer",
      width: "100%",
      maxWidth: "600px",
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
      transition: "transform 0.2s ease-in-out",
      backgroundColor: "#fff",
    }}
    onClick={() => onClick(post._id)}
  >
    <PostHeader userAvatar={post.userAvatar} username={post.username} />
    <PostImage imageUrl={post.imageUrl} />
    <PostActions
      initialLikes={post.likes?.length}
      commentsCount={post.comments?.length}
    />
    <PostDescription username={post.username} title={post.title} />
  </div>
);

export default PostCard;
