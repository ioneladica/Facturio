"use client";

import Link from "next/link";
import { useActionState } from "react";
import { USER_ROLES, USER_STATUSES } from "../../models/UserViewModel";
import type { UserErrors, UserViewModel } from "../../models/UserViewModel";
import type { UserActionState } from "../../app/admin/users/actions";

type Props = {
  initialValues: UserViewModel;
  action: (
    previousState: UserActionState,
    formData: FormData,
  ) => Promise<UserActionState>;
};

function FieldError({ error }: { error: string | undefined }) {
  return error ? <p className="field-error">{error}</p> : null;
}

export default function UserForm({ initialValues, action }: Props) {
  const [state, formAction] = useActionState(action, {
    ok: false,
    errors: {} as UserErrors,
    values: initialValues,
  });
  const values = state.values;

  return (
    <form action={formAction} className="plan-form">
      <label>Nume<input name="name" defaultValue={values.name} required /><FieldError error={state.errors.name} /></label>
      <label>Email<input name="email" type="email" defaultValue={values.email} required /><FieldError error={state.errors.email} /></label>
      <label>Rol<select name="role" defaultValue={values.role}>{USER_ROLES.map((role) => <option key={role} value={role}>{role === "ADMIN" ? "Administrator" : "Utilizator"}</option>)}</select><FieldError error={state.errors.role} /></label>
      <label>Status<select name="status" defaultValue={values.status}>{USER_STATUSES.map((status) => <option key={status} value={status}>{status === "ACTIVE" ? "Activ" : "Inactiv"}</option>)}</select><FieldError error={state.errors.status} /></label>
      <label>Telefon<input name="phone" defaultValue={values.phone} /></label>
      <label>Adresă<textarea name="address" defaultValue={values.address} /></label>
      <label>CUI / Cod fiscal<input name="taxId" defaultValue={values.taxId} /></label>
      <div className="form-actions"><button type="submit">Salvează</button><Link href="/admin/users">Înapoi la utilizatori</Link></div>
    </form>
  );
}
