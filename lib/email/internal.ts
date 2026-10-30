import "server-only";

import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

const INTERNAL_HEADER = "x-internal-api-key";
const MIN_SECRET_LENGTH = 24;
const MAX_BODY_BYTES = 12_000;

function jsonResponse(body: unknown, status: number): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

export function badRequest(): NextResponse {
  return jsonResponse({ error: "invalid_payload" }, 400);
}

export function rateLimited(retryAfterSeconds: number): NextResponse {
  return NextResponse.json(
    { error: "rate_limited" },
    {
      status: 429,
      headers: {
        "cache-control": "no-store",
        "retry-after": String(retryAfterSeconds),
      },
    },
  );
}

/**
 * Rejects requests that don't carry the shared secret used by the server
 * action. The secret never reaches the browser, so the routes can't be used as
 * an open email relay.
 */
export function verifyInternalRequest(request: Request): NextResponse | null {
  const expected = process.env.EMAIL_API_SECRET;

  if (!expected || expected.length < MIN_SECRET_LENGTH) {
    console.error(
      "[email] EMAIL_API_SECRET no está configurado (mínimo 24 caracteres).",
    );

    return jsonResponse({ error: "not_configured" }, 500);
  }

  const provided = request.headers.get(INTERNAL_HEADER) ?? "";
  const providedBuffer = Buffer.from(provided, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return jsonResponse({ error: "unauthorized" }, 401);
  }

  return null;
}

/**
 * Reads a JSON body with a hard size cap and without trusting the client.
 */
export async function readJsonBody(
  request: Request,
): Promise<{ ok: true; data: unknown } | { ok: false; response: NextResponse }> {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return {
      ok: false,
      response: jsonResponse({ error: "unsupported_media_type" }, 415),
    };
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");

  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return { ok: false, response: jsonResponse({ error: "payload_too_large" }, 413) };
  }

  const raw = await request.text();

  if (raw.length > MAX_BODY_BYTES) {
    return { ok: false, response: jsonResponse({ error: "payload_too_large" }, 413) };
  }

  try {
    return { ok: true, data: JSON.parse(raw) as unknown };
  } catch {
    return { ok: false, response: jsonResponse({ error: "invalid_json" }, 400) };
  }
}

export function methodNotAllowed(): NextResponse {
  return new NextResponse(null, {
    status: 405,
    headers: { allow: "POST", "cache-control": "no-store" },
  });
}

export function serverError(): NextResponse {
  return jsonResponse({ error: "internal_error" }, 500);
}

export function sendFailed(): NextResponse {
  return jsonResponse({ error: "send_failed" }, 502);
}

export function accepted(): NextResponse {
  return jsonResponse({ ok: true }, 200);
}
