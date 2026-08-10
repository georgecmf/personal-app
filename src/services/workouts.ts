import { supabase } from "./supabase";

export interface Workout {
  id?: number;
  name: string;
  student_id: number;
  user_id?: string;
}

export async function getWorkouts(
  studentId: number,
  userId: string
) {
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("student_id", studentId)
    .eq("user_id", userId)
    .order("id");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function createWorkout(
  workout: Workout
) {
  const { data, error } = await supabase
    .from("workouts")
    .insert({
      name: workout.name,
      student_id: workout.student_id,
      user_id: workout.user_id,
    })
    .select();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function updateWorkout(
  id: number,
  workout: Workout
) {
  const { data, error } = await supabase
    .from("workouts")
    .update({
      name: workout.name,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function deleteWorkout(
  id: number
) {
  const { error } = await supabase
    .from("workouts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
  }
}

export async function getAllWorkouts(
  userId: string
) {
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getWorkoutsForStudent(
  studentId: number
) {
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("student_id", studentId)
    .order("id");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}