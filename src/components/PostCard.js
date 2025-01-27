import React, { useState } from "react";
import PostHeader from "./PostCard/PostHeader";
import PostImage from "./PostCard/PostImage";
import PostActions from "./PostCard/PostActions";
import PostDescription from "./PostCard/PostDescription";
import { useUserContext } from "../context/UserContext";
import usePosts from "../hooks/usePosts";

const PostCard = ({ post, onClick }) => {
  const { profile } = useUserContext();
  const { likePost } = usePosts();

  const [isLiked, setIsLiked] = useState(
    Array.isArray(post.likes) && post.likes.includes(profile?.userId._id)
  );
  const [likesCount, setLikesCount] = useState(
    Array.isArray(post.likes) ? post.likes.length : 0
  );

  const handleLike = async () => {
    try {
      console.log(post);
      const updatedPost = await likePost(post._id);
      if (updatedPost) {
        setIsLiked(updatedPost.likes.includes(profile?.userId._id));
        setLikesCount(updatedPost.likes.length);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
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
      onClick={onClick}
    >
      <PostHeader userAvatar={post.userAvatar} username={post.username} />
      <PostImage imageUrl={post.imageUrl} />
      <PostActions
        initialLikes={post.likes}
        commentsCount={post.comments?.length || 0}
        onLike={handleLike}
        isLikedProp={isLiked}
      />
      <PostDescription username={post.username} title={post.title} />
    </div>
  );
};

export default PostCard;
