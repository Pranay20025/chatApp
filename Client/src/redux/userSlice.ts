import { createSlice } from "@reduxjs/toolkit";

interface UserState{
authUser: any,
onlineUsers: string[],
}

const initialState: UserState = {
  authUser:null,
  onlineUsers:[],
}

const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    setAuthUser:(state,action)=>{
      state.authUser = action.payload;
    },
    setOnlineUsers:(state,action)=>{
      state.onlineUsers = action.payload;
    },
  }
})

export const {setAuthUser, setOnlineUsers} = userSlice.actions;
export default userSlice.reducer;