import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../assets/sidebarIcons/home.svg";
import { ReactComponent as SearchIcon } from "../assets/sidebarIcons/Search.svg";
import { ReactComponent as ExploreIcon } from "../assets/sidebarIcons/explore.svg";
import { ReactComponent as MessagesIcon } from "../assets/sidebarIcons/Messages.svg";
import { ReactComponent as NotificationsIcon } from "../assets/sidebarIcons/Notifications.svg";
import { ReactComponent as CreateIcon } from "../assets/sidebarIcons/Create.svg";
import { ReactComponent as IchgramIcon } from "../assets/ICHGRAM.svg";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserContext } from "../context/UserContext";

const Sidebar = ({ onOpenCreatePost, onOpenNotifications, onOpenSearch }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const sidebarWidth = isSmallScreen ? 60 : isMediumScreen ? 100 : 245;

  const navigate = useNavigate();

  const { profile } = useUserContext(); // Получаем данные профиля из контекста

  console.log(profile?.userId._id);

  const handleLogout = () => {
    // Удаляем токен из localStorage
    localStorage.removeItem("authToken");
    // Перенаправляем пользователя на страницу логина
    navigate("/login");
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon width="24px" height="24px" />, path: "/" },
    {
      text: "Search",
      icon: <SearchIcon width="24px" height="24px" />,
      action: onOpenSearch,
    },
    {
      text: "Explore",
      icon: <ExploreIcon width="24px" height="24px" />,
      path: "/explore",
    },
    {
      text: "Messages",
      icon: <MessagesIcon width="24px" height="24px" />,
      path: "/messages",
    },
    {
      text: "Notifications",
      icon: <NotificationsIcon width="24px" height="24px" />,
      action: onOpenNotifications,
    },
    {
      text: "Create",
      icon: <CreateIcon width="24px" height="24px" />,
      action: onOpenCreatePost,
    },
    {
      text: "Profile",
      icon: <PersonIcon />,
      path: `/myProfile/${profile?.userId._id || "myProfile"}`,
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      action: handleLogout,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          boxSizing: "border-box",
        },
      }}
    >
      {/* Логотип */}
      <Box
        sx={{ textAlign: "center", marginBottom: "10px", marginTop: "10px" }}
      >
        <IchgramIcon
          style={{
            width: "100%",
            maxWidth: isSmallScreen ? "40px" : "150px",
            height: "auto",
          }}
        />
      </Box>

      {/* Меню */}
      <List sx={{ width: "100%" }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={item.action || (() => navigate(item.path))}
            sx={{
              justifyContent: isSmallScreen ? "center" : "flex-start",
              px: isSmallScreen ? 1 : 2,
              gap: isMediumScreen ? 1 : 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "auto",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            {!isSmallScreen && (
              <ListItemText primary={item.text} sx={{ display: "block" }} />
            )}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
