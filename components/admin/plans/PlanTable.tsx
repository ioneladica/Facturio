"use client";

import Link from "next/link";
import LoadingSpinner from "../../common/LoadingSpinner";
import ErrorMessage from "../../common/ErrorMessage";
import ApiDeleteButton from "../common/ApiDeleteButton";
import { usePlans } from "../../../hooks/usePlans";
import { remove } from "../../../lib/api/plans";

export default function PlanTable() {
  const { data: plans, loading, error, reload } = usePlans();

  if (loading) return <LoadingSpinner label="Se încarcă planurile..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Planuri de abonament</h1>
          <p className="muted">
            Gestionează prețurile și limitele pentru clienții tăi.
          </p>
        </div>
        <Link className="button" href="/admin/plans/new">
          Create New
        </Link>
      </div>
      <div className="card table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nume</th>
              <th>Preț</th>
              <th>Perioadă</th>
              <th>Limită facturi</th>
              <th>Implicit</th>
              <th>Status</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.id}>
                <td data-label="Nume">
                  <Link className="plan-name" href={`/admin/plans/${plan.id}`}>
                    {plan.name}
                  </Link>
                </td>
                <td data-label="Preț" className="price">
                  {plan.price.toFixed(2)} <span className="muted">RON</span>
                </td>
                <td data-label="Perioadă">
                  {plan.billingPeriod === "MONTHLY" ? "Lunar" : "Anual"}
                </td>
                <td data-label="Limită facturi">{plan.invoiceLimit}</td>
                <td data-label="Implicit">
                  {plan.isDefault && <span className="badge badge-default">Implicit</span>}
                </td>
                <td data-label="Status">
                  <span className={`badge ${plan.isActive ? "badge-active" : "badge-inactive"}`}>
                    {plan.isActive ? "Activ" : "Inactiv"}
                  </span>
                </td>
                <td data-label="Acțiuni" className="actions">
                  <Link href={`/admin/plans/${plan.id}/edit`}>Edit</Link>
                  <Link href={`/admin/plans/${plan.id}`}>Details</Link>
                  <ApiDeleteButton
                    label={`planul „${plan.name}”`}
                    onDelete={async () => {
                      await remove(plan.id);
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
