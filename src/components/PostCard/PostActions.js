import React, { useState } from "react";
import { ReactComponent as CommentsIcon } from "../../assets/Coments.svg";
import LikeButton from "../LikeButton";

const PostActions = ({ initialLikes = [], commentsCount = 0, onLike, isLikedProp }) => {
  const userId = localStorage.getItem("userId");

  const likesArray = Array.isArray(initialLikes) ? initialLikes : [];
  const [likes, setLikes] = useState(likesArray.length);
  const [isLiked, setIsLiked] = useState(isLikedProp);

  const handleLike = async () => {
    try {
      const updatedPost = await onLike();
      if (updatedPost) {
        setLikes(updatedPost.likes.length);
        // setIsLiked(updatedPost.likes.includes(userId));
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 16px",
        gap: "16px",
      }}
    >
      {/* Like Button */}
      <LikeButton isLiked={isLikedProp} onLike={handleLike} likesCount={likes} />

      {/* Comments */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleCommentClick}
      >
        <CommentsIcon style={{ marginRight: "5px" }} />
        <span style={{ fontSize: "14px", color: "#555" }}>
          {commentsCount || 0}
        </span>
      </div>
    </div>
  );
};

export default PostActions;
