import React from "react";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();

  // Здесь вы можете получить данные поста с сервера на основе id
  // Например, используя useEffect и API-запрос:
  // useEffect(() => { fetchPostDetails(id); }, [id]);

  const mockPost = {
    id,
    imageUrl: "https://via.placeholder.com/300",
    likes: 120,
    description: "A detailed view of the post 🌅",
    comments: [
      { id: 1, username: "user1", text: "Amazing post!" },
      { id: 2, username: "user2", text: "Beautiful view!" },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <img
        src={mockPost.imageUrl}
        alt="Post"
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
      />
      <h2>{mockPost.description}</h2>
      <p>{mockPost.likes} likes</p>
      <h3>Comments</h3>
      <ul>
        {mockPost.comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.username}:</strong> {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetails;
