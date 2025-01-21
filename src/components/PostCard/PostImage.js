import React from "react";

const PostImage = ({ imageUrl }) => (
  <div
    style={{
      width: "100%",
      height: "300px", // Увеличиваем высоту изображения
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      src={`http://localhost:3003${imageUrl}`}
      alt="Post"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "cover", // Подгоняем изображение
      }}
    />
  </div>
);

export default PostImage;