import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  TextField,
  IconButton,
  useMediaQuery,
  useTheme,
  Backdrop,
} from "@mui/material";
import { ReactComponent as ClosePageIcon } from "../assets/Close-page.svg";

// Пример данных пользователей
const users = [
  {
    id: 1,
    name: "sashaa",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    name: "john_doe",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    name: "jane_smith",
    avatar: "https://via.placeholder.com/40",
  },
];

const SearchPanel = ({ open, onClose, sidebarWidth }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const panelWidth = isSmallScreen ? "100%" : isMediumScreen ? "40%" : "25%";
  const panelLeft = isSmallScreen ? 0 : sidebarWidth;

  // Фильтрация пользователей
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Панель поиска */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: panelLeft,
          height: "100%",
          width: panelWidth,
          maxWidth: isSmallScreen ? "100%" : "400px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          zIndex: 1300,
          display: open ? "block" : "none",
        }}
      >
        {/* Заголовок с кнопкой закрытия */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

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
            Search
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

        {/* Поле поиска */}
        <Box sx={{ padding: "16px" }}>
          <TextField
            fullWidth
            placeholder="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              sx: {
                borderRadius: "8px",
                backgroundColor: "#f3f4f6",
              },
            }}
          />
        </Box>

        {/* Список пользователей */}
        <Box sx={{ padding: isSmallScreen ? "8px" : "16px" }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginBottom: isSmallScreen ? 1 : 2 }}
          >
            Recent
          </Typography>
          <List>
            {filteredUsers.map((user) => (
              <React.Fragment key={user.id}>
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      sx={{
                        width: isSmallScreen ? 32 : 40,
                        height: isSmallScreen ? 32 : 40,
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: isSmallScreen ? "14px" : "16px",
                        }}
                      >
                        {user.name}
                      </Typography>
                    }
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

export default SearchPanel;
