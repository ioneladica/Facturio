"use client";

import { useCallback, useEffect, useState } from "react";
import { getAll } from "../lib/api/subscriptions";
import type { Subscription } from "../types/admin/subscriptions";

export function useSubscriptions() {
  const [data, setData] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await getAll());
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Abonamentele nu au putut fi încărcate.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { data, loading, error, reload };
}
