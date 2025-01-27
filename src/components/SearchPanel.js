import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { ReactComponent as ClosePageIcon } from "../assets/Close-page.svg";
import useSearchUsers from "../hooks/useSearchUsers";
import { useNavigate } from "react-router-dom";

const SearchPanel = ({ open, onClose, sidebarWidth }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { filteredUsers, loading, error, filterUsers } = useSearchUsers(open);
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const panelWidth = isSmallScreen ? "100%" : isMediumScreen ? "40%" : "25%";
  const panelLeft = isSmallScreen ? 0 : sidebarWidth;

  useEffect(() => {
    filterUsers(searchQuery);
  }, [searchQuery, filterUsers]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const handleUserClick = (userId) => {
    navigate(`/myProfile/${userId}`);
    onClose();
  };

  return (
    <>
      <Backdrop
        open={open}
        onClick={onClose}
        sx={{
          zIndex: 1299,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          left: panelLeft,
          width: `calc(100% - ${panelLeft}px)`,
        }}
      />

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
            sx={{ textAlign: "start" }}
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

        <Box sx={{ padding: isSmallScreen ? "8px" : "16px" }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginBottom: isSmallScreen ? 1 : 2 }}
          >
            Recent
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          ) : filteredUsers.length === 0 ? (
            <Typography textAlign="center">No users found</Typography>
          ) : (
            <List>
              {filteredUsers.map((user) => (
                <React.Fragment key={user.id}>
                  <ListItem
                    alignItems="center"
                    onClick={() => handleUserClick(user.id)} // Обработчик клика
                    sx={{ cursor: "pointer" }} // Курсор "указатель"
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={user.avatarUrl}
                        alt={user.username}
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
                          {user.username}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SearchPanel;
