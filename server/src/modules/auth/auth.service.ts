import { prisma } from "../../config/prisma";
import { comparePassword } from "../../utils/comparePassword";
import { generateToken } from "../../utils/generateToken";
import { hashPassword } from "../../utils/hashPassword";

export const registerUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) throw new Error("User with this email already exists");

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: { firstName, lastName, email, password: hashedPassword },
    });
    const token = generateToken(user.id);

    return { token };
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token = generateToken(user.id);

    return { token };
};
