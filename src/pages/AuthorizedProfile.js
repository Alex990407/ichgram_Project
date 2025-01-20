// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Grid,
//   Box,
//   Typography,
//   Button,
//   Skeleton,
// } from "@mui/material";
// import Sidebar from "../components/Sidebar";
// import { useNavigate } from "react-router-dom";
// import useUserProfile from "../hooks/useUserProfile";
// import usePosts from "../hooks/usePosts";
// import AvatarComponent from "../components/AvatarComponent";
// import PostCard from "../components/PostCard";

// const AuthorizedProfile = ({
//   onOpenCreatePost,
//   onOpenNotifications,
//   onOpenSearch,
// }) => {
//   const navigate = useNavigate();
//   const {
//     profile,
//     loading: profileLoading,
//     error: profileError,
//     fetchProfile,
//   } = useUserProfile();
//   const {
//     fetchUserPosts,
//     loading: postsLoading,
//     error: postsError,
//   } = usePosts();
//   const [userPosts, setUserPosts] = useState([]);

//   // Fetch profile data
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         console.log("Fetching authorized user profile...");
//         if (!profile) {
//           await fetchProfile();
//         }
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//       }
//     };
//     loadProfile();
//   }, [fetchProfile, profile]);

//   // Fetch posts for the authorized user
//   useEffect(() => {
//     if (profile?._id) {
//       const loadUserPosts = async () => {
//         console.log("Attempting to fetch posts for userId:", profile._id);
//         try {
//           const posts = await fetchUserPosts(profile._id);
//           console.log("Fetched posts from API:", posts); // Лог результата API
//           if (posts && posts.posts) {
//             console.log("Setting posts:", posts.posts);
//             setUserPosts(posts.posts);
//           } else {
//             console.error("No posts found in the response.");
//             setUserPosts([]); // Обнуляем, если постов нет
//           }
//         } catch (err) {
//           console.error("Error fetching user posts:", err);
//         }
//       };
//       loadUserPosts();
//     }
//   }, [profile?._id, fetchUserPosts]);

//   // Loading and error states
//   if (profileLoading || postsLoading) {
//     return (
//       <div style={{ display: "flex", minHeight: "100vh" }}>
//         <Container sx={{ flex: 1, marginTop: 4 }}>
//           <Skeleton variant="rectangular" width="100%" height={200} />
//         </Container>
//       </div>
//     );
//   }

//   if (profileError || postsError) {
//     return (
//       <Typography variant="h6" align="center" sx={{ mt: 5, color: "red" }}>
//         {profileError || postsError}
//       </Typography>
//     );
//   }

//   const postCount = userPosts.length;

//   // Render the profile page
//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>
//       <Sidebar
//         onOpenCreatePost={onOpenCreatePost}
//         onOpenNotifications={onOpenNotifications}
//         onOpenSearch={onOpenSearch}
//       />
//       <Container sx={{ flex: 1, marginTop: 4 }}>
//         {/* Profile Section */}
//         <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
//           <Grid item xs={12} sm={3} textAlign="center">
//             <AvatarComponent size={80} avatarUrl={profile?.avatarUrl} />
//           </Grid>
//           <Grid item xs={12} sm={9}>
//             <Box display="flex" alignItems="center" gap={2} mb={2}>
//               <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                 {profile?.username}
//               </Typography>
//               <Button
//                 variant="outlined"
//                 onClick={() => navigate("/edit-profile")}
//                 sx={{
//                   width: { xs: "100px", sm: "168px" },
//                   height: "32px",
//                   borderRadius: "8px",
//                   backgroundColor: "rgba(239, 239, 239, 1)",
//                   color: "rgba(0, 0, 0, 1)",
//                   fontFamily: "Roboto",
//                   textAlign: "center",
//                   fontSize: "14px",
//                   border: "none",
//                   "&:hover": {
//                     backgroundColor: "rgba(220, 220, 220, 1)",
//                   },
//                 }}
//               >
//                 Edit Profile
//               </Button>
//             </Box>
//             <Box display="flex" gap={3} mb={2}>
//               <Typography>
//                 <strong>{postCount}</strong> posts
//               </Typography>
//               <Typography>
//                 <strong>{profile?.followers}</strong> followers
//               </Typography>
//               <Typography>
//                 <strong>{profile?.following}</strong> following
//               </Typography>
//             </Box>
//             <Typography variant="body1" color="text.secondary">
//               {profile?.description}
//             </Typography>
//           </Grid>
//         </Grid>

//         {/* Posts Section */}
//         <Grid container spacing={2}>
//           {userPosts.length > 0 ? (
//             userPosts.map((post) => (
//               <Grid item xs={12} sm={6} md={4} key={post._id}>
//                 <PostCard
//                   post={post}
//                   onClick={(postId) => console.log(`Post clicked: ${postId}`)}
//                 />
//               </Grid>
//             ))
//           ) : (
//             <Typography align="center" variant="h6" color="text.secondary">
//               No posts available.
//             </Typography>
//           )}
//         </Grid>
//       </Container>
//     </div>
//   );
// };

// export default AuthorizedProfile;
import React from "react";
import ProfilePage from "../components/ProfilePage";
import useUserProfile from "../hooks/useUserProfile";
import usePosts from "../hooks/usePosts";

const AuthorizedProfile = (props) => {
  const { profile, fetchProfile } = useUserProfile();
  const { fetchUserPosts } = usePosts();

  return (
    <ProfilePage
      fetchProfileData={fetchProfile}
      fetchUserPosts={fetchUserPosts}
      userId={profile?.userId || "currentUser"} // Передаем реальный userId из профиля
      isCurrentUser={true}
      {...props}
    />
  );
};

export default AuthorizedProfile;
