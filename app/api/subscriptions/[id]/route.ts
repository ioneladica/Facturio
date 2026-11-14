import { NextResponse } from "next/server";
import { UserSubscriptionsController } from "../../../../controllers/UserSubscriptionsController";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const subscription = await new UserSubscriptionsController().apiDetails(id);
  if (!subscription) {
    return NextResponse.json({ error: "Abonamentul nu a fost găsit." }, { status: 404 });
  }
  return NextResponse.json(subscription);
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

  const result = await new UserSubscriptionsController().apiUpdate(id, input);
  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }

  const subscription = await new UserSubscriptionsController().apiDetails(id);
  return NextResponse.json(subscription);
}
