"use client";

import { useCallback, useEffect, useState } from "react";
import { getAll } from "../lib/api/creditPacks";
import type { CreditPack } from "../types/admin/creditPacks";

export function useCreditPacks() {
  const [data, setData] = useState<CreditPack[]>([]);
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
          : "Pachetele de credite nu au putut fi încărcate.",
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
