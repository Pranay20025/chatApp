import { Server } from "socket.io";
import http from "http";
import express from "express";
import {
  addUserSocket,
  removeUserSocket,
  getOnlineUsers,
} from "./socketUtils";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId as string;

  if (userId) {
    addUserSocket(userId, socket.id);
    io.emit("getOnlineUsers", getOnlineUsers());
  }

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (userId) {
      removeUserSocket(userId);
      io.emit("getOnlineUsers", getOnlineUsers());
    }
  });
});

export { app, server, io };
