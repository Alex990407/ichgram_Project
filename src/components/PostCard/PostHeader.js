import React from "react";
import AvatarComponent from "../AvatarComponent";

const PostHeader = ({ userAvatar, username }) => (
  <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
    <AvatarComponent size={35} avatarUrl={userAvatar} />
    <span
      style={{
        fontWeight: "bold",
        color: "#333",
        fontSize: "14px",
        marginLeft: "10px",
      }}
    >
      {username || "Unknown User"}
    </span>
  </div>
);

export default PostHeader;
