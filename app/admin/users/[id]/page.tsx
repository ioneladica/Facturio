import { requireAdmin } from "../../../../lib/requireAdmin";
import UserDetails from "../../../../components/admin/users/UserDetails";

export const dynamic = "force-dynamic";

export default async function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  return <UserDetails id={id} />;
}
