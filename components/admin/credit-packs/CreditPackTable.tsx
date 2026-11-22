"use client";

import Link from "next/link";
import LoadingSpinner from "../../common/LoadingSpinner";
import ErrorMessage from "../../common/ErrorMessage";
import ApiDeleteButton from "../common/ApiDeleteButton";
import { useCreditPacks } from "../../../hooks/useCreditPacks";
import { remove } from "../../../lib/api/creditPacks";

export default function CreditPackTable() {
  const { data: packs, loading, error, reload } = useCreditPacks();

  if (loading) return <LoadingSpinner label="Se încarcă pachetele..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Pachete de credite</h1>
          <p className="muted">Gestionează produsele de creditare suplimentară.</p>
        </div>
        <Link className="button" href="/admin/credit-packs/new">
          Create New
        </Link>
      </div>
      <div className="card table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nume</th>
              <th>Credite</th>
              <th>Preț</th>
              <th>Status</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {packs.map((pack) => (
              <tr key={pack.id}>
                <td data-label="Nume">
                  <Link
                    className="plan-name"
                    href={`/admin/credit-packs/${pack.id}`}
                  >
                    {pack.name}
                  </Link>
                </td>
                <td data-label="Credite">{pack.credits}</td>
                <td data-label="Preț" className="price">
                  {pack.price.toFixed(2)} <span className="muted">RON</span>
                </td>
                <td data-label="Status">
                  <span className={`badge ${pack.isActive ? "badge-active" : "badge-inactive"}`}>
                    {pack.isActive ? "Activ" : "Inactiv"}
                  </span>
                </td>
                <td data-label="Acțiuni" className="actions">
                  <Link href={`/admin/credit-packs/${pack.id}/edit`}>Edit</Link>
                  <Link href={`/admin/credit-packs/${pack.id}`}>Details</Link>
                  <ApiDeleteButton
                    label={`pachetul „${pack.name}”`}
                    onDelete={async () => {
                      await remove(pack.id);
                    }}
                    onDeleted={reload}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
