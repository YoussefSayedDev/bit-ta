import type { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";

type User = Database["public"]["Tables"]["users"]["Row"];
type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

export async function getUsers(limit = 10, offset = 0) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

export async function getUserById(id: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw error;
  return data;
}

export async function createUser(user: UserInsert) {
  const { data, error } = await supabase
    .from("users")
    .insert(user)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateUser(id: string, updates: UserUpdate) {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserStats(userId: string) {
  // الحصول على إحصائيات المستخدم
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("points, rank, streak_days")
    .eq("id", userId)
    .single();

  if (userError) throw userError;

  // عدد المسائل المحلولة
  const { count: solvedCount, error: solvedError } = await supabase
    .from("solutions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("status", "مقبول");

  if (solvedError) throw solvedError;

  // عدد الشارات
  const { count: badgesCount, error: badgesError } = await supabase
    .from("user_badges")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (badgesError) throw badgesError;

  return {
    ...user,
    totalSolved: solvedCount || 0,
    badges: badgesCount || 0,
  };
}

export async function getTopUsers(limit = 10) {
  const { data, error } = await supabase
    .from("users")
    .select("id, full_name, avatar_url, points, rank")
    .eq("is_admin", false)
    .order("points", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function searchUsers(query: string, limit = 10) {
  const { data, error } = await supabase
    .from("users")
    .select("id, full_name, email, avatar_url, university, programming_level")
    .or(
      `full_name.ilike.%${query}%, email.ilike.%${query}%, university.ilike.%${query}%`
    )
    .limit(limit);

  if (error) throw error;
  return data;
}
