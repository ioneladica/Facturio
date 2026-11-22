"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { ApiError } from "../../lib/api/httpClient";
import { create, update } from "../../lib/api/subscriptions";
import { useUsers } from "../../hooks/useUsers";
import { usePlans } from "../../hooks/usePlans";
import type {
  SubscriptionInput,
} from "../../types/admin/subscriptions";
import { calculateSubscriptionEndDate } from "../../models/UserSubscriptionViewModel";
import SubscriptionFields from "./subscriptions/SubscriptionFields";
import type { SubscriptionErrors } from "./subscriptions/SubscriptionFields";

type Props = {
  initialValues?: SubscriptionInput;
  subscriptionId?: string;
};

export default function SubscriptionForm({
  initialValues,
  subscriptionId,
}: Props) {
  const router = useRouter();
  const { data: users, loading: usersLoading, error: usersError } = useUsers();
  const { data: plans, loading: plansLoading, error: plansError } = usePlans();
  const [values, setValues] = useState<SubscriptionInput>(
    initialValues ?? {
      userId: "",
      planId: "",
      status: "ACTIVE",
      startDate: "",
    },
  );
  const [errors, setErrors] = useState<SubscriptionErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialValues) setValues(initialValues);
  }, [initialValues]);

  const endDate = useMemo(() => {
    const plan = plans.find((item) => item.id === values.planId);
    return plan && values.startDate
      ? calculateSubscriptionEndDate(values.startDate, plan.billingPeriod)
      : "";
  }, [plans, values.planId, values.startDate]);

  function setField<K extends keyof SubscriptionInput>(
    field: K,
    value: SubscriptionInput[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    setError(null);
    try {
      if (subscriptionId) await update(subscriptionId, values);
      else await create(values);
      router.push("/admin/subscriptions");
      router.refresh();
    } catch (caughtError) {
      if (caughtError instanceof ApiError) {
        if (caughtError.status === 400 && caughtError.errors &&
            typeof caughtError.errors === "object") {
          setErrors(caughtError.errors as SubscriptionErrors);
        } else {
          setError(caughtError.message);
        }
      } else {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Abonamentul nu a putut fi salvat.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  if (usersLoading || plansLoading) {
    return <p className="muted" role="status">Se încarcă opțiunile...</p>;
  }
  if (usersError) return <p className="field-error" role="alert">{usersError}</p>;
  if (plansError) return <p className="field-error" role="alert">{plansError}</p>;

  return (
    <form onSubmit={handleSubmit} className="plan-form">
      {error && <p className="field-error" role="alert">{error}</p>}
      <SubscriptionFields
        values={values}
        errors={errors}
        users={users}
        plans={plans}
        endDate={endDate}
        setField={setField}
      />
      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? "Se salvează..." : "Salvează"}
        </button>
        <Link href="/admin/subscriptions">Înapoi la listă</Link>
      </div>
    </form>
  );
}
