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
  CircularProgress,
} from "@mui/material";

const SearchResults = ({ filteredUsers, loading, error, onUserClick, isSmallScreen }) => (
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
              onClick={() => onUserClick(user.id)}
              sx={{ cursor: "pointer" }}
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
);

export default SearchResults;
