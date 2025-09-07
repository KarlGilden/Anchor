import express from 'express';
import { userController } from '../controllers/userController';
import { requireAuth } from '../services/authService';

const userRouter = express.Router();

userRouter.get('/', requireAuth, userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);

export default userRouter;