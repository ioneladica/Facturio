import { notFound } from "next/navigation";
import { CreditPacksController } from "../../../../../controllers/CreditPacksController";
import CreditPackForm from "../../../../../components/admin/CreditPackForm";
import { updateCreditPackAction } from "../../actions";
import { requireAdmin } from "../../../../../lib/requireAdmin";

export const dynamic = "force-dynamic";

export default async function EditCreditPackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const pack = await new CreditPacksController().editGet(id);
  if (!pack) notFound();

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="muted">Administrare</p>
          <h1>Editează {pack.name}</h1>
          <p className="muted">
            Actualizează creditele, prețul și disponibilitatea pachetului.
          </p>
        </div>
      </div>
      <CreditPackForm
        initialValues={pack}
        action={updateCreditPackAction.bind(null, id)}
      />
    </section>
  );
}
