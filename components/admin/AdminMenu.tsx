"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminMenu() {
  const pathname = usePathname();
  const isPlansActive = pathname.startsWith("/admin/plans");
  const isUsersActive = pathname.startsWith("/admin/users");
  const isCreditPacksActive = pathname.startsWith("/admin/credit-packs");
  const isSubscriptionsActive = pathname.startsWith("/admin/subscriptions");

  return (
    <nav className="admin-menu" aria-label="Meniu administrare">
      <Link
        className={`admin-menu-link${isPlansActive ? " admin-menu-link-active" : ""}`}
        href="/admin/plans"
      >
        <span>◈</span> Planuri
      </Link>
      <Link
        className={`admin-menu-link${isSubscriptionsActive ? " admin-menu-link-active" : ""}`}
        href="/admin/subscriptions"
      >
        <span>◷</span> Abonamente
      </Link>
      <Link
        className={`admin-menu-link${isUsersActive ? " admin-menu-link-active" : ""}`}
        href="/admin/users"
      >
        <span>♙</span> Utilizatori
      </Link>
      <Link
        className={`admin-menu-link${
          isCreditPacksActive ? " admin-menu-link-active" : ""
        }`}
        href="/admin/credit-packs"
      >
        <span>✦</span> Pachete de credite
      </Link>
    </nav>
  );
}
