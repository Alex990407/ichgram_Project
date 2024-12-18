// import React, { useEffect, useState } from "react";
// import { Container, Grid, Box, Typography } from "@mui/material";
// import simpsonImage from "../assets/simpson.jpg";
// import { ReactComponent as Post1 } from "../assets/Post1.svg";
// import { ReactComponent as Post2 } from "../assets/Post2.svg";
// import { ReactComponent as Post3 } from "../assets/Post3.svg";

// import Sidebar from "../components/Sidebar";

// const Explore = ({ onOpenCreatePost }) => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
// Закомментированный запрос на сервер
// const fetchPosts = async () => {
//   try {
//     const response = await axios.get("/api/posts/explore"); // Запрос к API
//     setPosts(response.data.posts); // Сохраняем посты в стейт
//     setLoading(false);
//   } catch (error) {
//     console.error("Error fetching explore posts:", error);
//     setLoading(false);
//   }
// };
// fetchPosts();

//     // Мок-данные для тестирования
//     const mockPosts = [
//       { id: 1, imageComponent: <Post1 /> },
//       { id: 2, imageUrl: simpsonImage },
//       { id: 3, imageComponent: <Post3 /> },
//       { id: 4, imageComponent: <Post2 /> },
//       { id: 5, imageUrl: simpsonImage },
//       { id: 6, imageComponent: <Post2 /> },
//       { id: 7, imageComponent: <Post1 /> },
//       { id: 8, imageUrl: simpsonImage },
//       { id: 9, imageComponent: <Post3 /> },
//       { id: 10, imageComponent: <Post2 /> },
//       { id: 11, imageComponent: <Post3 /> },
//       { id: 12, imageComponent: <Post2 /> },
//       { id: 13, imageUrl: simpsonImage },
//       { id: 14, imageComponent: <Post2 /> },
//       { id: 15, imageComponent: <Post1 /> },
//       { id: 16, imageComponent: <Post3 /> },
//       { id: 17, imageUrl: simpsonImage },
//     ];

//     // Устанавливаем мок-данные и убираем загрузку
//     setPosts(mockPosts);
//     setLoading(false);
//   }, []);

//   if (loading) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>
//       <Sidebar onOpenCreatePost={onOpenCreatePost} /> {/* Добавляем Sidebar */}
//       <Container
//         maxWidth="lg"
//         sx={{
//           flex: 1,
//           marginTop: 4,
//         }}
//       >
//         <Typography variant="h4" sx={{ marginBottom: 3 }}>
//           Explore
//         </Typography>
//         <Grid container spacing={2}>
//           {posts.map((post) => (
//             <Grid item xs={12} sm={6} md={4} key={post.id}>
//               {/* Условно отображаем обычные изображения и SVG */}
//               {post.imageUrl ? (
//                 <Box
//                   component="img"
//                   src={post.imageUrl}
//                   alt={`Post ${post.id}`}
//                   sx={{
//                     width: "100%",
//                     height: "auto",
//                     borderRadius: 2,
//                     transition: "transform 0.2s ease-in-out",
//                     ":hover": {
//                       transform: "scale(1.05)",
//                     },
//                   }}
//                 />
//               ) : (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     width: "100%",
//                     height: "100%",
//                     paddingTop: "100%", // квадратный блок
//                     position: "relative",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
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
//               )}
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </div>
//   );
// };

// export default Explore;

import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import simpsonImage from "../assets/simpson.jpg";
import { ReactComponent as Post1 } from "../assets/Post1.svg";
import { ReactComponent as Post2 } from "../assets/Post2.svg";
import { ReactComponent as Post3 } from "../assets/Post3.svg";
import Sidebar from "../components/Sidebar";

const Explore = ({ onOpenCreatePost }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Запрос на сервер
    // const fetchPosts = async () => {
    //   try {
    //     const response = await axios.get("/api/posts/explore"); // Запрос к API
    //     setPosts(response.data.posts); // Сохраняем посты в стейт
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching explore posts:", error);
    //     setLoading(false);
    //   }
    // };
    // fetchPosts();
    const mockPosts = [
      { id: 1, imageComponent: <Post1 /> },
      { id: 2, imageUrl: simpsonImage },
      { id: 3, imageComponent: <Post3 /> },
      { id: 4, imageComponent: <Post2 /> },
      { id: 5, imageUrl: simpsonImage },
      { id: 6, imageComponent: <Post2 /> },
      { id: 7, imageComponent: <Post1 /> },
      { id: 8, imageUrl: simpsonImage },
      { id: 9, imageComponent: <Post3 /> },
      { id: 10, imageComponent: <Post2 /> },
    ];

    setPosts(mockPosts);
    setLoading(false);
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar onOpenCreatePost={onOpenCreatePost} />
      <Container maxWidth="lg" sx={{ flex: 1, mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Explore
        </Typography>

        {/* Masonry Layout using CSS Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // Три колонки
            gridAutoRows: "auto", // Автоматическая высота строк
            gap: "16px",
          }}
        >
          {posts.map((post) => (
            <Box
              key={post.id}
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Условие: для обычных изображений и SVG */}
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={`Post ${post.id}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    paddingTop: "100%", // Создаёт квадратный контейнер
                    position: "relative",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
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
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default Explore;
