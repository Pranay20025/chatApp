"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnlineUsers = exports.removeUserSocket = exports.addUserSocket = exports.getReceiverSocketId = void 0;
const userSocketMap = {};
const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
exports.getReceiverSocketId = getReceiverSocketId;
const addUserSocket = (userId, socketId) => {
    userSocketMap[userId] = socketId;
};
exports.addUserSocket = addUserSocket;
const removeUserSocket = (userId) => {
    delete userSocketMap[userId];
};
exports.removeUserSocket = removeUserSocket;
const getOnlineUsers = () => {
    return Object.keys(userSocketMap);
};
exports.getOnlineUsers = getOnlineUsers;
