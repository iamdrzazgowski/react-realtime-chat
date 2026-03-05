import { Router } from "express";
import { getUsers } from "./users.controller";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();
router.get("/users", authMiddleware, getUsers);

export default router;
