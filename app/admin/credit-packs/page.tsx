import { requireAdmin } from "../../../lib/requireAdmin";
import CreditPackTable from "../../../components/admin/credit-packs/CreditPackTable";

export const dynamic = "force-dynamic";

export default async function CreditPacksPage() {
  await requireAdmin();
  return <CreditPackTable />;
}
