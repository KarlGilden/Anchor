import { Request, Response } from 'express';
import { authService } from '../services/authService';

const register = async (req: Request, res: Response) => {
    if(!req.body) return res.status(500).send("No request body");

    try{
        const userId = await authService.register(req.body)
        res.status(201).send({id: userId});
    }catch (error) {
        res.status(500).send(error);
    }
};

const login = async (req: Request, res: Response) => {
    const { userId } = await authService.login(req.body);

    req.session.userId = userId;

    res.status(200).send({id: userId})
};

export const authController = {
    register,
    login
};