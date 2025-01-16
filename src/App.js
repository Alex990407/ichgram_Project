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
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import { AvatarProvider } from "./context/AvatarContext";

const App = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const sidebarWidth = { xs: 60, sm: 80, md: 200, lg: 245 };

  const onOpenCreatePost = () => setIsCreatePostOpen(true);
  const onCloseCreatePost = () => setIsCreatePostOpen(false);

  const onOpenNotifications = () => setIsNotificationsOpen(true);
  const onCloseNotifications = () => setIsNotificationsOpen(false);

  const onOpenSearch = () => setIsSearchOpen(true);
  const onCloseSearch = () => setIsSearchOpen(false);

  return (
    <AvatarProvider>
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <div style={{ flex: 1, display: "flex" }}>
            <Routes>
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home
                      onOpenCreatePost={onOpenCreatePost}
                      onOpenNotifications={onOpenNotifications}
                      onOpenSearch={onOpenSearch}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <ProtectedRoute>
                    <Messages
                      onOpenCreatePost={onOpenCreatePost}
                      onOpenNotifications={onOpenNotifications}
                      onOpenSearch={onOpenSearch}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/explore"
                element={
                  <ProtectedRoute>
                    <Explore
                      onOpenCreatePost={onOpenCreatePost}
                      onOpenNotifications={onOpenNotifications}
                      onOpenSearch={onOpenSearch}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/:userId"
                element={
                  <ProtectedRoute>
                    <Profile
                      onOpenCreatePost={onOpenCreatePost}
                      onOpenNotifications={onOpenNotifications}
                      onOpenSearch={onOpenSearch}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myProfile"
                element={
                  <ProtectedRoute>
                    <AuthorizedProfile
                      onOpenCreatePost={onOpenCreatePost}
                      onOpenNotifications={onOpenNotifications}
                      onOpenSearch={onOpenSearch}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
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

          <NotificationsPanel
            open={isNotificationsOpen}
            onClose={onCloseNotifications}
            sidebarWidth={sidebarWidth.lg}
          />

          <SearchPanel
            open={isSearchOpen}
            onClose={onCloseSearch}
            sidebarWidth={sidebarWidth.lg}
          />

          <CreatePostModal
            open={isCreatePostOpen}
            onClose={onCloseCreatePost}
          />

          <Footer />
        </div>
      </Router>
    </AvatarProvider>
  );
};

export default App;
