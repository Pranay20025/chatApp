import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  gender:{
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  bio:{
    type:String,
  },
  profilePic:{
    type: String,
    default: "",
  },
},{timestamps:true});

export const User = mongoose.model("User", userSchema);