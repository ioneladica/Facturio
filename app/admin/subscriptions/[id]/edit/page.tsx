import { notFound } from "next/navigation";
import { requireAdmin } from "../../../../../lib/requireAdmin";
import { UserSubscriptionsController } from "../../../../../controllers/UserSubscriptionsController";
import SubscriptionForm from "../../../../../components/admin/SubscriptionForm";
import { updateSubscriptionAction } from "../../actions";

export default async function EditSubscriptionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const controller = new UserSubscriptionsController();
  const [subscription, options] = await Promise.all([
    controller.details(id),
    controller.createGet(),
  ]);
  if (!subscription) notFound();

  return (
    <section>
      <div className="page-header"><div><p className="muted">Abonamente utilizatori</p><h1>Modifică / extinde abonamentul</h1><p className="muted">Schimbarea planului sau a datei de început recalculează automat data de sfârșit.</p></div></div>
      <SubscriptionForm
        users={options.users}
        plans={options.plans}
        initialValues={subscription}
        action={updateSubscriptionAction.bind(null, id)}
      />
    </section>
  );
}
