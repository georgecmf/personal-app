import { supabase } from "./supabase";

export interface Exercise {
  id?: number;
  name: string;
  workout_id: number;
  series: number;
  reps: string;
  weight: string;
  rest: string;
  notes: string;
  user_id?: string;
}

export async function getExercises(
  workoutId: number,
  userId: string
) {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("workout_id", workoutId)
    .eq("user_id", userId)
    .order("id");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function createExercise(
  exercise: Exercise
) {
  console.log("=== CREATE EXERCISE ===");
  console.log(exercise);

  const { data, error } = await supabase
    .from("exercises")
    .insert(exercise)
    .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    alert(error.message);
    return null;
  }

  return data;
}

export async function updateExercise(
  id: number,
  exercise: Exercise
) {
  const { data, error } = await supabase
    .from("exercises")
    .update(exercise)
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function deleteExercise(
  id: number
) {
  const { error } = await supabase
    .from("exercises")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
  }
}

export async function getAllExercises(
  userId: string
) {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getExercisesForStudent(
  workoutId: number
) {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("workout_id", workoutId)
    .order("id");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}