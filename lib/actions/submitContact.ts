"use server";

import { createHash } from "node:crypto";
import { after } from "next/server";

import { createClient } from "@/utils/supabase/server";
import type { ContactState } from "@/lib/contact";
import { getClientIp } from "@/lib/email/client-ip";
import { parseContactMessage } from "@/lib/email/contact-message";
import { notifyByEmail } from "@/lib/email/notify";
import { checkRateLimit } from "@/lib/rate-limit";

const SUCCESS_MESSAGE =
  "¡Mensaje enviado! Gracias por escribirme, te responderé en menos de 48 horas.";

export async function submitContact(
  _previousState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const parsed = parseContactMessage({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.ok) {
    return { status: "error", message: parsed.error };
  }

  const clientIp = await getClientIp();
  const limit = checkRateLimit(`contact:${clientIp}`);

  if (!limit.allowed) {
    const minutes = Math.max(1, Math.ceil(limit.retryAfterSeconds / 60));

    return {
      status: "error",
      message: `Recibimos varios mensajes seguidos. Espera ${minutes} minuto${
        minutes === 1 ? "" : "s"
      } e inténtalo de nuevo.`,
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("ContactForm").insert([parsed.value]);

    if (error) {
      console.error(
        "Error al guardar el mensaje de contacto:",
        error.code ?? "desconocido",
      );
      return {
        status: "error",
        message:
          "No pudimos enviar tu mensaje en este momento. Inténtalo de nuevo en unos minutos.",
      };
    }

    const recipientKey = createHash("sha256")
      .update(parsed.value.email.toLowerCase())
      .digest("hex");
    const recipientLimit = checkRateLimit(`contact-recipient:${recipientKey}`, {
      max: 3,
      windowMs: 60 * 60 * 1000,
    });

    after(async () => {
      await Promise.allSettled([
        notifyByEmail("notification-admin", parsed.value),
        recipientLimit.allowed
          ? notifyByEmail("notification-client", parsed.value)
          : Promise.resolve(false),
      ]);
    });

    return {
      status: "success",
      message: SUCCESS_MESSAGE,
    };
  } catch (error) {
    console.error(
      "Error inesperado al enviar el formulario:",
      error instanceof Error ? error.name : "Error desconocido",
    );
    return {
      status: "error",
      message: "Ocurrió un error inesperado. Inténtalo de nuevo.",
    };
  }
}
