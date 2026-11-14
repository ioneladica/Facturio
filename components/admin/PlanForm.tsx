"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  BILLING_PERIODS,
} from "../../models/SubscriptionPlanViewModel";
import type {
  SubscriptionPlanErrors,
  SubscriptionPlanViewModel,
} from "../../models/SubscriptionPlanViewModel";
import type { PlanActionState } from "../../app/admin/plans/actions";

type PlanFormProps = {
  initialValues: SubscriptionPlanViewModel;
  action: (
    previousState: PlanActionState,
    formData: FormData,
  ) => Promise<PlanActionState>;
};

function FieldError({ error }: { error: string | undefined }) {
  return error ? <p className="field-error">{error}</p> : null;
}

export default function PlanForm({ initialValues, action }: PlanFormProps) {
  const [state, formAction] = useActionState(action, {
    ok: false,
    errors: {} as SubscriptionPlanErrors,
    values: initialValues,
  });
  const values = state.ok ? initialValues : state.values;

  return (
    <form action={formAction} className="plan-form">
      <label>
        Nume
        <input name="name" defaultValue={values.name} required />
        <FieldError error={state.errors.name} />
      </label>
      <label>
        Descriere
        <textarea name="description" defaultValue={values.description} />
        <FieldError error={state.errors.description} />
      </label>
      <label>
        Preț (RON)
        <input name="price" type="number" step="0.01" min="0" defaultValue={values.price} />
        <FieldError error={state.errors.price} />
      </label>
      <label>
        Perioadă de facturare
        <select name="billingPeriod" defaultValue={values.billingPeriod}>
          {BILLING_PERIODS.map((period) => (
            <option key={period} value={period}>
              {period === "MONTHLY" ? "Lunar" : "Anual"}
            </option>
          ))}
        </select>
        <FieldError error={state.errors.billingPeriod} />
      </label>
      <label>
        Limită facturi
        <input name="invoiceLimit" type="number" min="0" step="1" defaultValue={values.invoiceLimit} />
        <FieldError error={state.errors.invoiceLimit} />
      </label>
      <label className="checkbox-label">
        <input name="isDefault" type="checkbox" defaultChecked={values.isDefault} />
        Plan implicit
      </label>
      <label className="checkbox-label">
        <input name="isActive" type="checkbox" defaultChecked={values.isActive} />
        Activ
      </label>
      <div className="form-actions">
        <button type="submit">Salvează</button>
        <Link href="/admin/plans">Înapoi la listă</Link>
      </div>
    </form>
  );
}
