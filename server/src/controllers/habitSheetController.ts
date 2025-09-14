import { Request, Response } from 'express';
import { habitSheetService } from '../services/habitSheetService';
import { AppError } from '../types/error';
import { Habit, HabitCreate } from '../types/habit';

const getAllHabitSheets = async (req: Request, res: Response) => {
    const userId = req.session.userId;

    if(!userId){
        throw new AppError("Unable to authenticate user", 401);
    }

    const habitSheets = await habitSheetService.getAllHabitSheets(userId);

    return res.status(200).send(habitSheets);
}; 

const getHabitSheet = async (req: Request, res: Response) => {
    const { id } = req.params;

    if(!id){
        throw new AppError(`No habit sheet with id ${id} found`, 404);
    }

    const habitSheet = await habitSheetService.getHabitSheetById(id);

    if(!habitSheet){
        throw new AppError(`No habit sheet with id ${id} found`, 404);
    }

    return res.status(200).json(habitSheet);
};

const createHabitSheet = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    if(!name || !description) {
        throw new AppError("All fields are required", 400);
    }

    const userId = req.session.userId;

    if(!userId) {
        throw new AppError("Unable to authenticate user", 401);
    }

    const habitSheetId = await habitSheetService.createHabitSheet(req.body, userId);

    return res.status(201).send({ id: habitSheetId });
};

const updateHabitSheet = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if(!name && !description){
        throw new AppError("All fields are required", 400);
    }

    const updateCount = await habitSheetService.updateHabitSheet(id, name, description);

    if(updateCount === 0){
        res.status(404).send({ message: "No record updated"});
    }

    return res.status(200).send({ count: updateCount });
};

const deleteHabitSheet = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleteCount = await habitSheetService.deleteHabitSheet(id);

    if(deleteCount === 0){
        res.status(404).send({ message: "No record deleted"});
    }

    return res.status(200).send({ count: deleteCount });
};

// habits
const getAllHabits = async (req: Request, res: Response) => {
    const { id } = req.params;

    const habits = await habitSheetService.getAllHabits(id);

    return res.status(200).send(habits);
};

const createHabit = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.session;
    const habit: HabitCreate = req.body;

    if(!habit.name || !habit.entry_type){
        throw new AppError("Missing required properties", 400)
    }

    if(!userId) {
        throw new AppError("Unable to authenticate user", 401);
    }

    const returnHabit = await habitSheetService.createHabit(habit, id, userId);

    if(!returnHabit.habitId){
        throw new AppError("Failed to create habit", 500);
    }

    return res.status(201).send(returnHabit);

};

export const habitSheetController = {
    getAllHabitSheets,
    getHabitSheet,
    createHabitSheet,
    updateHabitSheet,
    deleteHabitSheet,
    getAllHabits,
    createHabit
};