import Link from "next/link";
import AdminMenu from "../../components/admin/AdminMenu";
import { requireAdmin } from "../../lib/requireAdmin";
import { logoutAction } from "../../app/login/actions";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/">Facturio<span className="brand-dot">.</span></Link>
        <p className="admin-caption">ADMINISTRARE</p>
        <AdminMenu />
        <div className="admin-sidebar-bottom">
          <Link className="admin-back-link" href="/">← Înapoi la site</Link>
        </div>
      </aside>
      <div className="admin-workspace">
        <header className="admin-topbar">
          <div><span className="admin-topbar-label">Administrare</span><strong>Panou de administrare</strong></div>
          <div className="admin-user"><span className="admin-user-avatar">ID</span><span>Administrator</span><span className="admin-user-dot" /><form action={logoutAction}><button className="admin-logout" type="submit">Ieșire</button></form></div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
