import { NextResponse } from "next/server";
import { UserSubscriptionsController } from "../../../../controllers/UserSubscriptionsController";
import {
  handlePrismaError,
  notFound,
  ok,
} from "../../../../lib/apiResponse";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  try {
    const subscription = await new UserSubscriptionsController().apiDetails(id);
    if (!subscription) {
      return notFound("Abonamentul nu a fost găsit.");
    }
    return ok(subscription);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  let input: {
    userId?: string;
    planId?: string;
    status?: string;
    startDate?: string;
  };

  try {
    input = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body-ul trebuie să fie JSON valid." },
      { status: 400 },
    );
  }

  try {
    const controller = new UserSubscriptionsController();
    if (!(await controller.apiDetails(id))) {
      return notFound("Abonamentul nu a fost găsit.");
    }

    const result = await controller.apiUpdate(id, input);
    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }

    return ok(await controller.apiDetails(id));
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  try {
    const controller = new UserSubscriptionsController();
    if (!(await controller.apiDetails(id))) {
      return notFound("Abonamentul nu a fost găsit.");
    }

    await controller.delete(id);
    return ok({ message: "Abonamentul a fost șters." });
  } catch (error) {
    return handlePrismaError(error);
  }
}
