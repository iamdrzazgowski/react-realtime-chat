import { prisma } from "../../config/prisma";

interface GetUsersParams {
    search?: string;
    limit?: number;
}

export const getUsers = async ({ search, limit }: GetUsersParams) => {
    const usersData = await prisma.user.findMany({
        ...(limit !== undefined && { take: limit }),

        ...(search && {
            where: {
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
            },
        }),

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
