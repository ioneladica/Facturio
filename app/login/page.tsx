"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand">Facturio<span>.</span></div>
        <p className="eyebrow">ZONĂ ADMINISTRATOR</p>
        <h1>Autentificare</h1>
        <p className="muted">Intră în panoul de administrare Facturio.</p>
        <form action={formAction} className="plan-form auth-form">
          <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          <label>Parolă<input name="password" type="password" autoComplete="current-password" required /></label>
          {state.error && <p className="field-error">{state.error}</p>}
          <button type="submit" disabled={pending}>{pending ? "Se verifică..." : "Intră în cont"}</button>
        </form>
        <a href="/">← Înapoi la pagina principală</a>
      </section>
    </main>
  );
}
