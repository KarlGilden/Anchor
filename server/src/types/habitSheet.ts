// ==========================
// Habit Sheets
// ==========================
export interface HabitSheet {
  id: number;
  user_id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface HabitSheetInput {
  id: number;
  user_id: number;
  name: string;
  description: string;
}

