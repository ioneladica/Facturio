import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UsersController } from "../../../../controllers/UsersController";
import {
  badRequest,
  conflict,
  handlePrismaError,
  notFound,
  ok,
} from "../../../../lib/apiResponse";
import { authCookie, readSessionUserId } from "../../../../lib/auth";
import { requireAdminApi } from "../../../../lib/requireAdminApi";

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

type RouteContext = { params: Promise<{ id: string }> };

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

export async function GET(_request: Request, context: RouteContext) {
  const authResponse = await requireAdminApi();
  if (authResponse) return authResponse;

  const { id } = await context.params;
  try {
    const user = await new UsersController().details(id);
    return user ? ok(user) : notFound("Utilizatorul nu a fost găsit.");
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
    const controller = new UsersController();
    if (!(await controller.details(id))) {
      return notFound("Utilizatorul nu a fost găsit.");
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
    const cookieStore = await cookies();
    const administratorId = readSessionUserId(
      cookieStore.get(authCookie.name)?.value,
    );
    if (administratorId === id) {
      return conflict("Nu vă puteți șterge propriul cont.");
    }

    const controller = new UsersController();
    if (!(await controller.details(id))) {
      return notFound("Utilizatorul nu a fost găsit.");
    }

    const result = await controller.delete(id);
    if (!result.deleted || result.count === 0) {
      return notFound("Utilizatorul nu a fost găsit.");
    }
    return ok({ message: "Utilizatorul a fost șters." });
  } catch (error) {
    return handlePrismaError(error);
  }
}
