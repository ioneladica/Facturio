import { requireAdmin } from "../../../lib/requireAdmin";
import PlanTable from "../../../components/admin/plans/PlanTable";

export const dynamic = "force-dynamic";

export default async function PlansPage() {
  await requireAdmin();
  return <PlanTable />;
}
