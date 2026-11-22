import { requireAdmin } from "../../../../lib/requireAdmin";
import CreditPackDetails from "../../../../components/admin/credit-packs/CreditPackDetails";

export const dynamic = "force-dynamic";

export default async function CreditPackDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  return <CreditPackDetails id={id} />;
}
