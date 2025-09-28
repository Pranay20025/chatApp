"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const isAuthenticated_1 = __importDefault(require("../authentication/isAuthenticated"));
const router = express_1.default.Router();
router.post("/register", user_1.register);
router.post("/login", user_1.login);
router.get("/logout", user_1.logout);
router.get("/allusers", isAuthenticated_1.default, user_1.getAllUsers);
exports.default = router;
