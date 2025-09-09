import express from 'express';
import { requireAuth } from '../services/authService';
import { habitSheetController } from '../controllers/habitSheetController';

const habitSheetRouter = express.Router();

// habit sheets
habitSheetRouter.get('/', requireAuth, habitSheetController.getAllHabitSheets);
habitSheetRouter.get('/:id', requireAuth, habitSheetController.getHabitSheet);
habitSheetRouter.post('/', requireAuth, habitSheetController.createHabitSheet);
habitSheetRouter.patch('/:id', requireAuth, habitSheetController.updateHabitSheet);
habitSheetRouter.delete('/:id', requireAuth, habitSheetController.deleteHabitSheet);

// habits
habitSheetRouter.get('/:id/habit', habitSheetController.getAllHabits);
habitSheetRouter.post('/:id/habit', habitSheetController.createHabit);

export default habitSheetRouter;