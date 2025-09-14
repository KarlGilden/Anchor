import { db } from "../data/db";
import { AppError } from "../types/error";
import { Habit, HabitCreate, HabitEntry, HabitEntryCreate, HabitNumericConstraint } from "../types/habit";

const createHabitEntry = async (habitId: string, entry: HabitEntryCreate) => {
    const habit = await getHabitWithConstraints(habitId);

    if(!habit) {
        throw new AppError("Habit not found", 404);
    }

    if(habit.constraint_type === "between" && !habit.upper_bound){
        throw new AppError("Invalid entry for between constraint", 400);
    }

    const passedConstraint = checkConstraint(habit, entry);

    const [insertedId] = await db<HabitEntry>("habit_entries").insert({
        habit_id: Number(habitId),
        is_pass: passedConstraint,
        value: entry.value,
        date: new Date(entry.date)
    });

    return insertedId;
};

const getHabitConstraint = async (id: string) => {
    const constraint = await db("habit_numeric_constraints")
        .where("habit_id", id)
        .first();
    
    return constraint;
}

const getHabit = async (id: string) => {
    try{
        const constraint = await db("habits")
            .where("id", id)
            .first();
        
        return constraint;
    }catch(error) {
        console.log(error);
        return new AppError("Failed to get habit", 500)
    }
}

const getHabitWithConstraints = async (id: string) => {
    try{
        const habit = await db<HabitCreate>("habits")
            .leftJoin(
                "habit_numeric_constraints", 
                "habits.id", 
                "habit_numeric_constraints.habit_id"
            )
            .where("habits.id", id)
            .select(
                "habits.id as habit_id",
                "habits.name",
                "habits.description",
                "habits.question",
                "habits.entry_type",
                "habits.created_at",
                "habit_numeric_constraints.id as constraint_id",
                "habit_numeric_constraints.constraint_type",
                "habit_numeric_constraints.lower_bound",
                "habit_numeric_constraints.upper_bound"
            )
            .first();
        
        return habit as HabitCreate;
    }catch(error) {
        console.log(error);
        throw new AppError("Failed to get habit", 500)
    }
}

const deleteHabit = async (id: string) => {
    try{
        const habitId = await db("habits")
            .where("id", id)
            .delete();

        
        return habitId;
    }catch(error) {
        console.log(error);
        return new AppError("Failed to delete habit", 500)
    }
}

const checkConstraint = (habit: HabitCreate, entry: HabitEntryCreate) => {

    if(habit.entry_type === "boolean"){
        return !!entry.value;
    }else{
        if(!entry.value && entry.value !== 0) return false;

        switch(habit.constraint_type){
            case "equal":
                return entry.value === habit.lower_bound;

            case "less_than":
                return entry.value < habit.lower_bound;

            case "more_than":
                return entry.value > habit.lower_bound;
                
            case "between":
                if(!habit.upper_bound) return false;
                return entry.value > habit.lower_bound && entry.value < habit.upper_bound;
            default: 
                return false;
        }
    }
}

export const habitService = {
    getHabitWithConstraints,
    createHabitEntry
}