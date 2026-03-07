import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware";
import {
    createDirectConversation,
    createGroupConversation,
    getConversationById,
    getConversations,
} from "./conversation.controller";

const router = Router();

router.post("/direct", authMiddleware, createDirectConversation);
router.post("/group", authMiddleware, createGroupConversation);
router.get("/allConversations", authMiddleware, getConversations);
router.get("/:conversationId", authMiddleware, getConversationById);

export default router;
