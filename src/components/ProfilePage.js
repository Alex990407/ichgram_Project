import React, { useEffect, useState } from "react";
import { Container, CircularProgress, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import PostGrid from "../components/PostGrid";
import LoadingPageError from "../components/LoadingPageError";

const ProfilePage = ({
  fetchProfileData,
  fetchUserPosts,
  userId,
  onOpenCreatePost,
  onOpenNotifications,
  onOpenSearch,
  isCurrentUser,
}) => {
  const [profile, setProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      console.error("No userId provided, skipping fetch.");
      return;
    }

    // Загрузка данных профиля
    const loadProfile = async () => {
      try {
        setLoadingProfile(true);
        const data = await fetchProfileData(userId);
        setProfile(data);
      } catch (err) {
        setError(err.message || "Failed to fetch profile.");
      } finally {
        setLoadingProfile(false);
      }
    };

    // Загрузка постов пользователя
    const loadPosts = async () => {
      try {
        setLoadingPosts(true);
        const posts = await fetchUserPosts(userId);
        setUserPosts(posts || []);
      } catch (err) {
        setError(err.message || "Failed to fetch posts.");
      } finally {
        setLoadingPosts(false);
      }
    };

    loadProfile();
    loadPosts();
  }, [fetchProfileData, fetchUserPosts, userId]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        onOpenCreatePost={onOpenCreatePost}
        onOpenNotifications={onOpenNotifications}
        onOpenSearch={onOpenSearch}
      />
      <Container sx={{ flex: 1, marginTop: 4 }}>
        {/* Состояния загрузки и ошибки */}
        <LoadingPageError
          loading={loadingProfile || loadingPosts}
          error={error}
        />

        {/* Контент профиля */}
        {profile && (
          <>
            <ProfileHeader
              profile={profile}
              isCurrentUser={isCurrentUser}
              postCount={userPosts.length}
            />
            <PostGrid posts={userPosts} />
          </>
        )}
      </Container>
    </div>
  );
};

export default ProfilePage;
