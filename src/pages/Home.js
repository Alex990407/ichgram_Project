import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Sidebar from "../components/Sidebar";
import { ReactComponent as LikeIcon } from "../assets/Like-icon.svg";
import { ReactComponent as ComentsIcon } from "../assets/Coments.svg";
import { ReactComponent as Post1 } from "../assets/Post1.svg";
import { ReactComponent as Post2 } from "../assets/Post2.svg";
import { ReactComponent as Post3 } from "../assets/Post3.svg";

const Home = ({ onOpenCreatePost, onOpenNotifications }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Определение размеров экрана
  const sidebarWidth = isSmallScreen ? 60 : 245;

  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        username: "john_doe",
        imageComponent: <Post1 />,
        caption: "A beautiful autumn day in the forest 🍂",
        likes: 120,
        comments: 15,
      },
      {
        id: 2,
        username: "jane_smith",
        imageComponent: <Post2 />,
        caption: "Captured the golden hour 🌅",
        likes: 240,
        comments: 30,
      },
      {
        id: 3,
        username: "alex_travel",
        imageComponent: <Post3 />,
        caption: "Exploring the mountains 🏔️",
        likes: 350,
        comments: 42,
      },
    ];

    setPosts(mockPosts);
    setLoading(false);
  }, []);

  if (loading)
    return <CircularProgress style={{ margin: "auto", display: "block" }} />;
  if (error)
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        onOpenCreatePost={onOpenCreatePost}
        onOpenNotifications={onOpenNotifications}
      />
      <Container maxWidth="lg" sx={{ flex: 1, mt: 4 }}>
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={12} key={post.id}>
              <Card>
                <Box
                  sx={{
                    width: "100%",
                    height: "0",
                    paddingTop: "56.25%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {post.imageComponent}
                  </Box>
                </Box>

                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {post.username}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.caption || "No caption provided"}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2} mt={1}>
                    <IconButton
                      sx={{
                        padding: 0,
                        width: "24px",
                        height: "24px",
                      }}
                    >
                      <LikeIcon width="24px" height="24px" />
                    </IconButton>
                    <Typography variant="body2">{post.likes} likes</Typography>
                    <IconButton
                      sx={{
                        padding: 0,
                        width: "24px",
                        height: "24px",
                      }}
                    >
                      <ComentsIcon width="24px" height="24px" />
                    </IconButton>
                    <Typography variant="body2">
                      {post.comments} comments
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
// const Home = ({ onOpenCreatePost, onOpenNotifications }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const mockPosts = [
//       {
//         id: 1,
//         username: "john_doe",
//         imageComponent: <Post1 />,
//         caption: "A beautiful autumn day in the forest 🍂",
//         likes: 120,
//         comments: 15,
//       },
//       {
//         id: 2,
//         username: "jane_smith",
//         imageComponent: <Post2 />,
//         caption: "Captured the golden hour 🌅",
//         likes: 240,
//         comments: 30,
//       },
//       {
//         id: 3,
//         username: "alex_travel",
//         imageComponent: <Post3 />,
//         caption: "Exploring the mountains 🏔️",
//         likes: 350,
//         comments: 42,
//       },
//     ];

//     setPosts(mockPosts);
//     setLoading(false);
//   }, []);

//   if (loading)
//     return <CircularProgress style={{ margin: "auto", display: "block" }} />;
//   if (error)
//     return (
//       <Typography color="error" align="center">
//         {error}
//       </Typography>
//     );

//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>
//       <Sidebar
//         onOpenCreatePost={onOpenCreatePost}
//         onOpenNotifications={onOpenNotifications}
//       />
//       <Container maxWidth="md" sx={{ flex: 1, mt: 4 }}>
//         <Grid container spacing={2}>
//           {posts.map((post) => (
//             <Grid item xs={12} key={post.id}>
//               <Card>
//                 <Box
//                   sx={{
//                     width: "100%",
//                     height: "0",
//                     paddingTop: "56.25%",
//                     position: "relative",
//                     overflow: "hidden",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: "0",
//                       left: "0",
//                       width: "100%",
//                       height: "100%",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     {post.imageComponent}
//                   </Box>
//                 </Box>

//                 <CardContent>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {post.username}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {post.caption || "No caption provided"}
//                   </Typography>
//                   <Box display="flex" alignItems="center" gap={2} mt={1}>
//                     <IconButton
//                       sx={{
//                         padding: 0,
//                         width: "24px",
//                         height: "24px",
//                       }}
//                     >
//                       <LikeIcon width="24px" height="24px" />
//                     </IconButton>
//                     <Typography variant="body2">{post.likes} likes</Typography>
//                     <IconButton
//                       sx={{
//                         padding: 0,
//                         width: "24px",
//                         height: "24px",
//                       }}
//                     >
//                       <ComentsIcon width="24px" height="24px" />
//                     </IconButton>
//                     <Typography variant="body2">
//                       {post.comments} comments
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </div>
//   );
// };

// export default Home;
