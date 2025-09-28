"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../model/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Register Controller
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, gender } = req.body;
        if (!name || !email || !password || !gender) {
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            });
        }
        const isAlreadyRegistered = yield user_1.User.findOne({ email });
        if (isAlreadyRegistered) {
            return res.status(400).send({
                success: false,
                message: "Email already registered",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?email=${email}`;
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?email=${email}`;
        const currDP = gender === "male" ? maleProfilePic : femaleProfilePic;
        const user = yield user_1.User.create({
            name,
            email,
            password: hashedPassword,
            gender,
            profilePic: currDP,
        });
        return res.status(201).send({
            success: true,
            message: "Registered Successfully",
            user,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.register = register;
// Login Controller
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            });
        }
        const user = yield user_1.User.findOne({ email });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Not Registered",
            });
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send({
                success: false,
                message: "Wrong credentials",
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
        return res
            .status(200)
            .cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000,
        })
            .json({
            success: true,
            user: user,
            message: `Welcome back ${user.name}`,
            token: token,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.login = login;
// Logout Controller
const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            path: "/",
        });
        return res
            .status(200)
            .send({
            success: true,
            message: "Logout Successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.logout = logout;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logedInUser = req.id;
        const users = yield user_1.User.find({ _id: { $ne: logedInUser } }).select("-password");
        return res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            users: users,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getAllUsers = getAllUsers;
