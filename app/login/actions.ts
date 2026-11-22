"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import {
  authCookie,
  createSessionToken,
  verifyPassword,
} from "../../lib/auth";

export type LoginState = { error?: string };

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Completează emailul și parola." };

  const user = await prisma.user.findUnique({ where: { email } });
  if (
    !user ||
    user.role !== "ADMIN" ||
    user.status !== "ACTIVE" ||
    !(await verifyPassword(password, user.passwordHash))
  ) {
    return { error: "Date de autentificare incorecte." };
  }

  const cookieStore = await cookies();
  cookieStore.set(authCookie.name, createSessionToken(user.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.COOKIE_SECURE
      ? process.env.COOKIE_SECURE === "true"
      : process.env.NODE_ENV === "production",
    maxAge: authCookie.maxAge,
    path: "/",
  });
  redirect("/admin/plans");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(authCookie.name);
  redirect("/login");
}
