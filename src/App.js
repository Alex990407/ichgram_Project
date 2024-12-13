import React from "react";
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

const App = () => {
  return (
    <Router>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/myProfile" element={<AuthorizedProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ForgotPassword from "./pages/ForgotPassword";
// import NotFound from "./pages/NotFound";
// import Explore from "./pages/Explore";
// import Profile from "./pages/Profile";
// import Footer from "./components/Footer";
// import Sidebar from "./components/Sidebar";
// import AuthorizedProfile from "./pages/AuthorizedProfile";

// const App = () => {
//   const location = useLocation();

//   // Определяем страницы, где не нужен Sidebar и Footer
//   const noSidebarFooterPages = ["/login", "/signup", "/forgot-password", "*"];

//   const hideSidebarFooter = noSidebarFooterPages.includes(location.pathname);

//   return (
//     <div className="app-container">
//       {/* Sidebar (если не нужно скрывать) */}
//       {!hideSidebarFooter && <Sidebar />}

//       <div className={`main-content ${hideSidebarFooter ? "full-width" : ""}`}>
//         <Routes>
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/explore" element={<Explore />} />
//           <Route path="/profile/:userId" element={<Profile />} />
//           <Route path="*" element={<NotFound />} />
//           <Route path="/myProfile" element={<AuthorizedProfile />} />
//         </Routes>
//       </div>

//       {/* Footer (если не нужно скрывать) */}
//       {!hideSidebarFooter && <Footer />}
//     </div>
//   );
// };

// const AppWrapper = () => (
//   <Router>
//     <App />
//   </Router>
// );

// export default AppWrapper;
