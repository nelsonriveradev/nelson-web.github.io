import {
  accepted,
  badRequest,
  methodNotAllowed,
  rateLimited,
  readJsonBody,
  sendFailed,
  verifyInternalRequest,
} from "@/lib/email/internal";
import { parseContactMessage } from "@/lib/email/contact-message";
import { sendAdminNotificationEmail } from "@/lib/email/send";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const unauthorized = verifyInternalRequest(request);
  if (unauthorized) return unauthorized;

  const limit = checkRateLimit("email-api:notification-admin", {
    max: 30,
    windowMs: 60_000,
  });
  if (!limit.allowed) return rateLimited(limit.retryAfterSeconds);

  const body = await readJsonBody(request);
  if (!body.ok) return body.response;

  const parsed = parseContactMessage(body.data);
  if (!parsed.ok) return badRequest();

  try {
    await sendAdminNotificationEmail(parsed.value);
    return accepted();
  } catch (error) {
    // Never log the message body or the sender address.
    console.error(
      "[email] No se pudo enviar la notificación al administrador:",
      error instanceof Error ? error.name : "Error desconocido",
    );

    return sendFailed();
  }
}

export function GET() {
  return methodNotAllowed();
}

export function PUT() {
  return methodNotAllowed();
}

export function PATCH() {
  return methodNotAllowed();
}

export function DELETE() {
  return methodNotAllowed();
}
