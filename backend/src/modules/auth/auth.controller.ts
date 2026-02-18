import { Request, Response } from "express";
import { loginUser, registerUser } from "./auth.service";

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
