import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Message } from "../components/types";

interface MessageState{
  messages : Message[],
}

const initialState : MessageState ={
  messages:[],
}
const messages = createSlice({
  name : "messages",
  initialState,
  reducers:{
    setMessages:(state,action:PayloadAction<Message[]>) =>{
      state.messages = action.payload;
    }
  }
})

export const {setMessages} = messages.actions;
export default messages.reducer;