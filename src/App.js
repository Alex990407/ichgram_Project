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

const App = () => {
  // Поднятое состояние для модального окна
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  // Функции для управления модалкой
  const onOpenCreatePost = () => setIsCreatePostOpen(true);
  const onCloseCreatePost = () => setIsCreatePostOpen(false);

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
              element={<Home onOpenCreatePost={onOpenCreatePost} />} // Главная страница
            />
            <Route
              path="/messages"
              element={<Messages onOpenCreatePost={onOpenCreatePost} />}
            />

            <Route
              path="/explore"
              element={<Explore onOpenCreatePost={onOpenCreatePost} />}
            />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route
              path="/myProfile"
              element={
                <AuthorizedProfile onOpenCreatePost={onOpenCreatePost} />
              }
            />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Глобальное модальное окно для создания поста */}
        <CreatePostModal open={isCreatePostOpen} onClose={onCloseCreatePost} />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
