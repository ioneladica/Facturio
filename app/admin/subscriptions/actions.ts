"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../../../lib/requireAdmin";
import { UserSubscriptionsController } from "../../../controllers/UserSubscriptionsController";
import type { UserSubscriptionPostResult } from "../../../controllers/UserSubscriptionsController";

export type SubscriptionActionState = UserSubscriptionPostResult;

export async function createSubscriptionAction(
  _previousState: SubscriptionActionState,
  formData: FormData,
): Promise<SubscriptionActionState> {
  await requireAdmin();
  const result = await new UserSubscriptionsController().createPost(formData);
  if (result.ok) {
    revalidatePath("/admin/subscriptions");
    redirect("/admin/subscriptions");
  }
  return result;
}

export async function updateSubscriptionAction(
  id: string,
  _previousState: SubscriptionActionState,
  formData: FormData,
): Promise<SubscriptionActionState> {
  await requireAdmin();
  const result = await new UserSubscriptionsController().editPost(id, formData);
  if (result.ok) {
    revalidatePath("/admin/subscriptions");
    redirect("/admin/subscriptions");
  }
  return result;
}

export async function deleteSubscriptionAction(id: string): Promise<void> {
  await requireAdmin();
  await new UserSubscriptionsController().delete(id);
  revalidatePath("/admin/subscriptions");
  redirect("/admin/subscriptions");
}
