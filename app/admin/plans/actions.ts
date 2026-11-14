"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../../../lib/requireAdmin";
import { SubscriptionPlansController } from "../../../controllers/SubscriptionPlansController";
import type { SubscriptionPlanPostResult } from "../../../controllers/SubscriptionPlansController";

export type PlanActionState = SubscriptionPlanPostResult;

export async function createPlanAction(
  _previousState: PlanActionState,
  formData: FormData,
): Promise<PlanActionState> {
  await requireAdmin();
  const result = await new SubscriptionPlansController().createPost(formData);
  if (result.ok) {
    revalidatePath("/admin/plans");
    redirect("/admin/plans");
  }
  return result;
}

export async function updatePlanAction(
  id: string,
  _previousState: PlanActionState,
  formData: FormData,
): Promise<PlanActionState> {
  await requireAdmin();
  const result = await new SubscriptionPlansController().editPost(id, formData);
  if (result.ok) {
    revalidatePath("/admin/plans");
    redirect("/admin/plans");
  }
  return result;
}

export async function deletePlanAction(id: string): Promise<void> {
  await requireAdmin();
  await new SubscriptionPlansController().delete(id);
  revalidatePath("/admin/plans");
  redirect("/admin/plans");
}
