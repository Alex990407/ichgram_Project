import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CreateIcon from "@mui/icons-material/AddBox";
import PersonIcon from "@mui/icons-material/Person";
import { ReactComponent as IchgramIcon } from "../assets/ICHGRAM.svg";

const Sidebar = () => {
  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Search", icon: <SearchIcon />, path: "/search" },
    { text: "Explore", icon: <ExploreIcon />, path: "/explore" },
    { text: "Messages", icon: <MessageIcon />, path: "/messages" },
    {
      text: "Notifications",
      icon: <NotificationsIcon />,
      path: "/notifications",
    },
    { text: "Create", icon: <CreateIcon />, path: "/create" },
    { text: "Profile", icon: <PersonIcon />, path: "/myProfile" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 245,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 245,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px 0",
        },
      }}
    >
      {/* Логотип */}
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <IchgramIcon style={{ width: "150px", height: "auto" }} />
      </Box>

      {/* Меню */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.text}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                "&:hover .MuiTypography-root": {
                  fontWeight: "bold", // Жирный текст при наведении
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      transition: "font-weight 0.3s ease",
                    }}
                  >
                    {item.text}
                  </Typography>
                }
              />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
