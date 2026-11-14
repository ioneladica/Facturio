import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { authCookie, readSessionUserId } from "./auth";

export async function requireAdmin(): Promise<void> {
  const cookieStore = await cookies();
  const userId = readSessionUserId(cookieStore.get(authCookie.name)?.value);
  if (!userId) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, status: true },
  });
  if (!user || user.role !== "ADMIN" || user.status !== "ACTIVE") {
    cookieStore.delete(authCookie.name);
    redirect("/login");
  }
}
