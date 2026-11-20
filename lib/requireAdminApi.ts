import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "./prisma";
import { authCookie, readSessionUserId } from "./auth";

export async function requireAdminApi(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const userId = readSessionUserId(cookieStore.get(authCookie.name)?.value);

  if (!userId) {
    return NextResponse.json(
      { error: "Autentificarea este necesară." },
      { status: 401 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, status: true },
  });
  if (!user || user.role !== "ADMIN" || user.status !== "ACTIVE") {
    return NextResponse.json(
      { error: "Nu aveți permisiunea de a accesa această resursă." },
      { status: 403 },
    );
  }

  return null;
}
