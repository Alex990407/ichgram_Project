import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CommentsIcon } from "../assets/Coments.svg";
import { ReactComponent as LikeIcon } from "../assets/Like-icon.svg";
import AvatarComponent from "./AvatarComponent";
import { getFullAvatarUrl } from "../utils/urlHelpers";

const PostCard = ({ post, onClick, onNavigate }) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post.likes || 0);

  // Обработчик лайков
  const handleLike = (e) => {
    e.stopPropagation(); // Остановить всплытие, чтобы не срабатывал onClick карточки
    setLikes((prevLikes) => prevLikes + 1);
  };

  // Обработчик комментариев
  const handleCommentClick = (e) => {
    e.stopPropagation(); // Остановить всплытие
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        width: "100%",
        maxWidth: "100%",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease-in-out",
        backgroundColor: "#fff",
      }}
      onClick={() => {
        console.log("Card clicked with post ID:", post._id); // Логируем ID поста
        onClick(post._id); // Передаем ID поста
      }}
    >
      {/* Заголовок карточки */}
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <AvatarComponent size={35} />
        <span style={{ fontWeight: "bold", color: "#333", fontSize: "14px" }}>
          {post.username || "Unknown User"}
        </span>
      </div>

      {/* Изображение поста */}
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={getFullAvatarUrl(post.imageUrl)}
          alt="Post"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Кнопки лайков и комментариев */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 16px",
          gap: "16px",
        }}
      >
        {/* Кнопка лайков */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleLike}
        >
          <LikeIcon style={{ marginRight: "5px" }} />
        </div>

        {/* Кнопка комментариев */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleCommentClick}
        >
          <CommentsIcon style={{ marginRight: "5px" }} />
        </div>
      </div>

      {/* Счётчик лайков */}
      <div style={{ padding: "0 16px", marginBottom: "5px" }}>
        <span style={{ fontSize: "14px", fontWeight: "bold" }}>
          {likes} likes
        </span>
      </div>

      {/* Описание поста */}
      <div style={{ padding: "0 16px 10px 16px" }}>
        <span style={{ fontWeight: "bold", fontSize: "14px" }}>
          {post.username || "Unknown User"}
        </span>
        <p style={{ fontSize: "14px", color: "#555", marginTop: "5px" }}>
          {post.title || "No description provided"}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
