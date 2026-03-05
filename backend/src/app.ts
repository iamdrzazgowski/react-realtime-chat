import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import usersRoutes from "./modules/users/users.routes";
import conversationRoutes from "./modules/conversation/conversation.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", usersRoutes);
app.use("/api/conversation", conversationRoutes);
