import Link from "next/link";
import { CreditPacksController } from "../../../controllers/CreditPacksController";
import { requireAdmin } from "../../../lib/requireAdmin";

export const dynamic = "force-dynamic";

export default async function CreditPacksPage() {
  await requireAdmin();
  const packs = await new CreditPacksController().index();

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Pachete de credite</h1>
          <p className="muted">
            Gestionează produsele de creditare suplimentară.
          </p>
        </div>
        <Link className="button" href="/admin/credit-packs/new">
          Create New
        </Link>
      </div>
      <div className="card table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nume</th>
              <th>Credite</th>
              <th>Preț</th>
              <th>Status</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {packs.map((pack) => (
              <tr key={pack.id}>
                <td data-label="Nume">
                  <Link
                    className="plan-name"
                    href={`/admin/credit-packs/${pack.id}`}
                  >
                    {pack.name}
                  </Link>
                </td>
                <td data-label="Credite">{pack.credits}</td>
                <td data-label="Preț" className="price">
                  {pack.price.toFixed(2)}{" "}
                  <span className="muted">RON</span>
                </td>
                <td data-label="Status">
                  <span
                    className={`badge ${
                      pack.isActive ? "badge-active" : "badge-inactive"
                    }`}
                  >
                    {pack.isActive ? "Activ" : "Inactiv"}
                  </span>
                </td>
                <td data-label="Acțiuni" className="actions">
                  <Link href={`/admin/credit-packs/${pack.id}/edit`}>
                    Edit
                  </Link>
                  <Link href={`/admin/credit-packs/${pack.id}`}>
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
