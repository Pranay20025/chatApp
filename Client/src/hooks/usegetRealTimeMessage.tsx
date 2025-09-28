import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setMessages } from "../redux/messageSlice";
import type { Message, User } from "../components/types";

const usegetRealTimeMessage = (selectedUser: User | undefined) => {
  const { socket } = useAppSelector((store) => store.socket);
  const { messages } = useAppSelector((store) => store.messages); 
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket || !selectedUser?._id) return;

    const handleNewMessage = (newMessage: Message) => {
      const isRelevant =
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id;

      if (isRelevant) {
        dispatch(setMessages([...messages, newMessage])); // Manually merge messages
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser, messages, dispatch]);
};

export default usegetRealTimeMessage;
