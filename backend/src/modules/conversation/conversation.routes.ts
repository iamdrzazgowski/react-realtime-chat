import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware";
import {
    createDirectConversation,
    getConversations,
} from "./conversation.controller";

const router = Router();

router.post("/direct", authMiddleware, createDirectConversation);
router.get("/allConversations", authMiddleware, getConversations);

export default router;
