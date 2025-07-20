import type { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";

type Problem = Database["public"]["Tables"]["problems"]["Row"];
type ProblemInsert = Database["public"]["Tables"]["problems"]["Insert"];
type ProblemUpdate = Database["public"]["Tables"]["problems"]["Update"];

export async function getProblems(filters?: {
  difficulty?: string;
  category?: string;
  status?: string;
  limit?: number;
  offset?: number;
}) {
  let query = supabase.from("problems").select(`
      *,
      created_by:users(full_name),
      solutions_count:solutions(count)
    `);

  if (filters?.difficulty) {
    query = query.eq("difficulty", filters.difficulty);
  }

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }

  if (filters?.status) {
    query = query.eq("status", filters.status);
  } else {
    query = query.eq("status", "منشور");
  }

  const { data, error } = await query
    .order("created_at", { ascending: false })
    .range(
      filters?.offset || 0,
      (filters?.offset || 0) + (filters?.limit || 10) - 1
    );

  if (error) throw error;
  return data;
}

export async function getProblemById(id: string) {
  const { data, error } = await supabase
    .from("problems")
    .select(
      `
      *,
      created_by:users(full_name, avatar_url)
    `
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createProblem(problem: ProblemInsert) {
  const { data, error } = await supabase
    .from("problems")
    .insert(problem)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProblem(id: string, updates: ProblemUpdate) {
  const { data, error } = await supabase
    .from("problems")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProblem(id: string) {
  const { error } = await supabase.from("problems").delete().eq("id", id);

  if (error) throw error;
}

export async function getProblemStats(problemId: string) {
  // عدد الحلول المقبولة
  const { count: acceptedCount, error: acceptedError } = await supabase
    .from("solutions")
    .select("*", { count: "exact", head: true })
    .eq("problem_id", problemId)
    .eq("status", "مقبول");

  if (acceptedError) throw acceptedError;

  // إجمالي المحاولات
  const { count: totalAttempts, error: attemptsError } = await supabase
    .from("solutions")
    .select("*", { count: "exact", head: true })
    .eq("problem_id", problemId);

  if (attemptsError) throw attemptsError;

  return {
    acceptedSolutions: acceptedCount || 0,
    totalAttempts: totalAttempts || 0,
    successRate: totalAttempts
      ? Math.round(((acceptedCount || 0) / totalAttempts) * 100)
      : 0,
  };
}

export async function searchProblems(query: string, limit = 10) {
  const { data, error } = await supabase
    .from("problems")
    .select("id, title, difficulty, category, points")
    .eq("status", "منشور")
    .or(
      `title.ilike.%${query}%, description.ilike.%${query}%, category.ilike.%${query}%`
    )
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getProblemCategories() {
  const { data, error } = await supabase
    .from("problems")
    .select("category")
    .eq("status", "منشور");

  if (error) throw error;

  // استخراج التصنيفات الفريدة
  const categories = [...new Set(data.map((item) => item.category))];
  return categories;
}
