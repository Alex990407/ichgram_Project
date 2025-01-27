import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const LikeButton = ({ isLiked, onLike, likesCount }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        gap: "8px",
      }}
      onClick={onLike}
    >
      {isLiked ? (
        <AiFillHeart size={24} color="red" />
      ) : (
        <AiOutlineHeart size={24} color="gray" />
      )}
      <span style={{ fontSize: "16px", color: isLiked ? "red" : "gray" }}>
        {likesCount}
      </span>
    </div>
  );
};

export default LikeButton;
