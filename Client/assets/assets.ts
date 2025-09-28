// 🖼️ Images & Icons
import avatar_icon from "./avatar_icon.png";
import gallery_icon from "./gallery_icon.svg";
import help_icon from "./help_icon.png";
import logo_icon from "./logo_icon.svg";
import logo_big from "./logo_big.svg";
import logo from "./logo.png";
import search_icon from "./search_icon.png";
import send_button from "./send_button.svg";
import menu_icon from "./menu_icon.png";
import arrow_icon from "./arrow_icon.png";
import code from "./code.svg";
import bgImage from "./bgImage.svg";

// 👤 Profile Pics
import profile_richard from "./profile_richard.png";
import profile_alison from "./profile_alison.png";
import profile_enrique from "./profile_enrique.png";
import profile_marco from "./profile_marco.png";
import profile_martin from "./profile_martin.png";

// 🖼️ Image Dummy Data
import pic1 from "./pic1.png";
import pic2 from "./pic2.png";
import pic3 from "./pic3.png";
import pic4 from "./pic4.png";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";

// ✅ Icons & Static Assets Export
const assets = {
  avatar_icon,
  gallery_icon,
  help_icon,
  logo,
  logo_big,
  logo_icon,
  search_icon,
  send_button,
  menu_icon,
  arrow_icon,
  code,
  bgImage,
  profile_martin,
};

export default assets;

export const imagesDummyData  = [pic1, pic2, pic3, pic4, pic1, pic2];

export const userDummyData = [
  {
    _id: "680f50aaf10f3cd28382ecf2",
    email: "test1@greatstack.dev",
    fullName: "Alison Martin",
    profilePic: profile_alison,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f50e4f10f3cd28382ecf9",
    email: "test2@greatstack.dev",
    fullName: "Martin Johnson",
    profilePic: profile_martin,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f5116f10f3cd28382ed02",
    email: "test3@greatstack.dev",
    fullName: "Enrique Martinez",
    profilePic: profile_enrique,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f5137f10f3cd28382ed10",
    email: "test4@greatstack.dev",
    fullName: "Marco Jones",
    profilePic: profile_marco,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f516cf10f3cd28382ed11",
    email: "test5@greatstack.dev",
    fullName: "Richard Smith",
    profilePic: profile_richard,
    bio: "Hi Everyone, I am Using QuickChat",
  },
];

export const user =   {
    _id: "680f50aaf10f3cd28382ecf2",
    email: "test1@greatstack.dev",
    fullName: "Alison Martin",
    profilePic: profile_alison,
    bio: "Hi Everyone, I am Using QuickChat",
  }

export const messagesDummyData = [
  // C ↔ A
  {
    _id: "1",
    senderId: "680f50aaf10f3cd28382ecf2", // C
    receiverId: "680f50e4f10f3cd28382ecf9", // A
    text: "Hey A, how's it going?",
    seen: true,
    createdAt: "2025-04-28T10:00:00.000Z",
  },
  {
    _id: "2",
    senderId: "680f50e4f10f3cd28382ecf9", // A
    receiverId: "680f50aaf10f3cd28382ecf2", // C
    text: "I'm good C! Working on a project.",
    seen: true,
    createdAt: "2025-04-28T10:01:00.000Z",
  },
  {
    _id: "3",
    senderId: "680f50aaf10f3cd28382ecf2", // C
    receiverId: "680f50e4f10f3cd28382ecf9", // A
    image: img1,
    seen: true,
    createdAt: "2025-04-28T10:02:00.000Z",
  },

  // C ↔ B
  {
    _id: "4",
    senderId: "680f50aaf10f3cd28382ecf2", // C
    receiverId: "680f5116f10f3cd28382ed02", // B
    text: "Hi B, long time!",
    seen: true,
    createdAt: "2025-04-28T10:03:00.000Z",
  },
  {
    _id: "5",
    senderId: "680f5116f10f3cd28382ed02", // B
    receiverId: "680f50aaf10f3cd28382ecf2", // C
    text: "Hey C! Yes, been busy lately.",
    seen: true,
    createdAt: "2025-04-28T10:04:00.000Z",
  },
  {
    _id: "6",
    senderId: "680f50aaf10f3cd28382ecf2", // C
    receiverId: "680f5116f10f3cd28382ed02", // B
    image: img2,
    seen: true,
    createdAt: "2025-04-28T10:05:00.000Z",
  },

  // Additional optional messages for depth
  {
    _id: "7",
    senderId: "680f5116f10f3cd28382ed02", // B
    receiverId: "680f50aaf10f3cd28382ecf2", // C
    text: "Let’s catch up this weekend?",
    seen: true,
    createdAt: "2025-04-28T10:06:00.000Z",
  },
  {
    _id: "8",
    senderId: "680f50e4f10f3cd28382ecf9", // A
    receiverId: "680f50aaf10f3cd28382ecf2", // C
    text: "Want to pair on the new feature?",
    seen: true,
    createdAt: "2025-04-28T10:07:00.000Z",
  },
];