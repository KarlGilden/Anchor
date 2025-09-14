import express from 'express';
import { habitController } from '../controllers/habitController';

const habitRouter = express.Router();

habitRouter.get('/:id', habitController.getHabit);
habitRouter.patch('/:id', habitController.updateHabit);
habitRouter.delete('/:id', habitController.deleteHabit);

habitRouter.get('/:id/entry', habitController.getHabitEntry);
habitRouter.post('/:id/entry', habitController.createHabitEntry);

export default habitRouter;