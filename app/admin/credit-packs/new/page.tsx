import { CreditPacksController } from "../../../../controllers/CreditPacksController";
import CreditPackForm from "../../../../components/admin/CreditPackForm";
import { createCreditPackAction } from "../actions";
import { requireAdmin } from "../../../../lib/requireAdmin";

export default async function NewCreditPackPage() {
  await requireAdmin();
  return (
    <section>
      <div className="page-header">
        <div>
          <p className="muted">Administrare</p>
          <h1>Pachet de credite nou</h1>
          <p className="muted">
            Configurează creditele și prețul pachetului.
          </p>
        </div>
      </div>
      <CreditPackForm
        initialValues={new CreditPacksController().createGet()}
        action={createCreditPackAction}
      />
    </section>
  );
}
