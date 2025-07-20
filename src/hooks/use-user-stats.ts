"use client";

import { useAuth } from "@/contexts/auth-context";
import { getUserStats } from "@/lib/api/users";
import { useEffect, useState } from "react";

export function useUserStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getUserStats(user.id);
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "حدث خطأ");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [user]);

  return { stats, loading, error };
}
