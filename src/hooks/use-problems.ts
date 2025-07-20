"use client";

import {
  getProblemById,
  getProblems,
  getProblemStats,
} from "@/lib/api/problems";
import type { Database } from "@/lib/database.types";
import { useEffect, useState } from "react";

type Problem = Database["public"]["Tables"]["problems"]["Row"];

export function useProblems(filters?: {
  difficulty?: string;
  category?: string;
  limit?: number;
  offset?: number;
}) {
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProblems() {
    try {
      setLoading(true);
      const data = await getProblems(filters);
      setProblems(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProblems();
  }, [filters]);

  return { problems, loading, error, refetch: fetchProblems };
}

export function useProblem(id: string) {
  const [problem, setProblem] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProblem() {
      if (!id) return;

      try {
        setLoading(true);
        const [problemData, statsData] = await Promise.all([
          getProblemById(id),
          getProblemStats(id),
        ]);
        setProblem(problemData);
        setStats(statsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "حدث خطأ");
      } finally {
        setLoading(false);
      }
    }

    fetchProblem();
  }, [id]);

  return { problem, stats, loading, error };
}
