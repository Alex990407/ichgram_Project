import React from "react";
import { TextField, Button } from "@mui/material";

const ProfileForm = ({ formData, onChange, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: "100%",
        maxWidth: "600px",
      }}
    >
      <TextField
        fullWidth
        name="username"
        label="Username"
        value={formData.username}
        onChange={onChange}
        variant="outlined"
        sx={{ marginBottom: 3 }}
      />
      <TextField
        fullWidth
        name="website"
        label="Website"
        value={formData.website}
        onChange={onChange}
        variant="outlined"
        sx={{ marginBottom: 3 }}
      />
      <TextField
        fullWidth
        name="about"
        label="About"
        value={formData.about}
        onChange={onChange}
        variant="outlined"
        multiline
        rows={4}
        inputProps={{ maxLength: 150 }}
        sx={{ marginBottom: 4 }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          width: "100%",
          backgroundColor: "rgba(0, 149, 246, 1)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(0, 120, 200, 1)",
          },
        }}
      >
        Save
      </Button>
    </form>
  );
};

export default ProfileForm;
