"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = require("./connection/connectDB");
const user_1 = __importDefault(require("./routes/user"));
const message_1 = __importDefault(require("./routes/message"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const socket_1 = require("./socket/socket");
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
(0, connectDB_1.connectDB)();
socket_1.app.use(express_1.default.json());
socket_1.app.use((0, cookie_parser_1.default)());
socket_1.app.use(body_parser_1.default.urlencoded({ extended: true }));
socket_1.app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
socket_1.app.use("/user", user_1.default);
socket_1.app.use("/message", message_1.default);
socket_1.app.get("/", (req, res) => {
    return res.json({ message: "welcome" });
});
socket_1.server.listen(3000, () => {
    console.log(`server is running on ${PORT}`);
});
