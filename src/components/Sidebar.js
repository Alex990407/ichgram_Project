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
import { NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../assets/sidebarIcons/home.svg";
import { ReactComponent as SearchIcon } from "../assets/sidebarIcons/Search.svg";
import { ReactComponent as ExploreIcon } from "../assets/sidebarIcons/explore.svg";
import { ReactComponent as MessagesIcon } from "../assets/sidebarIcons/Messages.svg";
import { ReactComponent as NotificationsIcon } from "../assets/sidebarIcons/Notifications.svg";
import { ReactComponent as CreateIcon } from "../assets/sidebarIcons/Create.svg";
import { ReactComponent as IchgramIcon } from "../assets/ICHGRAM.svg";
import PersonIcon from "@mui/icons-material/Person";

const Sidebar = ({ onOpenCreatePost, onOpenNotifications }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Адаптивность для маленьких экранов
  const sidebarWidth = isSmallScreen ? 60 : 245;

  const menuItems = [
    { text: "Home", icon: <HomeIcon width="24px" height="24px" />, path: "/" },
    {
      text: "Search",
      icon: <SearchIcon width="24px" height="24px" />,
      path: "/search",
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
      action: () => {
        console.log("Notifications clicked");
        onOpenNotifications();
      },
    },
    {
      text: "Create",
      icon: <CreateIcon width="24px" height="24px" />,
      action: onOpenCreatePost,
    },
    {
      text: "Profile",
      icon: <PersonIcon />, // Material-UI иконка
      path: "/myProfile",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
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
            maxWidth: "150px",
            height: "auto",
          }}
        />
      </Box>

      {/* Меню */}
      <List sx={{ width: "100%" }}>
        {menuItems.map((item) => {
          if (item.action) {
            return (
              <ListItem
                key={item.text}
                button
                onClick={item.action}
                sx={{
                  justifyContent: { xs: "center", sm: "flex-start" },
                  px: { xs: 1, sm: 2 },
                  gap: { lg: 2, md: 1 },
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
                <ListItemText
                  primary={item.text}
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
              </ListItem>
            );
          }
          return (
            <NavLink
              to={item.path}
              key={item.text}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem
                button
                sx={{
                  justifyContent: { xs: "center", sm: "flex-start" },
                  px: { xs: 1, sm: 2 },
                  gap: { lg: 2, md: 1 },
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
                <ListItemText
                  primary={item.text}
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
              </ListItem>
            </NavLink>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
