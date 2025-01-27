import React, { useState, useEffect } from "react";
import { Box, Backdrop, useMediaQuery, useTheme } from "@mui/material";
import useSearchUsers from "../hooks/useSearchUsers";
import { useNavigate } from "react-router-dom";
import SearchHeader from "./Search/SearchHeader";
import SearchInput from "./Search/SearchInput";
import SearchResults from "./Search/SearchResults";

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
        <SearchHeader onClose={onClose} isSmallScreen={isSmallScreen} />
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSmallScreen={isSmallScreen}
        />
        <SearchResults
          filteredUsers={filteredUsers}
          loading={loading}
          error={error}
          onUserClick={handleUserClick}
          isSmallScreen={isSmallScreen}
        />
      </Box>
    </>
  );
};

export default SearchPanel;
