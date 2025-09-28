import { useEffect } from 'react';
import axios from 'axios';
import { messageUrl } from '../url';
import { useAppDispatch } from '../redux/hooks';
import { setMessages } from '../redux/messageSlice';
import type { User } from '../components/types';

const useGetMessages = (selectedUser: User | undefined) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedUser?._id) return;
      try {
        const res = await axios.get(`${messageUrl}/receive/${selectedUser._id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setMessages(res.data.messages));
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [selectedUser, dispatch]);
};

export default useGetMessages;
