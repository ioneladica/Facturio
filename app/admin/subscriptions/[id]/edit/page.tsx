"use client";

import { use } from "react";
import SubscriptionForm from "../../../../../components/admin/SubscriptionForm";
import LoadingSpinner from "../../../../../components/common/LoadingSpinner";
import ErrorMessage from "../../../../../components/common/ErrorMessage";
import { useSubscription } from "../../../../../hooks/useSubscription";

export default function EditSubscriptionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: subscription, loading, error } = useSubscription(id);
  if (loading) return <LoadingSpinner label="Se încarcă abonamentul..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!subscription) return <ErrorMessage message="Abonamentul nu a fost găsit." />;

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="muted">Abonamente utilizatori</p>
          <h1>Modifică / extinde abonamentul</h1>
          <p className="muted">
            Schimbarea planului sau a datei de început recalculează automat data de sfârșit.
          </p>
        </div>
      </div>
      <SubscriptionForm
        subscriptionId={id}
        initialValues={{
          userId: subscription.userId,
          planId: subscription.planId,
          status: subscription.status,
          startDate: subscription.startDate,
        }}
      />
    </section>
  );
}
