import React, { useState } from "react";
import { ReactComponent as CommentsIcon } from "../../assets/Coments.svg";
import { ReactComponent as LikeIcon } from "../../assets/Like-icon.svg";

const PostActions = ({ initialLikes, commentsCount }) => {
  const [likes, setLikes] = useState(initialLikes || 0);

  const handleLike = (e) => {
    e.stopPropagation();
    setLikes((prevLikes) => prevLikes + 1);
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleLike}
      >
        <LikeIcon style={{ marginRight: "5px" }} />
        <span style={{ fontSize: "14px", color: "#555" }}>{likes}</span>
      </div>

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
