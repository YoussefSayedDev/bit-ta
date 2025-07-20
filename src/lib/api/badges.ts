import type { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";

type Badge = Database["public"]["Tables"]["badges"]["Row"];
type BadgeInsert = Database["public"]["Tables"]["badges"]["Insert"];
type UserBadge = Database["public"]["Tables"]["user_badges"]["Row"];

export async function getBadges() {
  const { data, error } = await supabase
    .from("badges")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getBadgeById(id: string) {
  const { data, error } = await supabase
    .from("badges")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createBadge(badge: BadgeInsert) {
  const { data, error } = await supabase
    .from("badges")
    .insert(badge)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserBadges(userId: string) {
  const { data, error } = await supabase
    .from("user_badges")
    .select(
      `
      *,
      badge:badges(*)
    `
    )
    .eq("user_id", userId)
    .order("earned_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getUserBadgeProgress(userId: string) {
  // الحصول على جميع الشارات
  const allBadges = await getBadges();

  // الحصول على شارات المستخدم
  const userBadges = await getUserBadges(userId);
  const earnedBadgeIds = userBadges.map((ub) => ub.badge_id);

  // الحصول على إحصائيات المستخدم
  const { data: userStats, error: statsError } = await supabase
    .from("users")
    .select("streak_days")
    .eq("id", userId)
    .single();

  if (statsError) throw statsError;

  // عدد المسائل المحلولة
  const { count: solvedCount, error: solvedError } = await supabase
    .from("solutions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("status", "مقبول");

  if (solvedError) throw solvedError;

  // حساب التقدم لكل شارة
  const badgeProgress = allBadges.map((badge) => {
    const isEarned = earnedBadgeIds.includes(badge.id);
    let progress = 0;
    let total = 1;

    if (!isEarned) {
      if (badge.condition_type === "problems_solved") {
        const required = badge.condition_value.min;
        progress = Math.min(solvedCount || 0, required);
        total = required;
      } else if (badge.condition_type === "streak_days") {
        const required = badge.condition_value.min;
        progress = Math.min(userStats.streak_days || 0, required);
        total = required;
      }
    } else {
      progress = total = 1;
    }

    return {
      ...badge,
      isEarned,
      progress,
      total,
      progressPercentage: Math.round((progress / total) * 100),
    };
  });

  return badgeProgress;
}

export async function awardBadge(userId: string, badgeId: string) {
  const { data, error } = await supabase
    .from("user_badges")
    .insert({
      user_id: userId,
      badge_id: badgeId,
    })
    .select(
      `
      *,
      badge:badges(*)
    `
    )
    .single();

  if (error) throw error;
  return data;
}

export async function checkAndAwardBadges(userId: string) {
  const { error } = await supabase.rpc("check_badge_eligibility", {
    user_uuid: userId,
  });

  if (error) throw error;
}
