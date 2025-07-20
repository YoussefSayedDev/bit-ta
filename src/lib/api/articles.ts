import type { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";

type Article = Database["public"]["Tables"]["articles"]["Row"];
type ArticleInsert = Database["public"]["Tables"]["articles"]["Insert"];
type ArticleUpdate = Database["public"]["Tables"]["articles"]["Update"];

export async function getArticles(filters?: {
  category?: string;
  status?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}) {
  let query = supabase.from("articles").select(`
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

  const { data, error } = await query
    .order("published_at", { ascending: false })
    .range(
      filters?.offset || 0,
      (filters?.offset || 0) + (filters?.limit || 10) - 1
    );

  if (error) throw error;
  return data;
}

export async function getArticleById(id: string) {
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
      *,
      author:users(full_name, avatar_url, bio)
    `
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  // زيادة عدد المشاهدات
  await supabase.rpc("increment_views", {
    table_name: "articles",
    record_id: id,
  });

  return data;
}

export async function createArticle(article: ArticleInsert) {
  const { data, error } = await supabase
    .from("articles")
    .insert(article)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateArticle(id: string, updates: ArticleUpdate) {
  const { data, error } = await supabase
    .from("articles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteArticle(id: string) {
  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) throw error;
}

export async function searchArticles(query: string, limit = 10) {
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
      id, title, excerpt, category, published_at,
      author:users(full_name)
    `
    )
    .eq("status", "منشور")
    .or(
      `title.ilike.%${query}%, excerpt.ilike.%${query}%, content.ilike.%${query}%`
    )
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getPopularArticles(limit = 5) {
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
      id, title, excerpt, views, published_at,
      author:users(full_name, avatar_url)
    `
    )
    .eq("status", "منشور")
    .order("views", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getArticleCategories() {
  const { data, error } = await supabase
    .from("articles")
    .select("category")
    .eq("status", "منشور");

  if (error) throw error;

  const categories = [...new Set(data.map((item) => item.category))];
  return categories;
}
