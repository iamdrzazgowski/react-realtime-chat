import { Server } from "socket.io";
import { app } from "./app";
import { env } from "./config/env";
import http from "http";
import { prisma } from "./config/prisma";

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: env.frontendUrl,
        methods: ["GET", "POST"],
    },
});

const onlineUsers = new Map<string, string>();

io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    socket.on("user_online", async (userId: string) => {
        onlineUsers.set(userId, socket.id);
        await prisma.user.update({
            where: { id: userId },
            data: { isOnline: true },
        });
        console.log(`User ${userId} online`);
    });

    socket.on("join_conversation", (conversationId: string) => {
        socket.join(conversationId);
        console.log(`User ${socket.id} joined conversation ${conversationId}`);
    });

    socket.on("send_message", async (data) => {
        const { conversationId, senderId, content } = data;

        const message = await prisma.message.create({
            data: { conversationId, senderId, content },
            include: {
                sender: {
                    select: { id: true, firstName: true, lastName: true },
                },
            },
        });

        io.to(conversationId).emit("receive_message", message);
    });

    socket.on("disconnect", async () => {
        for (const [userId, sId] of onlineUsers.entries()) {
            if (sId === socket.id) {
                onlineUsers.delete(userId);
                await prisma.user.update({
                    where: { id: userId },
                    data: { isOnline: false },
                });
                console.log(`User ${userId} offline`);
                break;
            }
        }
    });
});

server.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
});
