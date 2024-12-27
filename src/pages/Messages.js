import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  Divider,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
} from "@mui/material";

import Sidebar from "../components/Sidebar";

const Messages = ({
  onOpenCreatePost,
  onOpenSearchModal,
  onOpenNotifications,
}) => {
  const users = [
    {
      id: 1,
      name: "nikita",
      message: "Nikita sent a message.",
      time: "2 weeks",
    },
    { id: 2, name: "sasha", message: "Sasha sent a message.", time: "2 weeks" },
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "nikita",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      type: "received",
    },
    {
      id: 2,
      sender: "you",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      type: "sent",
    },
  ]);

  const [currentUser, setCurrentUser] = useState(users[0]);
  const [newMessage, setNewMessage] = useState("");
  const intervalRef = useRef(null); // Ссылка на интервал

  // Обработчик зажатия клавиши
  const handleKeyDown = (e) => {
    const ignoredKeys = [
      "Meta",
      "Control",
      "Alt",
      "Backspace",
      "Tab",
      "Enter",
      "Shift",
      "CapsLock",
      "Escape",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
    ];

    if (ignoredKeys.includes(e.key)) {
      return; // Прерываем выполнение для игнорируемых клавиш
    }

    if (!intervalRef.current) {
      const key = e.key;
      intervalRef.current = setInterval(() => {
        setNewMessage((prev) => prev + key);
      }, 100);
    }
  };

  // Обработчик отпускания клавиши

  const handleKeyUp = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "you",
          text: newMessage,
          type: "sent",
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ display: "flex", height: "100vh", mt: 2 }}>
      <Sidebar
        onOpenCreatePost={onOpenCreatePost}
        onOpenSearchModal={onOpenSearchModal}
        onOpenNotifications={onOpenNotifications}
      />
      <Paper elevation={1} sx={{ width: "25%", borderRight: "1px solid #ddd" }}>
        <Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }}>
          itcareerhub
        </Typography>
        <Divider />
        <List>
          {users.map((user) => (
            <ListItem
              button
              key={user.id}
              onClick={() => setCurrentUser(user)}
              selected={currentUser.id === user.id}
            >
              <ListItemAvatar>
                <Avatar>{user.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={`${user.message} • ${user.time}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ mr: 2 }}>{currentUser.name[0]}</Avatar>
          <Typography variant="h6" fontWeight="bold">
            {currentUser.name}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                justifyContent: msg.type === "sent" ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  maxWidth: "60%",
                  backgroundColor:
                    msg.type === "sent" ? "rgba(77, 0, 255, 1)" : "#f3f4f6",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      msg.type === "sent" ? "rgba(255, 255, 255, 1)" : "#000",
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            multiline // Позволяет тексту переноситься на новую строку
            rows={2} // Указывает минимальную высоту - 1 строка
            maxRows={2} // Устанавливает максимальную высоту - 1 строка
            placeholder="Write message"
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown} // Вызов при зажатии клавиши
            onKeyUp={handleKeyUp} // Вызов при отпускании клавиши
            sx={{
              width: "80%",
              height: "44px",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                paddingRight: "0px",
              },
            }}
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  sx={{
                    width: "15%",
                    height: "100%",
                    borderTopRightRadius: "8px",
                    borderBottomRightRadius: "8px",
                    bgcolor: "#4f46e5",
                    color: "#fff",
                  }}
                >
                  Send
                </Button>
              ),
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Messages;
