import { supabase } from "./supabase";

export interface Profile {
  id: string;
  name: string;
  created_at?: string;
}


export async function getProfile(
  userId: string
) {
  const { data, error } =
    await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}


export async function createProfile(
  profile: Profile
) {
  const { data, error } =
    await supabase
      .from("profiles")
      .insert(profile)
      .select()
      .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}


export async function updateProfile(
  id: string,
  name: string
) {
  const { data, error } =
    await supabase
      .from("profiles")
      .update({
        name,
      })
      .eq("id", id)
      .select()
      .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
