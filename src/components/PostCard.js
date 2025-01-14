import React from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/post/${post.id}`); // Переход на страницу поста
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        margin: "10px",
        width: "300px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease-in-out",
      }}
      onClick={handlePostClick}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={post.imageUrl}
        alt="Post"
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
          {post.likes} likes
        </p>
        <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
          {post.description?.substring(0, 50) || "No description"}...
        </p>
      </div>
    </div>
  );
};

export default PostCard;
