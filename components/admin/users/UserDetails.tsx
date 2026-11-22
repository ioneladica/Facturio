"use client";

import Link from "next/link";
import LoadingSpinner from "../../common/LoadingSpinner";
import ErrorMessage from "../../common/ErrorMessage";
import { useUser } from "../../../hooks/useUser";

type UserDetailsProps = {
  id: string;
};

export default function UserDetails({ id }: UserDetailsProps) {
  const { data: user, loading, error } = useUser(id);

  if (loading) return <LoadingSpinner label="Se încarcă utilizatorul..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <ErrorMessage message="Utilizatorul nu a fost găsit." />;

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="muted">Utilizator</p>
          <h1>{user.name}</h1>
        </div>
      </div>
      <div className="details-card">
        <dl>
          <dt>Email</dt>
          <dd>{user.email}</dd>
          <dt>Rol</dt>
          <dd>{user.role === "ADMIN" ? "Administrator" : "Utilizator"}</dd>
          <dt>Status</dt>
          <dd>{user.status === "ACTIVE" ? "Activ" : "Inactiv"}</dd>
          <dt>Telefon</dt>
          <dd>{user.phone || "-"}</dd>
          <dt>Adresă</dt>
          <dd>{user.address || "-"}</dd>
          <dt>CUI / Cod fiscal</dt>
          <dd>{user.taxId || "-"}</dd>
        </dl>
        <div className="details-actions">
          <Link className="button" href={`/admin/users/${user.id}/edit`}>
            Editează
          </Link>
          <Link className="button button-secondary" href="/admin/users">
            Înapoi la listă
          </Link>
        </div>
      </div>
    </section>
  );
}
