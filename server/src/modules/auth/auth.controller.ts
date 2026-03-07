import { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service";
import { AuthRequest } from "./auth.middleware";
import { prisma } from "../../config/prisma";

export const register = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const data = await registerUser(firstName, lastName, email, password);
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const data = await loginUser(email, password);
        res.json(data);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getUser = async (req: AuthRequest, res: Response) => {
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: { id: true, email: true, firstName: true, lastName: true },
    });

    return res.json(user);
};
