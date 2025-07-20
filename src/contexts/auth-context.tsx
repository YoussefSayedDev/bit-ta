"use client";

import { getCurrentUser, getCurrentUserProfile, createUserIfNotExists } from "@/lib/api/auth";
import { createUser } from "@/lib/api/users";
import type { Database } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type UserProfile = Database["public"]["Tables"]["users"]["Row"];

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    if (!user) {
      setProfile(null);
      return;
    }
    try {
      let userProfile = await getCurrentUserProfile();
      if (!userProfile) {
        // User just signed in and doesn't exist in DB, create them
        const { email, id, user_metadata } = user;
        userProfile = await createUserIfNotExists({
          id,
          email: email || "",
          full_name: user_metadata?.full_name || user_metadata?.name || "",
        });
      }
      setProfile(userProfile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    // الحصول على المستخدم الحالي
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        refreshProfile();
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    // الاستماع لتغييرات المصادقة
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await refreshProfile();
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, signOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
