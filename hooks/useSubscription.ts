"use client";

import { useCallback, useEffect, useState } from "react";
import { getById } from "../lib/api/subscriptions";
import type { Subscription } from "../types/admin/subscriptions";

export function useSubscription(id: string) {
  const [data, setData] = useState<Subscription | null>(null);
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
          : "Abonamentul nu a putut fi încărcat.",
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
