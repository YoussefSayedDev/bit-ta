import { supabase } from "@/lib/supabase";
import { createUser, getUserById } from "./users";

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  university?: string;
  major?: string;
  academicYear?: string;
  programmingLevel?: string;
  bio?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Helper to ensure a user row exists in the database
export async function createUserIfNotExists(user: {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  university?: string;
  major?: string;
  academic_year?: string;
  programming_level?: string;
  bio?: string;
}) {
  // Check if user already exists
  const existing = await getUserById(user.id).catch(() => null);
  if (existing) return existing;
  // Create user if not exists
  return createUser({
    id: user.id,
    email: user.email,
    full_name: user.full_name || "",
    phone: user.phone || null,
    university: user.university || null,
    major: user.major || null,
    academic_year: user.academic_year || null,
    programming_level: user.programming_level || "مبتدئ",
    bio: user.bio || null,
  });
}

export async function signUp(data: SignUpData) {
  // إنشاء حساب المصادقة
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (authError) throw authError;

  let userProfile = null;
  if (authData.user) {
    // Ensure user row exists in DB
    userProfile = await createUserIfNotExists({
      id: authData.user.id,
      email: data.email,
      full_name: data.fullName,
      phone: data.phone,
      university: data.university,
      major: data.major,
      academic_year: data.academicYear,
      programming_level: data.programmingLevel,
      bio: data.bio,
    });
  }

  return { user: authData.user, profile: userProfile };
}

export async function signIn(data: SignInData) {
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) throw error;
  return authData;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) return null;
    return user;
  } catch {
    return null;
  }
}

export async function getCurrentUserProfile() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) return null;
  return data;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
}

export async function signInWithProvider(provider: "google" | "facebook") {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        response_type: "code",
      },
    },
  });

  if (error) throw error;
  return data;
}
