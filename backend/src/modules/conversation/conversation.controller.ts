import { Request, Response } from "express";
import { AuthRequest } from "../auth/auth.middleware";
import { createDirectConversation as createDirectConversationAPI } from "./conversation.service";

export const createDirectConversation = async (
    req: AuthRequest,
    res: Response,
) => {
    try {
        const userId = req.userId;
        const { otherUserId } = req.body;

        if (!otherUserId) {
            return res.status(400).json({ message: "otherUserId is required" });
        }

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const conversation = await createDirectConversationAPI(
            userId,
            otherUserId,
        );

        return res.status(201).json({ conversation });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
