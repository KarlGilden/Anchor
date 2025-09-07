import { Request, Response } from 'express';
import { userService } from '../services/userService';

const getAllUsers = (req: Request, res: Response) => {
    res.send("All users");
};

const getUserById = async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id);
    
    if(!user) return res.send("Failed to fetch user");
    res.send(`${user.username} : ${user.email}`);
};

export const userController = {
    getAllUsers,
    getUserById
};