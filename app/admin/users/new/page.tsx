import { requireAdmin } from "../../../../lib/requireAdmin";
import { UsersController } from "../../../../controllers/UsersController";
import UserForm from "../../../../components/admin/UserForm";
import { createUserAction } from "../actions";

export default async function NewUserPage() {
  await requireAdmin();
  return <section><div className="page-header"><div><p className="muted">Administrare</p><h1>Utilizator nou</h1></div></div><UserForm initialValues={new UsersController().createGet()} action={createUserAction} /></section>;
}
