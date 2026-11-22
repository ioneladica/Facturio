"use client";

import { useState } from "react";

type ApiDeleteButtonProps = {
  label: string;
  onDelete: () => Promise<void>;
  onDeleted: () => void | Promise<void>;
};

export default function ApiDeleteButton({
  label,
  onDelete,
  onDeleted,
}: ApiDeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!window.confirm(`Sigur vrei să ștergi ${label}?`)) return;

    setLoading(true);
    setError(null);
    try {
      await onDelete();
      await onDeleted();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Ștergerea a eșuat.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className="delete-button"
        type="button"
        disabled={loading}
        onClick={handleDelete}
      >
        {loading ? "Se șterge..." : "Șterge"}
      </button>
      {error && <p className="field-error" role="alert">{error}</p>}
    </>
  );
}
