import { requireAdmin } from "../../../../lib/requireAdmin";
import PlanDetails from "../../../../components/admin/plans/PlanDetails";

export const dynamic = "force-dynamic";

export default async function PlanDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  return <PlanDetails id={id} />;
}
