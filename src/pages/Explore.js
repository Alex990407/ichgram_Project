import React, { useEffect, useState } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import simpsonImage from "../assets/simpson.jpg";

import Sidebar from "../components/Sidebar";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    // Мок-данные для тестирования
    const mockPosts = [
      { id: 1, imageUrl: simpsonImage },
      { id: 2, imageUrl: simpsonImage },
      { id: 3, imageUrl: simpsonImage },
      { id: 4, imageUrl: simpsonImage },
      { id: 5, imageUrl: simpsonImage },
      { id: 6, imageUrl: simpsonImage },
    ];

    // Устанавливаем мок-данные и убираем загрузку
    setPosts(mockPosts);
    setLoading(false);
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar /> {/* Добавляем Sidebar */}
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          marginTop: 4,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Explore
        </Typography>
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Box
                component="img"
                src={post.imageUrl}
                alt={`Post ${post.id}`}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  transition: "transform 0.2s ease-in-out",
                  ":hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Explore;

// import React, { useEffect, useState } from "react";
// import { Container, Grid, Box, Typography } from "@mui/material";

// import Sidebar from "../components/Sidebar";

// import axios from "axios";

// const Explore = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("/api/posts/explore"); // Запрос к API
//         setPosts(response.data.posts); // Сохраняем посты в стейт
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching explore posts:", error);
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>
//       <Sidebar /> {/* Добавляем Sidebar */}
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
//               <Box
//                 component="img"
//                 src={post.imageUrl}
//                 alt={`Post ${post.id}`}
//                 sx={{
//                   width: "100%",
//                   borderRadius: 2,
//                   transition: "transform 0.2s ease-in-out",
//                   ":hover": {
//                     transform: "scale(1.05)",
//                   },
//                 }}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </div>
//   );
// };

// export default Explore;
