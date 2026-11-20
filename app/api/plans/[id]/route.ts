import { NextResponse } from "next/server";
import { SubscriptionPlansController } from "../../../../controllers/SubscriptionPlansController";
import {
  badRequest,
  handlePrismaError,
  notFound,
  ok,
} from "../../../../lib/apiResponse";

type PlanInput = {
  name?: string;
  description?: string;
  price?: number;
  billingPeriod?: string;
  invoiceLimit?: number;
  isDefault?: boolean;
  isActive?: boolean;
};

type RouteContext = { params: Promise<{ id: string }> };

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

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  try {
    const plan = await new SubscriptionPlansController().details(id);
    return plan ? ok(plan) : notFound("Planul nu a fost găsit.");
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const input = await readInput(request);
  if (input instanceof NextResponse) return input;

  try {
    const controller = new SubscriptionPlansController();
    if (!(await controller.details(id))) {
      return notFound("Planul nu a fost găsit.");
    }
    const result = await controller.editPost(id, toFormData(input));
    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }
    return ok((await controller.details(id)) ?? result.values);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  try {
    const controller = new SubscriptionPlansController();
    if (!(await controller.details(id))) {
      return notFound("Planul nu a fost găsit.");
    }
    await controller.delete(id);
    return ok({ message: "Planul a fost șters." });
  } catch (error) {
    return handlePrismaError(error);
  }
}
