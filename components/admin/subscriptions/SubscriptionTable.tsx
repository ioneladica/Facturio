"use client";

import Link from "next/link";
import LoadingSpinner from "../../common/LoadingSpinner";
import ErrorMessage from "../../common/ErrorMessage";
import ApiDeleteButton from "../common/ApiDeleteButton";
import { useSubscriptions } from "../../../hooks/useSubscriptions";
import { remove } from "../../../lib/api/subscriptions";

export default function SubscriptionTable() {
  const {
    data: subscriptions,
    loading,
    error,
    reload,
  } = useSubscriptions();

  if (loading) {
    return <LoadingSpinner label="Se încarcă abonamentele..." />;
  }
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Abonamente utilizatori</h1>
          <p className="muted">
            Lista abonamentelor asociate utilizatorilor și planurilor.
          </p>
        </div>
        <Link className="button" href="/admin/subscriptions/new">
          Create New
        </Link>
      </div>
      <div className="card table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Utilizator</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Început</th>
              <th>Sfârșit</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td data-label="Utilizator">{subscription.userName}</td>
                <td data-label="Plan">{subscription.planName}</td>
                <td data-label="Status">
                  <span
                    className={`badge ${
                      subscription.status === "ACTIVE"
                        ? "badge-active"
                        : "badge-inactive"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </td>
                <td data-label="Început">
                  {subscription.startDate.replace("T", " ")}
                </td>
                <td data-label="Sfârșit">
                  {subscription.endDate
                    ? subscription.endDate.replace("T", " ")
                    : "-"}
                </td>
                <td data-label="Acțiuni" className="actions">
                  <Link
                    href={`/admin/subscriptions/${subscription.id}/edit`}
                  >
                    Modifică / Extinde
                  </Link>
                  <ApiDeleteButton
                    label={`abonamentul utilizatorului „${subscription.userName}”`}
                    onDelete={async () => {
                      await remove(subscription.id);
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
