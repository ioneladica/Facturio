"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreditPacksController } from "../../../controllers/CreditPacksController";
import type { CreditPackPostResult } from "../../../controllers/CreditPacksController";
import { requireAdmin } from "../../../lib/requireAdmin";

export type CreditPackActionState = CreditPackPostResult;

export async function createCreditPackAction(
  _previousState: CreditPackActionState,
  formData: FormData,
): Promise<CreditPackActionState> {
  await requireAdmin();
  const result = await new CreditPacksController().createPost(formData);
  if (result.ok) {
    revalidatePath("/admin/credit-packs");
    redirect("/admin/credit-packs");
  }
  return result;
}

export async function updateCreditPackAction(
  id: string,
  _previousState: CreditPackActionState,
  formData: FormData,
): Promise<CreditPackActionState> {
  await requireAdmin();
  const result = await new CreditPacksController().editPost(id, formData);
  if (result.ok) {
    revalidatePath("/admin/credit-packs");
    redirect("/admin/credit-packs");
  }
  return result;
}
