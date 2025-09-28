"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuthenticated_1 = __importDefault(require("../authentication/isAuthenticated"));
const message_1 = require("../controllers/message");
const router = express_1.default.Router();
router.post("/send/:id", isAuthenticated_1.default, message_1.sendMessage);
router.get("/receive/:id", isAuthenticated_1.default, message_1.getMessage);
exports.default = router;
