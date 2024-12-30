// import React from "react";
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemAvatar,
//   Avatar,
//   ListItemText,
//   Divider,
//   Backdrop,
// } from "@mui/material";

// // Пример данных уведомлений
// const notifications = [
//   {
//     id: 1,
//     user: "sashaa",
//     action: "liked your photo.",
//     time: "2 d",
//     avatar: "https://via.placeholder.com/40",
//     photo: "https://via.placeholder.com/40",
//   },
//   {
//     id: 2,
//     user: "sashaa",
//     action: "commented your photo.",
//     time: "2 week",
//     avatar: "https://via.placeholder.com/40",
//     photo: "https://via.placeholder.com/40",
//   },
//   {
//     id: 3,
//     user: "sashaa",
//     action: "started following.",
//     time: "2 d",
//     avatar: "https://via.placeholder.com/40",
//     photo: "https://via.placeholder.com/40",
//   },
// ];

// const NotificationsPanel = ({ open, onClose, sidebarWidth }) => {
//   return (
//     <>
//       {/* Backdrop для закрытия панели */}
//       <Backdrop
//         open={open}
//         onClick={onClose}
//         sx={{
//           zIndex: 1299, // На уровне ниже, чем сама панель
//           backgroundColor: "rgba(0, 0, 0, 0.5)", // Затемнение
//           left: sidebarWidth, // Начало затемнения сразу после Sidebar
//           width: `calc(100% - ${sidebarWidth}px)`, // Затемняем только контент страницы
//         }}
//       />

//       <Box
//         sx={{
//           position: "fixed",
//           top: 0,
//           left: sidebarWidth, // Располагаем рядом с Sidebar
//           height: "100%",
//           width: "25%", // Ширина панели
//           maxWidth: "400px",
//           backgroundColor: "#fff",
//           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//           transform: open ? "translateX(0)" : "translateX(100%)", // Плавный выезд
//           transition: "transform 0.3s ease",
//           zIndex: 1300, // На переднем плане
//           display: open ? "block" : "none", // Скрываем панель
//         }}
//       >
//         {/* Заголовок */}
//         <Box
//           sx={{
//             padding: "16px",
//             borderBottom: "1px solid #ddd",
//             backgroundColor: "#fff",
//           }}
//         >
//           <Typography variant="h6" fontWeight="bold">
//             Notifications
//           </Typography>
//         </Box>

//         {/* Список уведомлений */}
//         <Box sx={{ padding: "16px" }}>
//           <Typography
//             variant="subtitle1"
//             fontWeight="bold"
//             sx={{ marginBottom: 2 }}
//           >
//             New
//           </Typography>
//           <List>
//             {notifications.map((notification) => (
//               <React.Fragment key={notification.id}>
//                 <ListItem alignItems="flex-start">
//                   <ListItemAvatar>
//                     <Avatar src={notification.avatar} alt={notification.user} />
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary={
//                       <Typography>
//                         <strong>{notification.user}</strong>{" "}
//                         {notification.action}
//                       </Typography>
//                     }
//                     secondary={notification.time}
//                   />
//                 </ListItem>
//                 <Divider />
//               </React.Fragment>
//             ))}
//           </List>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default NotificationsPanel;

import React from "react";
import { ReactComponent as ClosePageIcon } from "../assets/Close-page.svg";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Backdrop,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";

const notifications = [
  {
    id: 1,
    user: "sashaa",
    action: "liked your photo.",
    time: "2 d",
    avatar: "https://via.placeholder.com/40",
    photo: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    user: "sashaa",
    action: "commented your photo.",
    time: "2 week",
    avatar: "https://via.placeholder.com/40",
    photo: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    user: "sashaa",
    action: "started following.",
    time: "2 d",
    avatar: "https://via.placeholder.com/40",
    photo: "https://via.placeholder.com/40",
  },
];

const NotificationsPanel = ({ open, onClose, sidebarWidth }) => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const panelWidth = isSmallScreen ? "100%" : isMediumScreen ? "40%" : "25%";

  const panelLeft = isSmallScreen ? 0 : sidebarWidth;

  return (
    <>
      <Backdrop
        open={open}
        onClick={onClose}
        sx={{
          zIndex: 1299,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          left: panelLeft, // Начало затемнения после Sidebar или от края
          width: `calc(100% - ${panelLeft}px)`, // Затемняем только правую часть экрана
        }}
      />

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: panelLeft, // Расположение панели
          height: "100%",
          width: panelWidth, // Динамическая ширина
          maxWidth: isSmallScreen ? "100%" : "400px", // Максимальная ширина для больших экранов
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transform: open ? "translateX(0)" : "translateX(100%)", // Плавный выезд
          transition: "transform 0.3s ease",
          zIndex: 1300,
          display: open ? "block" : "none", // Скрываем панель
        }}
      >
        {/* Заголовок */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            borderBottom: "1px solid #ddd",
            padding: isSmallScreen ? "12px" : "16px",
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant={isSmallScreen ? "h6" : "h5"}
            fontWeight="bold"
            sx={{
              textAlign: "start", // Заголовок остаётся слева
            }}
          >
            Notifications
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              padding: isSmallScreen ? "4px" : "8px",
              width: "24px",
              height: "24px",
            }}
          >
            <ClosePageIcon width="24px" height="24px" />
          </IconButton>
        </Box>

        {/* Список уведомлений */}
        <Box sx={{ padding: isSmallScreen ? "8px" : "16px" }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginBottom: isSmallScreen ? 1 : 2 }}
          >
            New
          </Typography>
          <List>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      src={notification.avatar}
                      alt={notification.user}
                      sx={{
                        width: isSmallScreen ? 32 : 40, // Уменьшаем аватар на маленьких экранах
                        height: isSmallScreen ? 32 : 40,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: isSmallScreen ? "14px" : "16px", // Меньший шрифт на маленьких экранах
                        }}
                      >
                        <strong>{notification.user}</strong>{" "}
                        {notification.action}
                      </Typography>
                    }
                    secondary={notification.time}
                    secondaryTypographyProps={{
                      style: {
                        fontSize: isSmallScreen ? "12px" : "14px", // Меньший шрифт времени
                      },
                    }}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default NotificationsPanel;
