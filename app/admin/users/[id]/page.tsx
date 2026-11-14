import Link from "next/link";
import { notFound } from "next/navigation";
import { UsersController } from "../../../../controllers/UsersController";
import { requireAdmin } from "../../../../lib/requireAdmin";

export const dynamic = "force-dynamic";

export default async function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const user = await new UsersController().details(id);
  if (!user) notFound();
  return <section><div className="page-header"><div><p className="muted">Utilizator</p><h1>{user.name}</h1></div></div><div className="details-card"><dl><dt>Email</dt><dd>{user.email}</dd><dt>Rol</dt><dd>{user.role === "ADMIN" ? "Administrator" : "Utilizator"}</dd><dt>Status</dt><dd>{user.status === "ACTIVE" ? "Activ" : "Inactiv"}</dd><dt>Telefon</dt><dd>{user.phone || "-"}</dd><dt>Adresă</dt><dd>{user.address || "-"}</dd><dt>CUI / Cod fiscal</dt><dd>{user.taxId || "-"}</dd></dl><div className="details-actions"><Link className="button" href={`/admin/users/${user.id}/edit`}>Editează</Link><Link className="button button-secondary" href="/admin/users">Înapoi la listă</Link></div></div></section>;
}
