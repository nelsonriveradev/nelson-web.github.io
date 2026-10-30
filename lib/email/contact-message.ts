export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export type ContactMessageResult =
  | { ok: true; value: ContactMessage }
  | { ok: false; error: string };

export const CONTACT_LIMITS = {
  name: 120,
  email: 200,
  message: 5000,
  minimumMessage: 10,
} as const;

// Deliberately simple: the real validation happens server-side on every entry
// point, and stricter parsing would reject valid addresses.
const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function normalizeSingleLine(value: string): string {
  return value
    .replace(/[\r\n\t]+/g, " ")
    .replace(CONTROL_CHARACTERS, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function normalizeMultiline(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARACTERS, "")
    .trim();
}

/**
 * Validates and normalizes a contact payload coming from the form or from an
 * internal API call. Returns Spanish, user-safe error messages.
 */
export function parseContactMessage(input: unknown): ContactMessageResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Los datos del mensaje no son válidos." };
  }

  const { name, email, message } = input as Record<string, unknown>;

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return { ok: false, error: "Completa tu nombre, correo y mensaje antes de enviar." };
  }

  const safeName = normalizeSingleLine(name);
  const safeEmail = normalizeSingleLine(email);
  const safeMessage = normalizeMultiline(message);

  if (!safeName || !safeEmail || !safeMessage) {
    return { ok: false, error: "Completa tu nombre, correo y mensaje antes de enviar." };
  }

  if (safeName.length < 2) {
    return { ok: false, error: "Escribe tu nombre completo." };
  }

  if (
    safeName.length > CONTACT_LIMITS.name ||
    safeEmail.length > CONTACT_LIMITS.email ||
    safeMessage.length > CONTACT_LIMITS.message
  ) {
    return { ok: false, error: "El mensaje es demasiado largo. Acórtalo e inténtalo de nuevo." };
  }

  if (safeMessage.length < CONTACT_LIMITS.minimumMessage) {
    return {
      ok: false,
      error: "Cuéntame un poco más sobre lo que necesitas (mínimo 10 caracteres).",
    };
  }

  if (!EMAIL_PATTERN.test(safeEmail)) {
    return { ok: false, error: "El correo electrónico no parece válido." };
  }

  return {
    ok: true,
    value: { name: safeName, email: safeEmail, message: safeMessage },
  };
}
