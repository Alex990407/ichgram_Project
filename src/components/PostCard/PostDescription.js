import React from "react";

const PostDescription = ({ username, title }) => (
  <div style={{ padding: "0 16px 10px 16px" }}>
    <span style={{ fontWeight: "bold", fontSize: "14px" }}>
      {username || "Unknown User"}
    </span>
    <p style={{ fontSize: "14px", color: "#555", marginTop: "5px" }}>
      {title || "No description provided"}
    </p>
  </div>
);

export default PostDescription;
