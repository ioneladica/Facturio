import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../../lib/requireAdmin";
import { SubscriptionPlansController } from "../../../../../controllers/SubscriptionPlansController";
import PlanForm from "../../../../../components/admin/PlanForm";
import { updatePlanAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditPlanPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const plan = await new SubscriptionPlansController().editGet(id);
  if (!plan) notFound();
  return <section><div className="page-header"><div><p className="muted">Planuri de abonament</p><h1>Editează {plan.name}</h1><p className="muted">Actualizează prețul și disponibilitatea acestui plan.</p></div></div><PlanForm initialValues={plan} action={updatePlanAction.bind(null, id)} /></section>;
}
