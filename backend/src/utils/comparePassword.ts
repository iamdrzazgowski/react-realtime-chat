import bcrypt from "bcrypt";

export const comparePassword = async (password: string, hashed: string) => {
    return bcrypt.compare(password, hashed);
};
