const userSocketMap: Record<string, string> = {};

export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};

export const addUserSocket = (userId: string, socketId: string) => {
  userSocketMap[userId] = socketId;
};

export const removeUserSocket = (userId: string) => {
  delete userSocketMap[userId];
};

export const getOnlineUsers = (): string[] => {
  return Object.keys(userSocketMap);
};
