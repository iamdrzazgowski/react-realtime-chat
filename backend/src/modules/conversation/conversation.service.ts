import { prisma } from "../../config/prisma";

export const createDirectConversation = async (
    userId: string,
    otherUserId: string,
) => {
    if (userId === otherUserId) {
        throw new Error("Cannot create conversation with yourself");
    }

    const otherUser = await prisma.user.findUnique({
        where: { id: otherUserId },
    });

    if (!otherUser) {
        throw new Error("User not found");
    }

    const existingConversation = await prisma.conversation.findFirst({
        where: {
            type: "DIRECT",
            members: {
                some: { userId },
            },
            AND: {
                members: {
                    some: { userId: otherUserId },
                },
            },
        },
        include: {
            members: true,
        },
    });

    if (existingConversation && existingConversation.members.length === 2) {
        return existingConversation;
    }

    const conversation = await prisma.conversation.create({
        data: {
            type: "DIRECT",
            members: {
                create: [{ userId }, { userId: otherUserId }],
            },
        },
        include: {
            members: {
                include: {
                    user: true,
                },
            },
        },
    });

    return conversation;
};
