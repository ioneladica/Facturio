import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../lib/requireAdmin";
import { SubscriptionPlansController } from "../../../../controllers/SubscriptionPlansController";

export const dynamic = "force-dynamic";

export default async function PlanDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const plan = await new SubscriptionPlansController().details(id);
  if (!plan) notFound();
  return (
    <section>
      <div className="page-header"><div><p className="muted">Plan de abonament</p><h1>{plan.name}</h1></div><span className={`badge ${plan.isActive ? "badge-active" : "badge-inactive"}`}>{plan.isActive ? "Activ" : "Inactiv"}</span></div>
      <div className="details-card"><dl>
        <dt>Descriere</dt><dd>{plan.description || "-"}</dd>
        <dt>Preț</dt><dd>{plan.price.toFixed(2)} RON</dd>
        <dt>Perioadă de facturare</dt><dd>{plan.billingPeriod === "MONTHLY" ? "Lunar" : "Anual"}</dd>
        <dt>Limită facturi</dt><dd>{plan.invoiceLimit}</dd>
        <dt>Implicit</dt><dd>{plan.isDefault ? "Da" : "Nu"}</dd>
        <dt>Activ</dt><dd>{plan.isActive ? "Da" : "Nu"}</dd>
      </dl><div className="details-actions"><Link className="button" href={`/admin/plans/${plan.id}/edit`}>Edit</Link><Link className="button button-secondary" href="/admin/plans">Back to List</Link></div></div>
    </section>
  );
}
