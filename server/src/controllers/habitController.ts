import { habitService } from "../services/habitService";
import { Request, Response } from 'express';
import { AppError } from "../types/error";

const getHabit = async (req: Request, res: Response) => {
    const {id} = req.params;

    const habit = await habitService.getHabitWithConstraints(id)

    if(!habit){
        return new AppError("Cannot find habit", 404);
    }

    return res.status(200).send(habit)
};

const updateHabit = () => {

};

const deleteHabit = () => {

};

const getHabitEntry = () => {

};

const createHabitEntry = async (req: Request, res: Response) => {
    const { id } = req.params;
    const habitEntry = req.body;

    console.log(habitEntry)
    if(!habitEntry) {
        throw new AppError("No entry provided", 400);
    }

    const newEntryId = await habitService.createHabitEntry(id, habitEntry)

    if(!newEntryId){
        throw new AppError("Failed to upload entry", 500)
    }

    return res.status(201).send({ id: newEntryId });
};

export const habitController = {
    getHabit, 
    updateHabit,
    deleteHabit,
    getHabitEntry,
    createHabitEntry
};