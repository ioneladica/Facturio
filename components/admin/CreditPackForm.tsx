"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ApiError } from "../../lib/api/httpClient";
import { create, update } from "../../lib/api/creditPacks";
import type { CreditPackInput } from "../../types/admin/creditPacks";
import CreditPackFields from "./credit-packs/CreditPackFields";
import type { CreditPackErrors } from "./credit-packs/CreditPackFields";

type CreditPackFormProps = {
  initialValues: CreditPackInput;
  packId?: string;
};

export default function CreditPackForm({
  initialValues,
  packId,
}: CreditPackFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<CreditPackInput>(initialValues);
  const [errors, setErrors] = useState<CreditPackErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => setValues(initialValues), [initialValues]);

  function setField<K extends keyof CreditPackInput>(
    field: K,
    value: CreditPackInput[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    setError(null);
    try {
      if (packId) await update(packId, values);
      else await create(values);
      router.push("/admin/credit-packs");
      router.refresh();
    } catch (caughtError) {
      if (caughtError instanceof ApiError) {
        setError(caughtError.status >= 500 ? caughtError.message : null);
        if (caughtError.errors && typeof caughtError.errors === "object") {
          setErrors(caughtError.errors as CreditPackErrors);
        }
      } else {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Pachetul nu a putut fi salvat.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="plan-form" noValidate>
      {error && <p className="field-error" role="alert">{error}</p>}
      <CreditPackFields
        values={values}
        errors={errors}
        setField={setField}
      />
      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? "Se salvează..." : "Salvează"}
        </button>
        <Link href="/admin/credit-packs">Înapoi la listă</Link>
      </div>
    </form>
  );
}
