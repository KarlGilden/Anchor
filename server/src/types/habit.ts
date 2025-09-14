// ==========================
// Habits
// ==========================
export type EntryType = "boolean" | "number";

export interface Habit {
  id: number;
  habit_sheet_id: number;
  name: string;
  description?: string;
  question?: string;
  entry_type: EntryType;
  created_at: Date;
  updated_at: Date;
}

export interface HabitCreate {
  habit_sheet_id: number;
  name: string;
  description?: string;
  question?: string;
  entry_type: EntryType;
  constraint_type: ConstraintType;
  lower_bound: number;
  upper_bound: number | null;
}

// ==========================
// Numeric constraints
// ==========================
export type ConstraintType = "equal" | "less_than" | "more_than" | "between";

export interface HabitNumericConstraint {
  id: number;
  habit_id: number;
  constraint_type: ConstraintType;
  lower_bound: number;
  upper_bound: number | null;
}

// ==========================
// Habit entries
// ==========================
export interface HabitEntry {
  id: number;
  habit_id: number;
  value: number;
  date: Date;
  created_at: Date;
  is_pass: boolean;
}

export interface HabitEntryCreate {
  value?: number;
  is_pass?: boolean
  date: string;
}