import { supabase } from "./supabase";

export interface Student {
  id?: number;
  name: string;
  goal: string;
  plan: string;
}

export async function getStudents() {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("id", {
      ascending: true,
    });

  if (error) {
    console.error(error);

    return [];
  }

  return data;
}

export async function createStudent(
  student: Student
) {
  const { data, error } =
    await supabase
      .from("students")
      .insert([student])
      .select();

  if (error) {
    console.error(error);

    return null;
  }

  return data;
}

export async function deleteStudent(
  id: number
) {
  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
  }
}
export async function updateStudent(
  id: number,
  student: Student
) {
  const { data, error } =
    await supabase
      .from("students")
      .update(student)
      .eq("id", id)
      .select();

  if (error) {
    console.error(error);

    return null;
  }

  return data;
}