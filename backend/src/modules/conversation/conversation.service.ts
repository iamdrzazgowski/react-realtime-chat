import { prisma } from "../../config/prisma";
import { ConversationRole } from "../../generated/prisma/enums";

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

export const createGroupConversation = async (
    creatorId: string,
    name: string,
    userIds: string[],
) => {
    const uniqueUsers = [...new Set(userIds)];

    const members = [
        {
            userId: creatorId,
            role: ConversationRole.ADMIN,
        },
        ...uniqueUsers
            .filter((id) => id !== creatorId)
            .map((id) => ({
                userId: id,
                role: ConversationRole.MEMBER,
            })),
    ];

    const conversation = await prisma.conversation.create({
        data: {
            type: "GROUP",
            name,
            members: {
                create: members,
            },
        },
        include: {
            members: true,
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
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
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

        const currentMember = conv.members.find((m) => m.userId === userId);
        const otherMember = conv.members.find((m) => m.userId !== userId);

        if (conv.type === "DIRECT") {
            return {
                id: conv.id,
                type: conv.type,

                lastReadAt: currentMember?.lastReadAt ?? null,

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
                          senderId: lastMessage.senderId,
                          sender: {
                              id: lastMessage.sender.id,
                              firstName: lastMessage.sender.firstName,
                              lastName: lastMessage.sender.lastName,
                          },
                      }
                    : null,
            };
        }

        return {
            id: conv.id,
            type: conv.type,
            name: conv.name,

            lastReadAt: currentMember?.lastReadAt ?? null,

            lastMessage: lastMessage
                ? {
                      id: lastMessage.id,
                      content: lastMessage.content,
                      createdAt: lastMessage.createdAt,
                      senderId: lastMessage.senderId,
                      sender: {
                          id: lastMessage.sender.id,
                          firstName: lastMessage.sender.firstName,
                          lastName: lastMessage.sender.lastName,
                      },
                  }
                : null,
        };
    });
};
