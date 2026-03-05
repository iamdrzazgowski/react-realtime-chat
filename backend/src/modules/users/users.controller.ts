import { Request, Response } from "express";
import { getUsers as getUsersFromDB } from "./users.service";
import { AuthRequest } from "../auth/auth.middleware";

export const getUsers = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const searchQuery = req.query.search as string | undefined;
        const limitQuery = req.query.limit as string | undefined;
        let limit: number | undefined = undefined;

        if (limitQuery) {
            const parsed = parseInt(limitQuery);

            if (isNaN(parsed) || parsed < 0) {
                return res.status(400).json({
                    message: "limit must be a non-negative integer",
                });
            }

            limit = parsed;
        }

        const users = await getUsersFromDB({
            ...(searchQuery !== undefined && { search: searchQuery.trim() }),
            ...(limit !== undefined && { limit }),
            userId,
        });

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            messages: "An error occurred while fetching users",
        });
    }
};
