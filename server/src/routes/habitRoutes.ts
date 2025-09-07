import express from 'express';
import { habitController } from '../controllers/habitController';

const habitRouter = express.Router();

habitRouter.get('/habit/:id', habitController.getHabit);
habitRouter.patch('/habit/:id', habitController.updateHabit);
habitRouter.delete('/habit/:id', habitController.deleteHabit);

habitRouter.get('/habit/:id/entry', habitController.getHabitEntry);
habitRouter.post('/habit/:id/entry', habitController.createHabitEntry);

export default habitRouter;