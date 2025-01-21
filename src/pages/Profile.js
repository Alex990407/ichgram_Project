import React from "react";
import { useParams } from "react-router-dom";
import ProfilePage from "../components/ProfilePage";
import useUserProfile from "../hooks/useUserProfile";
import usePosts from "../hooks/usePosts";

const Profile = (props) => {
  const { userId } = useParams();
  const { fetchProfileById } = useUserProfile();
  const { fetchUserPosts } = usePosts();

  return (
    <ProfilePage
      fetchProfileData={fetchProfileById}
      fetchUserPosts={fetchUserPosts}
      userId={userId}
      isCurrentUser={false}
      {...props}
    />
  );
};

export default Profile;
