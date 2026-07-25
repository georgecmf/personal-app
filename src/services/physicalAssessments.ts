import { supabase } from "./supabase";

export interface PhysicalAssessment {
  id?: number;

  student_id: number;
  user_id?: string;

  assessment_date: string;

  weight: string;
  body_fat: string;
  muscle_mass: string;

  chest: string;
  waist: string;
  abdomen: string;
  hip: string;

  right_arm: string;
  left_arm: string;

  right_forearm: string;
  left_forearm: string;

  right_thigh: string;
  left_thigh: string;

  right_calf: string;
  left_calf: string;

  observations: string;
}

export async function getAssessments(
  studentId: number,
  userId: string
) {
  const { data, error } = await supabase
    .from("physical_assessments")
    .select("*")
    .eq("student_id", studentId)
    .eq("user_id", userId)
    .order("assessment_date", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function createAssessment(
  assessment: PhysicalAssessment
) {
  const { data, error } = await supabase
    .from("physical_assessments")
    .insert(assessment)
    .select();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function deleteAssessment(id: number) {
  const { error } = await supabase
    .from("physical_assessments")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
  }
}