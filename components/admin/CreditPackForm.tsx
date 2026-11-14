"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { CreditPackActionState } from "../../app/admin/credit-packs/actions";
import type {
  CreditPackErrors,
  CreditPackViewModel,
} from "../../models/CreditPackViewModel";

type CreditPackFormProps = {
  initialValues: CreditPackViewModel;
  action: (
    previousState: CreditPackActionState,
    formData: FormData,
  ) => Promise<CreditPackActionState>;
};

function FieldError({ error }: { error: string | undefined }) {
  return error ? <p className="field-error">{error}</p> : null;
}

export default function CreditPackForm({
  initialValues,
  action,
}: CreditPackFormProps) {
  const [state, formAction] = useActionState(action, {
    ok: false,
    errors: {} as CreditPackErrors,
    values: initialValues,
  });
  const values = state.ok ? initialValues : state.values;

  return (
    <form action={formAction} className="plan-form" noValidate>
      <label>
        Nume
        <input name="name" type="text" defaultValue={values.name} />
        <FieldError error={state.errors.name} />
      </label>
      <label>
        Descriere
        <textarea name="description" defaultValue={values.description} />
        <FieldError error={state.errors.description} />
      </label>
      <label>
        Credite
        <input
          name="credits"
          type="number"
          step="1"
          min="0"
          defaultValue={values.credits}
        />
        <FieldError error={state.errors.credits} />
      </label>
      <label>
        Preț (RON)
        <input
          name="price"
          type="number"
          step="0.01"
          min="0"
          defaultValue={values.price}
        />
        <FieldError error={state.errors.price} />
      </label>
      <label className="checkbox-label">
        <input
          name="isActive"
          type="checkbox"
          defaultChecked={values.isActive}
        />
        Activ
      </label>
      <div className="form-actions">
        <button type="submit">Salvează</button>
        <Link href="/admin/credit-packs">Înapoi la listă</Link>
      </div>
    </form>
  );
}
