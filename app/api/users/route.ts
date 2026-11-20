import { NextResponse } from "next/server";
import { UsersController } from "../../../controllers/UsersController";
import {
  badRequest,
  handlePrismaError,
  ok,
} from "../../../lib/apiResponse";
import { requireAdminApi } from "../../../lib/requireAdminApi";

type UserInput = {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  phone?: string;
  address?: string;
  taxId?: string;
  password?: string;
};

function toFormData(input: UserInput): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) formData.set(key, String(value));
  }
  return formData;
}

async function readInput(request: Request): Promise<UserInput | NextResponse> {
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
    return ok(await new UsersController().index());
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
    const result = await new UsersController().createPost(toFormData(input));
    if (!result.ok) return NextResponse.json(result, { status: 400 });
    return ok(result.values, 201);
  } catch (error) {
    return handlePrismaError(error);
  }
}
