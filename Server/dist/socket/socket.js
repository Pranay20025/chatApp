"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = exports.app = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const socketUtils_1 = require("./socketUtils");
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});
exports.io = io;
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
        (0, socketUtils_1.addUserSocket)(userId, socket.id);
        io.emit("getOnlineUsers", (0, socketUtils_1.getOnlineUsers)());
    }
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        if (userId) {
            (0, socketUtils_1.removeUserSocket)(userId);
            io.emit("getOnlineUsers", (0, socketUtils_1.getOnlineUsers)());
        }
    });
});
