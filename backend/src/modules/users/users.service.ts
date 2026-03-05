import { prisma } from "../../config/prisma";

interface GetUsersParams {
    search?: string;
    limit?: number;
    userId: string;
}

export const getUsers = async ({ search, limit, userId }: GetUsersParams) => {
    const usersData = await prisma.user.findMany({
        ...(limit !== undefined && { take: limit }),

        where: {
            id: {
                not: userId,
            },

            ...(search && {
                OR: [
                    {
                        firstName: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        lastName: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        email: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ],
            }),
        },

        orderBy: {
            createdAt: "desc",
        },

        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            isOnline: true,
            createdAt: true,
        },
    });

    return { usersData };
};
