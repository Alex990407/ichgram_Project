import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import useUserProfile from "../hooks/useUserProfile";
import usePosts from "../hooks/usePosts";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ProfileDetails from "../components/ProfileDetails";
import PostsGrid from "../components/PostsGrid";
import PostModal from "../components/PostModal";

const AuthorizedProfile = () => {
  const { userId: routeUserId } = useParams();
  const {
    profile,
    loading: profileLoading,
    error: profileError,
    fetchProfileById,
  } = useUserProfile();
  const {
    fetchUserPosts,
    loading: postsLoading,
    error: postsError,
  } = usePosts();

  const [userPosts, setUserPosts] = useState([]);
  const [userId, setUserId] = useState(
    routeUserId || localStorage.getItem("userId")
  );
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchProfileById(userId);
    }
  }, [userId, fetchProfileById]);

  useEffect(() => {
    const loadUserPosts = async () => {
      if (userId) {
        const posts = await fetchUserPosts(userId);
        setUserPosts(posts || []);
      }
    };
    loadUserPosts();
  }, [userId, fetchUserPosts]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };

  const handleClosePostModal = () => {
    setSelectedPost(null);
    setIsPostModalOpen(false);
  };

  if (profileLoading || postsLoading) {
    return <LoadingSkeleton />;
  }

  if (profileError || postsError) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5, color: "red" }}>
        Failed to load profile: {profileError || postsError}
      </Typography>
    );
  }

  const defaultProfile = {
    username: "New User",
    avatarUrl: "https://via.placeholder.com/150",
    description: "No description available",
    postsCount: 0,
    followers: 0,
    following: 0,
  };

  const userProfile = profile || defaultProfile;

  console.log(userPosts.posts);
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Container sx={{ flex: 1, marginTop: 4 }}>
        <ProfileDetails profile={userProfile} />
        <PostsGrid posts={userPosts.posts} onPostClick={handlePostClick} />{" "}
        {/* Передаём функцию открытия модалки */}
      </Container>

      {/* Модальное окно */}
      {selectedPost && (
        <PostModal
          open={isPostModalOpen}
          onClose={handleClosePostModal}
          post={selectedPost}
        />
      )}
    </div>
  );
};

export default AuthorizedProfile;
