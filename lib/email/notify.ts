import "server-only";

import { getSiteUrl } from "./config";
import type { ContactMessage } from "./contact-message";

type EmailEndpoint = "notification-admin" | "notification-client";

/**
 * Calls the internal email routes. The shared secret is read from the server
 * environment, so it is never exposed to the browser.
 */
export async function notifyByEmail(
  endpoint: EmailEndpoint,
  message: ContactMessage,
): Promise<boolean> {
  const secret = process.env.EMAIL_API_SECRET;

  if (!secret) {
    console.warn(
      "[email] EMAIL_API_SECRET no está configurado; no se enviaron notificaciones.",
    );
    return false;
  }

  try {
    const response = await fetch(`${getSiteUrl()}/api/send-email/${endpoint}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-internal-api-key": secret,
      },
      body: JSON.stringify(message),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      console.error(`[email] ${endpoint} respondió con estado ${response.status}.`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(
      `[email] No se pudo contactar ${endpoint}:`,
      error instanceof Error ? error.name : "Error desconocido",
    );
    return false;
  }
}
