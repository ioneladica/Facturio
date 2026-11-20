import { NextResponse } from "next/server";
import { SubscriptionPlansController } from "../../../controllers/SubscriptionPlansController";
import {
  badRequest,
  handlePrismaError,
  ok,
} from "../../../lib/apiResponse";
import { requireAdminApi } from "../../../lib/requireAdminApi";

type PlanInput = {
  name?: string;
  description?: string;
  price?: number;
  billingPeriod?: string;
  invoiceLimit?: number;
  isDefault?: boolean;
  isActive?: boolean;
};

function toFormData(input: PlanInput): FormData {
  const formData = new FormData();
  formData.set("name", input.name ?? "");
  formData.set("description", input.description ?? "");
  formData.set("price", String(input.price ?? ""));
  formData.set("billingPeriod", input.billingPeriod ?? "");
  formData.set("invoiceLimit", String(input.invoiceLimit ?? ""));
  if (input.isDefault) formData.set("isDefault", "on");
  if (input.isActive) formData.set("isActive", "on");
  return formData;
}

async function readInput(request: Request): Promise<PlanInput | NextResponse> {
  try {
    return await request.json();
  } catch {
    return badRequest({ body: "Body-ul trebuie să fie JSON valid." });
  }
}

export async function GET() {
  const authResponse = await requireAdminApi();
  if (authResponse) return authResponse;

  try {
    const plans = await new SubscriptionPlansController().index();
    return ok(plans);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(request: Request) {
  const authResponse = await requireAdminApi();
  if (authResponse) return authResponse;

  const input = await readInput(request);
  if (input instanceof NextResponse) return input;

  try {
    const result = await new SubscriptionPlansController().createPost(
      toFormData(input),
    );
    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }
    return ok(result.values, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}
