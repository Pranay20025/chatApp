import styles from "../ChatArea/ChatArea.module.css";
import { useEffect, useRef } from "react";
import type { Message, User } from "../types";
import { messageUrl } from "../../url";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setMessages } from "../../redux/messageSlice";
import useGetMessages from "../../hooks/useGetMessages";
import usegetRealTimeMessage from "../../hooks/usegetRealTimeMessage";


interface ChatAreaProps {
  selectedUser: User | undefined;
}

const ChatArea = ({ selectedUser }: ChatAreaProps) => {
  const { authUser } = useAppSelector((store) => store.user);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { messages } = useAppSelector((store) => store.messages);
  const dispatch = useAppDispatch();

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useGetMessages(selectedUser);
  usegetRealTimeMessage(selectedUser);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    const message = messageInputRef.current?.value.trim();
    if (!message || !authUser || !selectedUser) return;

    const timeStamp = new Date().toISOString();
    const newMessage: Message = {
      _id: Date.now().toString(), 
      senderId: authUser._id,
      receiverId: selectedUser._id,
      message,
      timeStamp,
    };

    dispatch(setMessages([...messages, newMessage]));

    try {
      const res = await axios.post(
        `${messageUrl}/send/${selectedUser._id}`,
        { message, timeStamp },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log("Message sent");
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }

    if (messageInputRef.current) {
      messageInputRef.current.value = "";
    }
  };

  if (!selectedUser) {
    return <div className={styles.chat}>Select a user to start chatting</div>;
  }

  return (
    <div className={styles.chat}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <div className={styles.headerLeft}>
          <img
            src={selectedUser.profilePic || "/default-profile.jpg"}
            alt="Profile"
            className={styles.profilePic}
          />
          <h3>{selectedUser.name || "Unknown User"}</h3>
        </div>
  
      </div>

      {/* Messages */}
      <div className={styles.chatMessages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.senderId === authUser?._id
                ? styles.messageRight
                : styles.messageLeft
            }
          >
            <p>{msg.message}</p>
            <span className={styles.messageTime}>
              {formatTime(msg.timeStamp)}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className={styles.chatInput}>
        <input
          type="text"
          placeholder="Send a message..."
          ref={messageInputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <label htmlFor="imgUpload" className={styles.imageUploadLabel}>
          📷
        </label>
        <input
          type="file"
          id="imgUpload"
          accept="image/*"
          ref={imageInputRef}
          className={styles.imageUpload}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatArea;
