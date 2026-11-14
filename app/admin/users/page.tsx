import Link from "next/link";
import { requireAdmin } from "../../../lib/requireAdmin";
import { UsersController } from "../../../controllers/UsersController";
import DeleteButton from "../../../components/admin/DeleteButton";
import { deleteUserAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  await requireAdmin();
  const users = await new UsersController().index();
  return (
    <section>
      <div className="page-header"><div><h1>Utilizatori</h1><p className="muted">Gestionează conturile și accesul utilizatorilor.</p></div><Link className="button" href="/admin/users/new">Utilizator nou</Link></div>
      <div className="card table-wrapper"><table><thead><tr><th>Nume</th><th>Email</th><th>Rol</th><th>Status</th><th>Acțiuni</th></tr></thead><tbody>
        {users.map((user) => <tr key={user.id}><td data-label="Nume"><Link className="plan-name" href={`/admin/users/${user.id}`}>{user.name}</Link></td><td data-label="Email">{user.email}</td><td data-label="Rol">{user.role === "ADMIN" ? "Administrator" : "Utilizator"}</td><td data-label="Status"><span className={`badge ${user.status === "ACTIVE" ? "badge-active" : "badge-inactive"}`}>{user.status === "ACTIVE" ? "Activ" : "Inactiv"}</span></td><td data-label="Acțiuni" className="actions"><Link href={`/admin/users/${user.id}/edit`}>Editează</Link><Link href={`/admin/users/${user.id}`}>Detalii</Link>{user.id && <DeleteButton action={deleteUserAction.bind(null, user.id)} />}</td></tr>)}
      </tbody></table></div>
    </section>
  );
}
