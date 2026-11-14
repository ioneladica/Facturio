import Link from "next/link";
import { notFound } from "next/navigation";
import { CreditPacksController } from "../../../../controllers/CreditPacksController";
import { requireAdmin } from "../../../../lib/requireAdmin";

export const dynamic = "force-dynamic";

export default async function CreditPackDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const pack = await new CreditPacksController().details(id);
  if (!pack) notFound();

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="muted">Pachet de credite</p>
          <h1>{pack.name}</h1>
        </div>
        <span
          className={`badge ${
            pack.isActive ? "badge-active" : "badge-inactive"
          }`}
        >
          {pack.isActive ? "Activ" : "Inactiv"}
        </span>
      </div>
      <div className="details-card">
        <dl>
          <dt>Descriere</dt>
          <dd>{pack.description || "-"}</dd>
          <dt>Credite</dt>
          <dd>{pack.credits}</dd>
          <dt>Preț</dt>
          <dd>{pack.price.toFixed(2)} RON</dd>
          <dt>Activ</dt>
          <dd>{pack.isActive ? "Da" : "Nu"}</dd>
        </dl>
        <div className="details-actions">
          <Link
            className="button"
            href={`/admin/credit-packs/${pack.id}/edit`}
          >
            Edit
          </Link>
          <Link
            className="button button-secondary"
            href="/admin/credit-packs"
          >
            Back to List
          </Link>
        </div>
      </div>
    </section>
  );
}
