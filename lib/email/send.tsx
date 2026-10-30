import "server-only";

import { render } from "react-email";

import NotificationAdminEmail from "@/emails/notification-admin";
import NotificationClientEmail from "@/emails/notification-client";
import { getMailTransporter } from "@/lib/nodemailer";
import {
  GITHUB_URL,
  getContactEmail,
  getNotificationRecipient,
  getSenderAddress,
  getSiteUrl,
} from "./config";
import type { ContactMessage } from "./contact-message";

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "UTC",
});

function formatTimestamp(date: Date): string {
  return `${dateFormatter.format(date)} (UTC)`;
}

function toSubjectValue(value: string, maxLength = 80): string {
  return value
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export async function sendAdminNotificationEmail(
  message: ContactMessage,
): Promise<void> {
  const transporter = getMailTransporter();
  const receivedAt = formatTimestamp(new Date());
  const siteUrl = getSiteUrl();
  const props = { ...message, receivedAt, siteUrl };

  const [html, text] = await Promise.all([
    render(<NotificationAdminEmail {...props} />),
    render(<NotificationAdminEmail {...props} />, { plainText: true }),
  ]);

  await transporter.sendMail({
    from: { name: "Formulario de contacto", address: getSenderAddress() },
    to: getNotificationRecipient(),
    replyTo: { name: message.name, address: message.email },
    subject: `Nuevo mensaje de ${toSubjectValue(message.name)}`,
    text,
    html,
  });
}

export async function sendClientConfirmationEmail(
  message: ContactMessage,
): Promise<void> {
  const transporter = getMailTransporter();
  const receivedAt = formatTimestamp(new Date());
  const siteUrl = getSiteUrl();
  const contactEmail = getContactEmail();
  const props = {
    name: message.name,
    message: message.message,
    receivedAt,
    siteUrl,
    contactEmail,
    githubUrl: GITHUB_URL,
  };

  const [html, text] = await Promise.all([
    render(<NotificationClientEmail {...props} />),
    render(<NotificationClientEmail {...props} />, { plainText: true }),
  ]);

  await transporter.sendMail({
    from: { name: "Nelson Rivera", address: getSenderAddress() },
    to: { name: message.name, address: message.email },
    replyTo: { name: "Nelson Rivera", address: getContactEmail() },
    subject: `${message.name} Gracias por contactarme estaré respondiendo en 24 horas o menos`,
    text,
    html,
    headers: {
      // Avoid out-of-office replies bouncing between inboxes.
      "X-Auto-Response-Suppress": "OOF",
    },
  });
}
