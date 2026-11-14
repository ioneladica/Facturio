import { requireAdmin } from "../../../../lib/requireAdmin";
import { UserSubscriptionsController } from "../../../../controllers/UserSubscriptionsController";
import SubscriptionForm from "../../../../components/admin/SubscriptionForm";
import { createSubscriptionAction } from "../actions";

export default async function NewSubscriptionPage() {
  await requireAdmin();
  const { users, plans } = await new UserSubscriptionsController().createGet();
  return (
    <section>
      <div className="page-header"><div><p className="muted">Abonamente utilizatori</p><h1>Abonament nou</h1><p className="muted">Asociază un utilizator unui plan prin cheia străină planId.</p></div></div>
      <SubscriptionForm users={users} plans={plans} action={createSubscriptionAction} />
    </section>
  );
}
