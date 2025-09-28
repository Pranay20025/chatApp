import { Outlet } from 'react-router-dom';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setOnlineUsers } from './redux/userSlice';
import { setSocket } from './redux/socketsice';

function App() {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector(store => store.user); 
  const { socket } = useAppSelector(store => store.socket);

useEffect(() => {
  if (authUser) {
    const newSocket: Socket = io('http://localhost:3000', {
      query: { userId: authUser._id }
    });

    dispatch(setSocket(newSocket));

    newSocket.on('getOnlineUsers', (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    return () => {
      newSocket.close();
    };
  } else {
    if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }
}, [authUser]);


  return (
    <>
      <Outlet />
      <ToastContainer position="top-right" autoClose={2000} />
       </>
  );
}

export default App;
