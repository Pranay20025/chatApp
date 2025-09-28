import express from "express";
import isAuthenticated from "../authentication/isAuthenticated";
import { getMessage, sendMessage } from "../controllers/message";

const router = express.Router();

router.post("/send/:id",isAuthenticated,sendMessage);
router.get("/receive/:id",isAuthenticated,getMessage);

export default router;