import { notFound } from "next/navigation";
import { UsersController } from "../../../../../controllers/UsersController";
import UserForm from "../../../../../components/admin/UserForm";
import { requireAdmin } from "../../../../../lib/requireAdmin";
import { updateUserAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const user = await new UsersController().editGet(id);
  if (!user) notFound();
  return <section><div className="page-header"><div><p className="muted">Administrare</p><h1>Editează {user.name}</h1></div></div><UserForm initialValues={user} action={updateUserAction.bind(null, id)} /></section>;
}
