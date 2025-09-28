import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./connection/connectDB";
import userRoute from "./routes/user";
import messageRoute from "./routes/message";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket"; 

dotenv.config();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/user", userRoute);
app.use("/message", messageRoute);

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "welcome" });
});

server.listen(3000, () => {
  console.log(`server is running on ${PORT}`);
});
