import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
    return await hash(password, 12);
}

export async function comparePassword(hash, password) {
    return await compare(password, hash);
}