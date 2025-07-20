import type { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";

type News = Database["public"]["Tables"]["news"]["Row"];
type NewsInsert = Database["public"]["Tables"]["news"]["Insert"];
type NewsUpdate = Database["public"]["Tables"]["news"]["Update"];

export async function getNews(filters?: {
  category?: string;
  status?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}) {
  let query = supabase.from("news").select(`
      *,
      author:users(full_name, avatar_url)
    `);

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }

  if (filters?.status) {
    query = query.eq("status", filters.status);
  } else {
    query = query.eq("status", "منشور");
  }

  if (filters?.featured !== undefined) {
    query = query.eq("featured", filters.featured);
  }

  const { data, error } = await query
    .order("published_at", { ascending: false })
    .range(
      filters?.offset || 0,
      (filters?.offset || 0) + (filters?.limit || 10) - 1
    );

  if (error) throw error;
  return data;
}

export async function getNewsById(id: string) {
  const { data, error } = await supabase
    .from("news")
    .select(
      `
      *,
      author:users(full_name, avatar_url)
    `
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  // زيادة عدد المشاهدات
  await supabase.rpc("increment_views", {
    table_name: "news",
    record_id: id,
  });

  return data;
}

export async function createNews(news: NewsInsert) {
  const { data, error } = await supabase
    .from("news")
    .insert(news)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateNews(id: string, updates: NewsUpdate) {
  const { data, error } = await supabase
    .from("news")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteNews(id: string) {
  const { error } = await supabase.from("news").delete().eq("id", id);

  if (error) throw error;
}

export async function getFeaturedNews() {
  const { data, error } = await supabase
    .from("news")
    .select(
      `
      *,
      author:users(full_name, avatar_url)
    `
    )
    .eq("status", "منشور")
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}
