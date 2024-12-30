import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import AuthorizedProfile from "./pages/AuthorizedProfile";
import EditProfile from "./pages/EditProfile";
import CreatePostModal from "./components/CreatePostModal";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import NotificationsPanel from "./components/NotificationsPanel";
import SearchPanel from "./components/SearchPanel";
import { Backdrop } from "@mui/material";

const App = () => {
  // Поднятое состояние для модального окна
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Ширина Sidebar
  const sidebarWidth = { xs: 60, sm: 80, md: 200, lg: 245 };

  // Функции для управления модалкой
  const onOpenCreatePost = () => setIsCreatePostOpen(true);
  const onCloseCreatePost = () => setIsCreatePostOpen(false);

  const onOpenNotifications = () => setIsNotificationsOpen(true);
  const onCloseNotifications = () => setIsNotificationsOpen(false);

  const onOpenSearch = () => setIsSearchOpen(true);
  const onCloseSearch = () => setIsSearchOpen(false);

  return (
    <Router>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <div style={{ flex: 1, display: "flex" }}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/"
              element={
                <Home
                  onOpenCreatePost={onOpenCreatePost}
                  onOpenNotifications={onOpenNotifications}
                  onOpenSearch={onOpenSearch}
                />
              } // Главная страница
            />
            <Route
              path="/messages"
              element={
                <Messages
                  onOpenCreatePost={onOpenCreatePost}
                  onOpenNotifications={onOpenNotifications}
                  onOpenSearch={onOpenSearch}
                />
              }
            />

            <Route
              path="/explore"
              element={
                <Explore
                  onOpenCreatePost={onOpenCreatePost}
                  onOpenNotifications={onOpenNotifications}
                  onOpenSearch={onOpenSearch}
                />
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <Profile
                  onOpenCreatePost={onOpenCreatePost}
                  onOpenNotifications={onOpenNotifications}
                  onOpenSearch={onOpenSearch}
                />
              }
            />
            <Route
              path="/myProfile"
              element={
                <AuthorizedProfile
                  onOpenCreatePost={onOpenCreatePost}
                  onOpenNotifications={onOpenNotifications}
                  onOpenSearch={onOpenSearch}
                />
              }
            />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Backdrop
          open={isNotificationsOpen}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer - 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />

        {/* Панель уведомлений */}
        <NotificationsPanel
          open={isNotificationsOpen}
          onClose={onCloseNotifications}
          sidebarWidth={sidebarWidth.lg} // Передаём ширину Sidebar
        />

        <SearchPanel
          open={isSearchOpen}
          onClose={onCloseSearch}
          sidebarWidth={sidebarWidth.lg}
        />

        {/*  модальное окно для создания поста */}
        <CreatePostModal open={isCreatePostOpen} onClose={onCloseCreatePost} />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
