"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import { SUBSCRIPTION_STATUSES } from "../../models/UserSubscriptionViewModel";
import type { SubscriptionActionState } from "../../app/admin/subscriptions/actions";
import type { UserSubscriptionErrors, UserSubscriptionViewModel } from "../../models/UserSubscriptionViewModel";
import { calculateSubscriptionEndDate } from "../../models/UserSubscriptionViewModel";

type Props = {
  users: Array<{ id: string; name: string }>;
  plans: Array<{ id: string; name: string; billingPeriod: string }>;
  initialValues?: UserSubscriptionViewModel;
  action: (previousState: SubscriptionActionState, formData: FormData) => Promise<SubscriptionActionState>;
};

function FieldError({ error }: { error?: string }) {
  return error ? <p className="field-error">{error}</p> : null;
}

export default function SubscriptionForm({ users, plans, initialValues, action }: Props) {
  const defaultValues = initialValues ?? {
    userId: "", userName: "", planId: "", planName: "", status: "ACTIVE" as const, startDate: "", endDate: "",
  };
  const [state, formAction] = useActionState(action, {
    ok: false,
    errors: {} as UserSubscriptionErrors,
    values: defaultValues,
  });
  const values = state.values;
  const [startDate, setStartDate] = useState(values.startDate);
  const [planId, setPlanId] = useState(values.planId);
  const endDate = useMemo(() => {
    const plan = plans.find((item) => item.id === planId);
    return plan && startDate
      ? calculateSubscriptionEndDate(startDate, plan.billingPeriod)
      : "";
  }, [planId, plans, startDate]);
  return (
    <form action={formAction} className="plan-form">
      <label>Utilizator<select name="userId" defaultValue={values.userId}><option value="">Selectează utilizatorul</option>{users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}</select><FieldError error={state.errors.userId} /></label>
      <label>Plan<select name="planId" defaultValue={values.planId} onChange={(event) => setPlanId(event.target.value)}><option value="">Selectează planul</option>{plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.name} ({plan.billingPeriod === "YEARLY" ? "anual" : "lunar"})</option>)}</select><FieldError error={state.errors.planId} /></label>
      <label>Status<select name="status" defaultValue={values.status}>{SUBSCRIPTION_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}</select><FieldError error={state.errors.status} /></label>
      <label>Data început<input name="startDate" type="datetime-local" defaultValue={values.startDate} onChange={(event) => setStartDate(event.target.value)} /><FieldError error={state.errors.startDate} /></label>
      <label>Data sfârșit calculată<input type="datetime-local" value={endDate} readOnly /><span className="muted">Calculată automat în funcție de perioada planului.</span><FieldError error={state.errors.endDate} /></label>
      <div className="form-actions"><button type="submit">Salvează</button><Link href="/admin/subscriptions">Înapoi la listă</Link></div>
    </form>
  );
}
