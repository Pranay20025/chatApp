"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = exports.sendMessage = void 0;
const conversation_1 = require("../model/conversation");
const message_1 = require("../model/message");
const socket_1 = require("../socket/socket");
const socketUtils_1 = require("../socket/socketUtils");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message, timeStamp } = req.body;
        if (!message || !receiverId) {
            return res.status(400).json({
                success: false,
                message: "Message and receiver ID are required",
            });
        }
        let gotConversation = yield conversation_1.Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!gotConversation) {
            gotConversation = yield conversation_1.Conversation.create({
                participants: [senderId, receiverId],
                messages: [],
            });
        }
        const newMessage = yield message_1.Message.create({
            senderId,
            receiverId,
            message,
            timeStamp,
        });
        gotConversation.messages.push(newMessage._id);
        yield Promise.all([gotConversation.save(), newMessage.save()]);
        const receiverSocketId = (0, socketUtils_1.getReceiverSocketId)(receiverId);
        if (receiverSocketId) {
            socket_1.io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(200).json({
            success: true,
            message: newMessage,
        });
    }
    catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send message",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.sendMessage = sendMessage;
const getMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = yield conversation_1.Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate("messages");
        if (!conversation) {
            return res.status(200).json({
                success: true,
                messages: [],
            });
        }
        return res.status(200).json({
            success: true,
            messages: conversation.messages,
        });
    }
    catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Server error",
        });
    }
});
exports.getMessage = getMessage;
