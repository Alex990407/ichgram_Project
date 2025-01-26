import React, { useState } from "react";
import { ReactComponent as LikeIcon } from "../../assets/Like-icon.svg";
import { ReactComponent as CommentsIcon } from "../../assets/Coments.svg";

const PostActions = ({ initialLikes = [], commentsCount = 0, onLike }) => {
  const userId = localStorage.getItem("userId");

  console.log(initialLikes);

  // Проверка, что `initialLikes` — массив
  const likesArray = Array.isArray(initialLikes) ? initialLikes : [];
  // const [likes, setLikes] = useState(likesArray.length);
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(likesArray.includes(userId));
  const [loading, setLoading] = useState(false);

  const handleLike = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const updatedPost = await onLike();
      if (updatedPost) {
        setLikes(updatedPost.likes.length);
        setIsLiked(updatedPost.likes.includes(userId));
      }
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setLoading(false);
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleLike}
      >
        <LikeIcon
          style={{
            marginRight: "5px",
            fill: isLiked ? "red" : "gray",
          }}
        />
        <span style={{ fontSize: "14px", color: "#555" }}>{likes}</span>
      </div>

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
