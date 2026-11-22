import { requireAdmin } from "../../../lib/requireAdmin";
import SubscriptionTable from "../../../components/admin/subscriptions/SubscriptionTable";

export const dynamic = "force-dynamic";

export default async function SubscriptionsPage() {
  await requireAdmin();
  return <SubscriptionTable />;
}
