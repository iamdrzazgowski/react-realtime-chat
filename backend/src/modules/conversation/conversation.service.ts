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
                create: [
                    { userId, role: "MEMBER" },
                    { userId: otherUserId, role: "MEMBER" },
                ],
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

export const getUserConversations = async (userId: string) => {
    const conversations = await prisma.conversation.findMany({
        where: {
            members: {
                some: { userId },
            },
        },
        include: {
            members: {
                include: { user: true },
            },
            messages: {
                orderBy: { createdAt: "desc" },
                take: 1,
                include: {
                    sender: {
                        select: { id: true, firstName: true, lastName: true },
                    },
                },
            },
        },
        orderBy: { updatedAt: "desc" },
    });

    return conversations.map((conv) => {
        const lastMessage = conv.messages[0] || null;

        if (conv.type === "DIRECT") {
            const otherMember = conv.members.find((m) => m.userId !== userId);
            return {
                id: conv.id,
                type: conv.type,
                user: otherMember
                    ? {
                          id: otherMember.user.id,
                          firstName: otherMember.user.firstName,
                          lastName: otherMember.user.lastName,
                      }
                    : null,
                lastMessage: lastMessage
                    ? {
                          id: lastMessage.id,
                          content: lastMessage.content,
                          createdAt: lastMessage.createdAt,
                          sender: {
                              id: lastMessage.sender.id,
                              firstName: lastMessage.sender.firstName,
                              lastName: lastMessage.sender.lastName,
                          },
                      }
                    : null,
            };
        } else {
            return {
                id: conv.id,
                type: conv.type,
                name: conv.name,
                lastMessage: lastMessage
                    ? {
                          id: lastMessage.id,
                          content: lastMessage.content,
                          createdAt: lastMessage.createdAt,
                          sender: {
                              id: lastMessage.sender.id,
                              firstName: lastMessage.sender.firstName,
                              lastName: lastMessage.sender.lastName,
                          },
                      }
                    : null,
            };
        }
    });
};
