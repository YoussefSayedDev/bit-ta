import type { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";

type Solution = Database["public"]["Tables"]["solutions"]["Row"];
type SolutionInsert = Database["public"]["Tables"]["solutions"]["Insert"];
type SolutionUpdate = Database["public"]["Tables"]["solutions"]["Update"];

export async function submitSolution(solution: SolutionInsert) {
  const { data, error } = await supabase
    .from("solutions")
    .insert(solution)
    .select(
      `
      *,
      problem:problems(title, points),
      user:users(full_name)
    `
    )
    .single();

  if (error) throw error;
  return data;
}

export async function getUserSolutions(userId: string, limit = 10, offset = 0) {
  const { data, error } = await supabase
    .from("solutions")
    .select(
      `
      *,
      problem:problems(title, difficulty, points)
    `
    )
    .eq("user_id", userId)
    .order("submitted_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

export async function getProblemSolutions(
  problemId: string,
  limit = 10,
  offset = 0
) {
  const { data, error } = await supabase
    .from("solutions")
    .select(
      `
      *,
      user:users(full_name, avatar_url)
    `
    )
    .eq("problem_id", problemId)
    .eq("status", "مقبول")
    .order("submitted_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

export async function getSolutionById(id: string) {
  const { data, error } = await supabase
    .from("solutions")
    .select(
      `
      *,
      problem:problems(title, description, sample_input, sample_output),
      user:users(full_name, avatar_url)
    `
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateSolutionStatus(
  id: string,
  status: Solution["status"],
  executionTime?: number,
  memoryUsed?: number
) {
  const updates: SolutionUpdate = { status };

  if (executionTime !== undefined) {
    updates.execution_time = executionTime;
  }

  if (memoryUsed !== undefined) {
    updates.memory_used = memoryUsed;
  }

  const { data, error } = await supabase
    .from("solutions")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getRecentSolutions(limit = 10) {
  const { data, error } = await supabase
    .from("solutions")
    .select(
      `
      *,
      problem:problems(title, difficulty),
      user:users(full_name, avatar_url)
    `
    )
    .eq("status", "مقبول")
    .order("submitted_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getUserSolutionForProblem(
  userId: string,
  problemId: string
) {
  const { data, error } = await supabase
    .from("solutions")
    .select("*")
    .eq("user_id", userId)
    .eq("problem_id", problemId)
    .eq("status", "مقبول")
    .order("submitted_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}
