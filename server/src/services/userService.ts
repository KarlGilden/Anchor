import { db } from '../data/db'
import { User } from '../types/user';

const getUserById = async (id: string) => {
    const user =  await db.select('*')
        .first()
        .from<User>('user')
        .where('user.id', Number(id));

    if(!user) return null;

    return user;
}

export const userService = {
    getUserById
};