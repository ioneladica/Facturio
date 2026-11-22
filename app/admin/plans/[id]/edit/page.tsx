"use client";

import { use } from "react";
import PlanForm from "../../../../../components/admin/PlanForm";
import LoadingSpinner from "../../../../../components/common/LoadingSpinner";
import ErrorMessage from "../../../../../components/common/ErrorMessage";
import { usePlan } from "../../../../../hooks/usePlan";

export default function EditPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: plan, loading, error } = usePlan(id);

  if (loading) return <LoadingSpinner label="Se încarcă planul..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!plan) return <ErrorMessage message="Planul nu a fost găsit." />;

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="muted">Planuri de abonament</p>
          <h1>Editează {plan.name}</h1>
          <p className="muted">
            Actualizează prețul și disponibilitatea acestui plan.
          </p>
        </div>
      </div>
      <PlanForm
        planId={id}
        initialValues={{
          name: plan.name,
          description: plan.description,
          price: plan.price,
          billingPeriod: plan.billingPeriod,
          invoiceLimit: plan.invoiceLimit,
          isDefault: plan.isDefault,
          isActive: plan.isActive,
        }}
      />
    </section>
  );
}
