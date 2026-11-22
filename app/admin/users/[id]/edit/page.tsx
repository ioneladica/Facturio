"use client";

import { use } from "react";
import UserForm from "../../../../../components/admin/UserForm";
import LoadingSpinner from "../../../../../components/common/LoadingSpinner";
import ErrorMessage from "../../../../../components/common/ErrorMessage";
import { useUser } from "../../../../../hooks/useUser";

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: user, loading, error } = useUser(id);
  if (loading) return <LoadingSpinner label="Se încarcă utilizatorul..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <ErrorMessage message="Utilizatorul nu a fost găsit." />;
  return (
    <section>
      <div className="page-header">
        <div><p className="muted">Administrare</p><h1>Editează {user.name}</h1></div>
      </div>
      <UserForm userId={id} initialValues={{
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        phone: user.phone,
        address: user.address,
        taxId: user.taxId,
      }} />
    </section>
  );
}
