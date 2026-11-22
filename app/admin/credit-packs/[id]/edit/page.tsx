"use client";

import { use } from "react";
import CreditPackForm from "../../../../../components/admin/CreditPackForm";
import LoadingSpinner from "../../../../../components/common/LoadingSpinner";
import ErrorMessage from "../../../../../components/common/ErrorMessage";
import { useCreditPack } from "../../../../../hooks/useCreditPack";

export default function EditCreditPackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: pack, loading, error } = useCreditPack(id);

  if (loading) return <LoadingSpinner label="Se încarcă pachetul..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!pack) return <ErrorMessage message="Pachetul nu a fost găsit." />;

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="muted">Administrare</p>
          <h1>Editează {pack.name}</h1>
          <p className="muted">
            Actualizează creditele, prețul și disponibilitatea pachetului.
          </p>
        </div>
      </div>
      <CreditPackForm
        packId={id}
        initialValues={{
          name: pack.name,
          description: pack.description,
          credits: pack.credits,
          price: pack.price,
          isActive: pack.isActive,
        }}
      />
    </section>
  );
}
