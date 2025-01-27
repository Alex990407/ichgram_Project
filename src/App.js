import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Box, Backdrop } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Explore from "./pages/Explore";
import Footer from "./components/Footer";
import AuthorizedProfile from "./pages/AuthorizedProfile";
import EditProfile from "./pages/EditProfile";
import CreatePostModal from "./components/CreatePostModal";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import NotificationsPanel from "./components/NotificationsPanel";
import SearchPanel from "./components/SearchPanel";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import { UserProvider } from "./context/UserContext";

const App = () => (
  <UserProvider>
    <Router>
      <AppLayout />
    </Router>
  </UserProvider>
);

const AppLayout = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();
  const sidebarWidth = 245;

  const hiddenSidebarRoutes = ["/login", "/signup", "/forgot-password"];
  const shouldHideSidebar = hiddenSidebarRoutes.includes(location.pathname);

  const onOpenCreatePost = () => setIsCreatePostOpen(true);
  const onCloseCreatePost = () => setIsCreatePostOpen(false);
  const onOpenNotifications = () => setIsNotificationsOpen(true);
  const onCloseNotifications = () => setIsNotificationsOpen(false);
  const onOpenSearch = () => setIsSearchOpen(true);
  const onCloseSearch = () => setIsSearchOpen(false);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box display="flex" flex={1}>
        {!shouldHideSidebar && (
          <Sidebar
            onOpenCreatePost={onOpenCreatePost}
            onOpenNotifications={onOpenNotifications}
            onOpenSearch={onOpenSearch}
            width={sidebarWidth}
          />
        )}

        <Box
          flex={1}
          sx={{
            display: "flex",
            flexDirection: shouldHideSidebar ? "column" : "row",
            justifyContent: shouldHideSidebar ? "center" : "flex-start",
            alignItems: shouldHideSidebar ? "center" : "stretch",
            padding: shouldHideSidebar ? 3 : 2,
          }}
        >
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
              path="/myProfile/:userId"
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
        </Box>
      </Box>

      <Footer sx={{ mt: "auto" }} />

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
        sidebarWidth={sidebarWidth}
      />
      <SearchPanel
        open={isSearchOpen}
        onClose={onCloseSearch}
        sidebarWidth={sidebarWidth}
      />
      <CreatePostModal open={isCreatePostOpen} onClose={onCloseCreatePost} />
    </Box>
  );
};

export default App;