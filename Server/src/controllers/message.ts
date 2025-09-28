import { Request, Response } from "express";
import { Conversation } from "../model/conversation";
import { Message } from "../model/message";
import {io}   from "../socket/socket";
import { getReceiverSocketId } from "../socket/socketUtils";


export const sendMessage = async (req: Request, res: Response) => {
  try {
    const senderId = (req as any).id;
    const receiverId = req.params.id;
    const { message, timeStamp } = req.body;

    if (!message || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Message and receiver ID are required",
      });
    }

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
      timeStamp,
    });

    gotConversation.messages.push(newMessage._id);

    await Promise.all([gotConversation.save(),newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
export const getMessage = async (req: Request, res: Response) => {
  try {
    const receiverId = req.params.id;
    const senderId = (req as any).id;

    const conversation = await Conversation.findOne({
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

  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};