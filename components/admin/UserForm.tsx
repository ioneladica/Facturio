"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ApiError } from "../../lib/api/httpClient";
import { create, update } from "../../lib/api/users";
import type { UserInput } from "../../types/admin/users";
import FieldError from "../common/FieldError";

type Props = {
  initialValues: Omit<UserInput, "password">;
  userId?: string;
};

type UserErrors = Partial<Record<keyof UserInput, string>>;

export default function UserForm({ initialValues, userId }: Props) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<UserErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValues(initialValues);
    setPassword("");
  }, [initialValues]);

  function setField<K extends keyof Omit<UserInput, "password">>(
    field: K,
    value: Omit<UserInput, "password">[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    setError(null);

    try {
      const input: UserInput = password
        ? { ...values, password }
        : { ...values };
      if (!userId && !password) {
        setErrors({ password: "Parola este obligatorie." });
        return;
      }
      if (password && password.length < 8) {
        setErrors({ password: "Parola trebuie să aibă cel puțin 8 caractere." });
        return;
      }

      if (userId) await update(userId, input);
      else await create(input);
      router.push("/admin/users");
      router.refresh();
    } catch (caughtError) {
      if (caughtError instanceof ApiError) {
        if (caughtError.errors && typeof caughtError.errors === "object") {
          setErrors(caughtError.errors as UserErrors);
        } else if (caughtError.status === 409) {
          setErrors({ email: caughtError.message });
        } else {
          setError(caughtError.message);
        }
      } else {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Utilizatorul nu a putut fi salvat.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="plan-form">
      {error && <p className="field-error" role="alert">{error}</p>}
      <label>Nume<input name="name" value={values.name} onChange={(event) => setField("name", event.target.value)} required /><FieldError error={errors.name} /></label>
      <label>Email<input name="email" type="email" value={values.email} onChange={(event) => setField("email", event.target.value)} required /><FieldError error={errors.email} /></label>
      <label>Rol<select name="role" value={values.role} onChange={(event) => setField("role", event.target.value as "USER" | "ADMIN")}><option value="USER">Utilizator</option><option value="ADMIN">Administrator</option></select><FieldError error={errors.role} /></label>
      <label>Status<select name="status" value={values.status} onChange={(event) => setField("status", event.target.value as "ACTIVE" | "INACTIVE")}><option value="ACTIVE">Activ</option><option value="INACTIVE">Inactiv</option></select><FieldError error={errors.status} /></label>
      <label>Telefon<input name="phone" value={values.phone} onChange={(event) => setField("phone", event.target.value)} /></label>
      <label>Adresă<textarea name="address" value={values.address} onChange={(event) => setField("address", event.target.value)} /></label>
      <label>CUI / Cod fiscal<input name="taxId" value={values.taxId} onChange={(event) => setField("taxId", event.target.value)} /></label>
      <label>
        Parolă
        <input name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required={!userId} />
        {!userId && <span className="muted">Minim 8 caractere.</span>}
        {userId && <span className="muted">Lasă gol ca să nu schimbi parola.</span>}
        <FieldError error={errors.password} />
      </label>
      <div className="form-actions"><button type="submit" disabled={loading}>{loading ? "Se salvează..." : "Salvează"}</button><Link href="/admin/users">Înapoi la utilizatori</Link></div>
    </form>
  );
}
