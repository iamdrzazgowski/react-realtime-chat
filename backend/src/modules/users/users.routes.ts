import { Router } from "express";
import { getUsers } from "./users.controller";

const router = Router();
router.get("/users", getUsers);

export default router;
