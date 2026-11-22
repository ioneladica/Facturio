"use client";

import Link from "next/link";
import LoadingSpinner from "../../common/LoadingSpinner";
import ErrorMessage from "../../common/ErrorMessage";
import { useCreditPack } from "../../../hooks/useCreditPack";

type CreditPackDetailsProps = {
  id: string;
};

export default function CreditPackDetails({ id }: CreditPackDetailsProps) {
  const { data: pack, loading, error } = useCreditPack(id);

  if (loading) return <LoadingSpinner label="Se încarcă pachetul..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!pack) return <ErrorMessage message="Pachetul nu a fost găsit." />;

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="muted">Pachet de credite</p>
          <h1>{pack.name}</h1>
        </div>
        <span className={`badge ${pack.isActive ? "badge-active" : "badge-inactive"}`}>
          {pack.isActive ? "Activ" : "Inactiv"}
        </span>
      </div>
      <div className="details-card">
        <dl>
          <dt>Descriere</dt>
          <dd>{pack.description || "-"}</dd>
          <dt>Credite</dt>
          <dd>{pack.credits}</dd>
          <dt>Preț</dt>
          <dd>{pack.price.toFixed(2)} RON</dd>
          <dt>Activ</dt>
          <dd>{pack.isActive ? "Da" : "Nu"}</dd>
        </dl>
        <div className="details-actions">
          <Link className="button" href={`/admin/credit-packs/${pack.id}/edit`}>
            Edit
          </Link>
          <Link className="button button-secondary" href="/admin/credit-packs">
            Back to List
          </Link>
        </div>
      </div>
    </section>
  );
}
