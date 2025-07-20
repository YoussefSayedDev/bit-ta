import type { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";

type Friendship = Database["public"]["Tables"]["friendships"]["Row"];

export async function getFriends(userId: string) {
  const { data, error } = await supabase
    .from("friendships")
    .select(
      `
      *,
      friend:users!friendships_friend_id_fkey(id, full_name, avatar_url, points, rank, programming_level)
    `
    )
    .eq("user_id", userId)
    .eq("status", "مقبول")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getFriendRequests(userId: string) {
  const { data, error } = await supabase
    .from("friendships")
    .select(
      `
      *,
      user:users!friendships_user_id_fkey(id, full_name, avatar_url, university)
    `
    )
    .eq("friend_id", userId)
    .eq("status", "معلق")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function sendFriendRequest(userId: string, friendId: string) {
  const { data, error } = await supabase
    .from("friendships")
    .insert({
      user_id: userId,
      friend_id: friendId,
      status: "معلق",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function acceptFriendRequest(requestId: string) {
  const { data, error } = await supabase
    .from("friendships")
    .update({ status: "مقبول" })
    .eq("id", requestId)
    .select()
    .single();

  if (error) throw error;

  // إنشاء صداقة متبادلة
  const { data: friendship } = await supabase
    .from("friendships")
    .select("user_id, friend_id")
    .eq("id", requestId)
    .single();

  if (friendship) {
    await supabase.from("friendships").insert({
      user_id: friendship.friend_id,
      friend_id: friendship.user_id,
      status: "مقبول",
    });
  }

  return data;
}

export async function rejectFriendRequest(requestId: string) {
  const { error } = await supabase
    .from("friendships")
    .update({ status: "مرفوض" })
    .eq("id", requestId);

  if (error) throw error;
}

export async function removeFriend(userId: string, friendId: string) {
  // حذف كلا الاتجاهين من الصداقة
  const { error: error1 } = await supabase
    .from("friendships")
    .delete()
    .eq("user_id", userId)
    .eq("friend_id", friendId);

  const { error: error2 } = await supabase
    .from("friendships")
    .delete()
    .eq("user_id", friendId)
    .eq("friend_id", userId);

  if (error1 || error2) throw error1 || error2;
}

export async function getFriendshipStatus(userId: string, friendId: string) {
  const { data, error } = await supabase
    .from("friendships")
    .select("status")
    .or(
      `and(user_id.eq.${userId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userId})`
    )
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data?.status || null;
}

export async function suggestFriends(userId: string, limit = 10) {
  // البحث عن مستخدمين من نفس الجامعة أو المستوى
  const { data: currentUser } = await supabase
    .from("users")
    .select("university, programming_level")
    .eq("id", userId)
    .single();

  if (!currentUser) return [];

  // الحصول على قائمة الأصدقاء الحاليين
  const { data: currentFriends } = await supabase
    .from("friendships")
    .select("friend_id")
    .eq("user_id", userId);

  const friendIds = currentFriends?.map((f) => f.friend_id) || [];
  friendIds.push(userId); // استبعاد المستخدم نفسه

  let query = supabase
    .from("users")
    .select("id, full_name, avatar_url, university, programming_level, points")
    .not("id", "in", `(${friendIds.join(",")})`);

  if (currentUser.university) {
    query = query.eq("university", currentUser.university);
  }

  const { data, error } = await query.limit(limit);

  if (error) throw error;
  return data || [];
}
