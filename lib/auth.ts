import { createHmac, randomBytes, scrypt as nodeScrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(nodeScrypt);
const SESSION_COOKIE = "facturio_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function authSecret(): string {
  if (process.env.AUTH_SECRET) return process.env.AUTH_SECRET;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "AUTH_SECRET este obligatoriu în producție.",
    );
  }
  return "facturio-development-secret-change-me";
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `scrypt$${salt}$${derivedKey.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const [algorithm, salt, storedKey] = storedHash.split("$");
  if (algorithm !== "scrypt" || !salt || !storedKey) return false;

  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  const expectedKey = Buffer.from(storedKey, "hex");
  return (
    expectedKey.length === derivedKey.length &&
    timingSafeEqual(expectedKey, derivedKey)
  );
}

export function createSessionToken(userId: string): string {
  const payload = `${userId}.${Date.now()}`;
  const signature = createHmac("sha256", authSecret())
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

export function readSessionUserId(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [userId, issuedAt, signature] = parts;
  const payload = `${userId}.${issuedAt}`;
  const expectedSignature = createHmac("sha256", authSecret())
    .update(payload)
    .digest("hex");
  const provided = Buffer.from(signature, "hex");
  const expected = Buffer.from(expectedSignature, "hex");

  if (
    provided.length !== expected.length ||
    !timingSafeEqual(provided, expected)
  ) {
    return null;
  }

  const age = Date.now() - Number(issuedAt);
  return Number.isFinite(age) && age >= 0 && age <= SESSION_MAX_AGE * 1000
    ? userId
    : null;
}

export const authCookie = {
  name: SESSION_COOKIE,
  maxAge: SESSION_MAX_AGE,
};
