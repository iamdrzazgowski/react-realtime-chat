import { prisma } from "../../config/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken";

export const registerUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) throw new Error("User with this email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { firstName, lastName, email, password: hashedPassword },
    });
    const token = generateToken(user.id);

    return { user, token };
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token = generateToken(user.id);

    return { user, token };
};
