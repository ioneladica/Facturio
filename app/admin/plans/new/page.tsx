import { requireAdmin } from "../../../../lib/requireAdmin";
import { SubscriptionPlansController } from "../../../../controllers/SubscriptionPlansController";
import PlanForm from "../../../../components/admin/PlanForm";
import { createPlanAction } from "../actions";

export default async function NewPlanPage() {
  await requireAdmin();
  return <section><div className="page-header"><div><p className="muted">Planuri de abonament</p><h1>Plan nou</h1><p className="muted">Configurează prețul, perioada și limita de facturi.</p></div></div><PlanForm initialValues={new SubscriptionPlansController().createGet()} action={createPlanAction} /></section>;
}
