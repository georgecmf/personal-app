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

  front_photo?: string;
  side_photo?: string;
  back_photo?: string;
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

export async function updateAssessment(
  id: number,
  assessment: PhysicalAssessment
) {
  const { data, error } = await supabase
    .from("physical_assessments")
    .update({
      assessment_date: assessment.assessment_date,

      weight: assessment.weight,
      body_fat: assessment.body_fat,
      muscle_mass: assessment.muscle_mass,

      chest: assessment.chest,
      waist: assessment.waist,
      abdomen: assessment.abdomen,
      hip: assessment.hip,

      right_arm: assessment.right_arm,
      left_arm: assessment.left_arm,

      right_forearm: assessment.right_forearm,
      left_forearm: assessment.left_forearm,

      right_thigh: assessment.right_thigh,
      left_thigh: assessment.left_thigh,

      right_calf: assessment.right_calf,
      left_calf: assessment.left_calf,

      observations: assessment.observations,

      front_photo: assessment.front_photo,
      side_photo: assessment.side_photo,
      back_photo: assessment.back_photo,
    })
    .eq("id", id)
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

export async function uploadAssessmentPhoto(
  file: File,
  userId: string
) {
  const fileName = `${userId}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("assessment-photos")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    return null;
  }

  const { data } = supabase.storage
    .from("assessment-photos")
    .getPublicUrl(fileName);

  return data.publicUrl;
}