export interface User{
  _id: string,
  name: string,
  email: string,
   password: string,
  profilePic: string,
  bio: string,
 }
 export interface Message{
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timeStamp: string;
 }
 export interface Messagee{
  senderId: string;
  receiverId: string;
  message: string;
  timeStamp: string;
 }