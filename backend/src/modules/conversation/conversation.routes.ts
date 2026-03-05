import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware";
import { createDirectConversation } from "./conversation.controller";

const router = Router();

router.post("/direct", authMiddleware, createDirectConversation);

export default router;
