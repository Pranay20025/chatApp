import express from "express"
import { getAllUsers, login, logout, register } from "../controllers/user";
import isAuthenticated from "../authentication/isAuthenticated";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/allusers",isAuthenticated,getAllUsers);

export default router;