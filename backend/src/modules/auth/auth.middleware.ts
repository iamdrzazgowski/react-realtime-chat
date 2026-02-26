import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: string;
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }

    try {
        const decoded = jwt.verify(token, secret);

        if (typeof decoded === "string") {
            return res.status(401).json({ message: "Invalid token" });
        }

        const payload = decoded as JwtPayload;

        if (!payload.userId || typeof payload.userId !== "string") {
            return res.status(401).json({ message: "Invalid token payload" });
        }

        req.userId = payload.userId;

        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};
