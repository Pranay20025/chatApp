import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SocketState {
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket | null>) => {
      return {
        ...state,
        socket: action.payload, 
      };
    },
  },
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
