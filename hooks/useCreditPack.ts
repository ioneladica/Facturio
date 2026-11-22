"use client";

import { useCallback, useEffect, useState } from "react";
import { getById } from "../lib/api/creditPacks";
import type { CreditPack } from "../types/admin/creditPacks";

export function useCreditPack(id: string) {
  const [data, setData] = useState<CreditPack | null>(null);
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
          : "Pachetul de credite nu a putut fi încărcat.",
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
