import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export function ok<T>(data: T, status = 200): NextResponse<T> {
  return NextResponse.json(data, { status });
}

export function badRequest(errors: unknown): NextResponse {
  return NextResponse.json({ errors }, { status: 400 });
}

export function notFound(message = "Resursa nu a fost găsită."): NextResponse {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function conflict(message = "Conflict la procesarea datelor."): NextResponse {
  return NextResponse.json({ error: message }, { status: 409 });
}

export function serverError(): NextResponse {
  return NextResponse.json(
    { error: "A apărut o eroare internă a serverului." },
    { status: 500 },
  );
}

export function handlePrismaError(error: unknown): NextResponse {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return conflict("Există deja o înregistrare cu aceste date.");
      case "P2025":
        return notFound("Înregistrarea nu a fost găsită.");
      case "P2003":
        return conflict(
          "Operația nu poate fi efectuată deoarece există înregistrări asociate.",
        );
    }
  }

  return serverError();
}
