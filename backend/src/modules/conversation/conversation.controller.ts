import { Request, Response } from "express";
import { AuthRequest } from "../auth/auth.middleware";
import {
    createDirectConversation as createDirectConversationAPI,
    createGroupConversation as createGroupConversationAPI,
    getConversationById as getConversationByIdAPI,
    getUserConversations,
} from "./conversation.service";

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

export const createGroupConversation = async (
    req: AuthRequest,
    res: Response,
) => {
    try {
        const creatorId = req.userId;
        const { name, userIds } = req.body;

        if (!creatorId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        if (!userIds || !Array.isArray(userIds)) {
            return res.status(400).json({
                message: "userIds must be an array",
            });
        }

        const conversation = await createGroupConversationAPI(
            creatorId,
            name,
            userIds,
        );

        return res.status(201).json({ conversation });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getConversations = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const conversations = await getUserConversations(userId);

        return res.status(200).json({ conversations });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getConversationById = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const { conversationId } = req.params;

        if (!conversationId) {
            return res
                .status(400)
                .json({ message: "Conversation ID is required" });
        }

        const conversation = await getConversationByIdAPI(
            conversationId as string,
        );

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        return res.status(200).json({ conversation });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
