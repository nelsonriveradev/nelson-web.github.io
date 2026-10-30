import "server-only";

/** Public site URL, used for links inside emails and for internal API calls. */
export function getSiteUrl(): string {
  const candidates = [
    process.env.SITE_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;

    try {
      return new URL(candidate).origin;
    } catch {
      // Ignore malformed values and try the next one.
    }
  }

  return "http://localhost:3000";
}

/** Where contact notifications are delivered. Never taken from user input. */
export function getNotificationRecipient(): string {
  return (
    process.env.CONTACT_NOTIFICATION_EMAIL ??
    process.env.GMAIL_USER ??
    "nelsonrivera.dev@gmail.com"
  );
}

/** Public address shown to clients and used as reply-to. */
export function getContactEmail(): string {
  return process.env.CONTACT_PUBLIC_EMAIL ?? "nelsonrivera.dev@gmail.com";
}

export function getSenderAddress(): string {
  const sender = process.env.GMAIL_USER;

  if (!sender) {
    throw new Error("Falta la variable de entorno GMAIL_USER.");
  }

  return sender;
}

export const GITHUB_URL = "https://github.com/nelsonriveradev";
