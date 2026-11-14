"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UsersController } from "../../../controllers/UsersController";
import type { UserPostResult } from "../../../controllers/UsersController";
import { requireAdmin } from "../../../lib/requireAdmin";

export type UserActionState = UserPostResult;

export async function createUserAction(
  _previousState: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  await requireAdmin();
  const result = await new UsersController().createPost(formData);
  if (result.ok) {
    revalidatePath("/admin/users");
    redirect("/admin/users");
  }
  return result;
}

export async function updateUserAction(
  id: string,
  _previousState: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  await requireAdmin();
  const result = await new UsersController().editPost(id, formData);
  if (result.ok) {
    revalidatePath("/admin/users");
    redirect("/admin/users");
  }
  return result;
}

export async function deleteUserAction(id: string): Promise<void> {
  await requireAdmin();
  await new UsersController().delete(id);
  revalidatePath("/admin/users");
  redirect("/admin/users");
}
