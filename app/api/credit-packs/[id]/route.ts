import { NextResponse } from "next/server";
import { CreditPacksController } from "../../../../controllers/CreditPacksController";
import {
  badRequest,
  handlePrismaError,
  notFound,
  ok,
} from "../../../../lib/apiResponse";
import { requireAdminApi } from "../../../../lib/requireAdminApi";

type CreditPackInput = {
  name?: string;
  description?: string;
  credits?: number;
  price?: number;
  isActive?: boolean;
};

type RouteContext = { params: Promise<{ id: string }> };

function toFormData(input: CreditPackInput): FormData {
  const formData = new FormData();
  formData.set("name", input.name ?? "");
  formData.set("description", input.description ?? "");
  formData.set("credits", String(input.credits ?? ""));
  formData.set("price", String(input.price ?? ""));
  if (input.isActive) formData.set("isActive", "on");
  return formData;
}

async function readInput(
  request: Request,
): Promise<CreditPackInput | NextResponse> {
  try {
    return await request.json();
  } catch {
    return badRequest({ body: "Body-ul trebuie să fie JSON valid." });
  }
}

export async function GET(_request: Request, context: RouteContext) {
  const authResponse = await requireAdminApi();
  if (authResponse) return authResponse;

  const { id } = await context.params;
  try {
    const pack = await new CreditPacksController().details(id);
    return pack ? ok(pack) : notFound("Pachetul de credite nu a fost găsit.");
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const authResponse = await requireAdminApi();
  if (authResponse) return authResponse;

  const { id } = await context.params;
  const input = await readInput(request);
  if (input instanceof NextResponse) return input;

  try {
    const controller = new CreditPacksController();
    if (!(await controller.details(id))) {
      return notFound("Pachetul de credite nu a fost găsit.");
    }
    const result = await controller.editPost(id, toFormData(input));
    if (!result.ok) return NextResponse.json(result, { status: 400 });
    return ok((await controller.details(id)) ?? result.values);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authResponse = await requireAdminApi();
  if (authResponse) return authResponse;

  const { id } = await context.params;
  try {
    const controller = new CreditPacksController();
    if (!(await controller.details(id))) {
      return notFound("Pachetul de credite nu a fost găsit.");
    }
    await controller.delete(id);
    return ok({ message: "Pachetul de credite a fost șters." });
  } catch (error) {
    return handlePrismaError(error);
  }
}
