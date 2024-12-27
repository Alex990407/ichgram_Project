import React from "react";
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
} from "@mui/material";

// Пример данных уведомлений
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
  return (
    <>
      {/* Backdrop для закрытия панели */}
      <Backdrop
        open={open}
        onClick={onClose}
        sx={{
          zIndex: 1299, // На уровне ниже, чем сама панель
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Затемнение
        }}
      />

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: sidebarWidth, // Располагаем рядом с Sidebar
          height: "100%",
          width: "25%", // Ширина панели
          maxWidth: "400px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transform: open ? "translateX(0)" : "translateX(100%)", // Плавный выезд
          transition: "transform 0.3s ease",
          zIndex: 1300, // На переднем плане
          display: open ? "block" : "none", // Скрываем панель
        }}
      >
        {/* Заголовок */}
        <Box
          sx={{
            padding: "16px",
            borderBottom: "1px solid #ddd",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Notifications
          </Typography>
        </Box>

        {/* Список уведомлений */}
        <Box sx={{ padding: "16px" }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginBottom: 2 }}
          >
            New
          </Typography>
          <List>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={notification.avatar} alt={notification.user} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography>
                        <strong>{notification.user}</strong>{" "}
                        {notification.action}
                      </Typography>
                    }
                    secondary={notification.time}
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
