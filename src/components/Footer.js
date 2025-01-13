import React from "react";
import { Box, Typography, Link, Grid } from "@mui/material";

const Footer = () => {
  const menuItems = [
    { text: "Home", path: "/home" },
    { text: "Search", path: "/search" },
    { text: "Explore", path: "/explore" },
    { text: "Messages", path: "/messages" },
    { text: "Notifications", path: "/notifications" },
    { text: "Create", path: "/create" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f8f9fa",
        padding: "20px 0",
        marginTop: "1px",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Grid container justifyContent="center" spacing={2}>
        {menuItems.map((item, index) => (
          <Grid item key={index}>
            <Link
              href={item.path}
              sx={{
                color: "#6c757d",
                textDecoration: "none",
                fontSize: "16px",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {item.text}
            </Link>
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="body2"
        sx={{
          color: "#6c757d",
          marginTop: "10px",
        }}
      >
        &copy; 2024 ICHgram
      </Typography>
    </Box>
  );
};

export default Footer;
