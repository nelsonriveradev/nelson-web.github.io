import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null = null;

/**
 * Creates the SMTP transport lazily so that a missing configuration fails
 * inside the request (logged, never leaked to the client) instead of at
 * module load time.
 */
export function getMailTransporter(): Transporter {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GOOGLE_NODEMAILER_APP_TOKEN;

  if (!user || !pass) {
    throw new Error("Faltan las credenciales SMTP (GMAIL_USER / GOOGLE_NODEMAILER_APP_TOKEN).");
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });
  }

  return transporter;
}
