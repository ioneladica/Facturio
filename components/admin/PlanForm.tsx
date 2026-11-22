"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ApiError } from "../../lib/api/httpClient";
import { create, update } from "../../lib/api/plans";
import type { PlanInput } from "../../types/admin/plans";
import FieldError from "../common/FieldError";

type PlanFormProps = {
  initialValues: PlanInput;
  planId?: string;
};

type PlanErrors = Partial<Record<keyof PlanInput, string>>;

export default function PlanForm({ initialValues, planId }: PlanFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<PlanInput>(initialValues);
  const [errors, setErrors] = useState<PlanErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  function setField<K extends keyof PlanInput>(field: K, value: PlanInput[K]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    setError(null);

    try {
      if (planId) {
        await update(planId, values);
      } else {
        await create(values);
      }
      router.push("/admin/plans");
      router.refresh();
    } catch (caughtError) {
      if (caughtError instanceof ApiError) {
        setError(caughtError.status >= 500 ? caughtError.message : null);
        if (caughtError.errors && typeof caughtError.errors === "object") {
          setErrors(caughtError.errors as PlanErrors);
        }
      } else {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Planul nu a putut fi salvat.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="plan-form">
      {error && <p className="field-error" role="alert">{error}</p>}
      <label>
        Nume
        <input
          name="name"
          value={values.name}
          onChange={(event) => setField("name", event.target.value)}
          required
        />
        <FieldError error={errors.name} />
      </label>
      <label>
        Descriere
        <textarea
          name="description"
          value={values.description}
          onChange={(event) => setField("description", event.target.value)}
        />
        <FieldError error={errors.description} />
      </label>
      <label>
        Preț (RON)
        <input
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={values.price}
          onChange={(event) => setField("price", Number(event.target.value))}
        />
        <FieldError error={errors.price} />
      </label>
      <label>
        Perioadă de facturare
        <select
          name="billingPeriod"
          value={values.billingPeriod}
          onChange={(event) => setField("billingPeriod", event.target.value as PlanInput["billingPeriod"])}
        >
          <option value="MONTHLY">Lunar</option>
          <option value="YEARLY">Anual</option>
        </select>
        <FieldError error={errors.billingPeriod} />
      </label>
      <label>
        Limită facturi
        <input
          name="invoiceLimit"
          type="number"
          min="0"
          step="1"
          value={values.invoiceLimit}
          onChange={(event) => setField("invoiceLimit", Number(event.target.value))}
        />
        <FieldError error={errors.invoiceLimit} />
      </label>
      <label className="checkbox-label">
        <input
          name="isDefault"
          type="checkbox"
          checked={values.isDefault}
          onChange={(event) => setField("isDefault", event.target.checked)}
        />
        Plan implicit
      </label>
      <label className="checkbox-label">
        <input
          name="isActive"
          type="checkbox"
          checked={values.isActive}
          onChange={(event) => setField("isActive", event.target.checked)}
        />
        Activ
      </label>
      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? "Se salvează..." : "Salvează"}
        </button>
        <Link href="/admin/plans">Înapoi la listă</Link>
      </div>
    </form>
  );
}
