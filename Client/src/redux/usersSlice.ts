import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../components/types";

interface UsersState {
  users: User[],
}

const initialState : UsersState = {
  users: [],
}

const usersSlice = createSlice({
  name : "Users",
  initialState,
  reducers:{
   setusers:(state,action)=>{
      state.users = action.payload;
    },
  }
})

export const {setusers} = usersSlice.actions;
export default usersSlice.reducer;