"use client";

import { useCallback, useEffect, useState } from "react";
import { getById } from "../lib/api/plans";
import type { Plan } from "../types/admin/plans";

export function usePlan(id: string) {
  const [data, setData] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      setData(await getById(id));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Planul nu a putut fi încărcat.",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) void reload();
  }, [id, reload]);

  return { data, loading, error, reload };
}
