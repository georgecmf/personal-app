import { supabase } from "./supabase";

export interface Student {
  id?: number;
  name: string;
  goal: string;
  plan: string;
  user_id?: string;
}

export async function getStudents(
  userId: string
) {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("user_id", userId)
    .order("id",);

  if (error) {
    console.error(error);

    return [];
  }

  return data;
}

export async function createStudent(student: Student) {
  console.log("=== CREATE STUDENT ===");
  console.log(student);

  const { data, error } = await supabase
    .from("students")
    .insert({
      name: student.name,
      goal: student.goal,
      plan: student.plan,
      user_id: student.user_id,
    })
    .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    alert(error.message);
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