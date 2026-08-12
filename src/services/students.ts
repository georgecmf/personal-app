import { supabase } from "./supabase";

export interface Student {
  id?: number;
  name: string;
  goal: string;
  attendance_type: string;

  phone: string;
  email: string;
  birth_date: string;
  gender: string;
  height: string;
  weight: string;
  notes: string;
  photo_url?: string;

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
      attendance_type: student.attendance_type,

      phone: student.phone,
      email: student.email,
      birth_date: student.birth_date,
      gender: student.gender,
      height: student.height,
      weight: student.weight,
      notes: student.notes,

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
      .update({
        name: student.name,
        goal: student.goal,
        attendance_type: student.attendance_type,

        phone: student.phone,
        email: student.email,
        birth_date: student.birth_date,
        gender: student.gender,
        height: student.height,
        weight: student.weight,
        notes: student.notes,
        photo_url: student.photo_url,
      })
      .eq("id", id)
      .select();

  if (error) {
    console.error(error);

    return null;
  }

  return data;
}

export async function getStudentById(
  id: number,
  userId: string
) {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function uploadStudentPhoto(
  file: File,
  studentId: number,
  userId: string
) {
  const fileExt = file.name.split(".").pop();

  const fileName = `${userId}/${studentId}.${fileExt}`;

  const { error } = await supabase.storage
    .from("students")
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) {
    console.error(error);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("students")
    .getPublicUrl(fileName);

  return publicUrl;
}

export function generateStudentAccessCode(): string {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "";

  for (let i = 0; i < 6; i++) {
    const index = Math.floor(
      Math.random() * characters.length
    );

    code += characters[index];
  }

  return `ALU-${code}`;
}

export async function createStudentAccess(
  studentId: number,
  userId: string
) {
  const accessCode = generateStudentAccessCode();

  const { data, error } = await supabase
    .from("student_accounts")
    .insert({
      student_id: studentId,
      user_id: userId,
      access_code: accessCode,
      activated: false,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getStudentAccountByCode(
  accessCode: string
) {
  const { data, error } = await supabase
    .from("student_accounts")
    .select("*")
    .eq("access_code", accessCode)
    .maybeSingle();

  if (error) {
    console.error("ERRO AO BUSCAR CÓDIGO:", error);
    return null;
  }

  return data;
}


export async function getStudentByIdForStudent(
  id: number
) {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function getStudentByAccessCode(
  accessCode: string
) {
  const { data, error } = await supabase.rpc(
    "get_student_by_access_code",
    {
      p_access_code: accessCode,
    }
  );

  if (error) {
    console.error(error);
    return null;
  }

  return data?.[0] ?? null;
}