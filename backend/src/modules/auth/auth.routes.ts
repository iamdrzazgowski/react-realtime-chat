import { Router } from "express";
import { getUser, login, register } from "./auth.controller";
import { authMiddleware } from "./auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/signup", register);
router.get("/user", authMiddleware, getUser);

export default router;
