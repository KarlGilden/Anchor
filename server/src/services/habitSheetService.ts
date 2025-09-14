import { db } from '../data/db'
import { AppError } from '../types/error';
import { Habit, HabitCreate, HabitNumericConstraint } from '../types/habit';
import { HabitSheet, HabitSheetInput } from '../types/habitSheet';

const getAllHabitSheets = async (userId: number) => {
    try{
        const habitSheets = await db<HabitSheet>("habit_sheets")
            .where("user_id", userId)
        return habitSheets;
    }catch (error){
        console.log(error);
        throw new AppError("Failed to fetch habit sheets", 500);
    }
}

const getHabitSheetById = async (id: string) => {
    try{
        const habitSheet = await db<HabitSheet>("habit_sheets")
            .where("id", id)
            .first();

        return habitSheet;
    }catch (error){
        console.log(error);
        throw new AppError("Failed to fetch habit sheet", 500);
    }
}

const createHabitSheet = async ({name, description}: HabitSheetInput, userId: number) => {
    try{
        const [sheet] = await db<HabitSheet>("habit_sheets")
            .insert(
            {
                user_id: userId,
                name,
                description,
            },
            ["id"] // MySQL 8+ supports returning columns, otherwise fallback below
        );

        console.log("returned: ", sheet)

        return sheet;
    }catch (error){
        console.log("Error: ", error);
        throw new AppError("Failed to create Habit Sheet", 500);
    }

}

const updateHabitSheet = async (id: string, name: string, description: string) => {
    try{
        const updatedCount = await db<HabitSheet>("habit_sheets")
            .where("id", id)
            .update(
                {
                ...(name ? { name } : {}),
                ...(description ? { description } : {}),
                updated_at: db.fn.now(), // auto-update timestamp
                }
      );

      return updatedCount;
    }catch (error){
        console.log(error);
        throw new AppError("Failed to update habit sheet", 500);
    }
};

const deleteHabitSheet = async (id: string) => {
    try{
        const deletedCount = await db("habit_sheets")
            .where("id", id)
            .delete();

      return deletedCount;
    }catch (error){
        console.log(error);
        throw new AppError("Failed to delete habit sheet", 500);
    }
};

const createHabit = async (habit: HabitCreate, sheetId: string, userId: number) => {
    try{
        const result = await db.transaction(async (trx) => {
            const [habitId] = await trx<Habit>("habits")
                .insert({
                    habit_sheet_id: Number(sheetId),
                    name: habit.name,
                    description: habit.description,
                    entry_type: habit.entry_type,
                    question: habit.question
            });

            if(habit.entry_type === "number"){
                const [constraintId] = await trx<HabitNumericConstraint>("habit_numeric_constraints")
                    .insert({
                        habit_id: habitId,
                        constraint_type: habit.constraint_type,
                        lower_bound: habit.lower_bound,
                        upper_bound: habit.upper_bound
                    });

                return {habitId, constraintId}
            }

            return {habitId, constraintId: undefined};
        });

        return result;
    }catch (error){
        console.log(error);
        throw new AppError("Failed to create habit", 500);
    }
};

const getAllHabits = async (sheetId: string) => {
    try{
        const habits = await db<HabitSheet[]>("habits")
            .select("*")
            .where("habit_sheet_id", sheetId)

        return habits;
    }catch (error){
        console.log(error);
        throw new AppError("Failed to create habit", 500);
    }
};

export const habitSheetService = {
    getAllHabitSheets,
    getHabitSheetById,
    createHabitSheet,
    updateHabitSheet,
    deleteHabitSheet,
    createHabit,
    getAllHabits
};