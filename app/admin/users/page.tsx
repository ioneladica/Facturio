import { requireAdmin } from "../../../lib/requireAdmin";
import UserTable from "../../../components/admin/users/UserTable";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  await requireAdmin();
  return <UserTable />;
}
