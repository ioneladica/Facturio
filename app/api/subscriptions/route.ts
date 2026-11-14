import { NextResponse } from "next/server";
import { UserSubscriptionsController } from "../../../controllers/UserSubscriptionsController";

export async function GET() {
  const subscriptions = await new UserSubscriptionsController().apiIndex();
  return NextResponse.json(subscriptions);
}

export async function POST(request: Request) {
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

  const result = await new UserSubscriptionsController().apiCreate(input);
  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }

  const subscription = result.values.id
    ? await new UserSubscriptionsController().apiDetails(result.values.id)
    : null;
  return NextResponse.json(
    subscription ?? result.values,
    { status: 201 },
  );
}
