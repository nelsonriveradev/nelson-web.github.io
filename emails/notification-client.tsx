import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";

export type NotificationClientEmailProps = {
  name: string;
  message: string;
  receivedAt: string;
  siteUrl: string;
  contactEmail: string;
  githubUrl: string;
};

const colors = {
  charcoal: "#2C3333",
  teal: "#395B64",
  sage: "#A5C9CA",
  mint: "#E7F6F2",
  canvas: "#F1FBF8",
  border: "#DCEBE8",
  heading: "#1F2A2A",
  body: "#4B5A5A",
  subtle: "#7A8A88",
};

const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export default function NotificationClientEmail({
  name = "María",
  message = "Hola Nelson, vi tu portafolio y me gustaría cotizar una landing page para mi negocio.\n\n¿Tienes disponibilidad este mes?",
  receivedAt = "30 de octubre de 2026, 14:35 (UTC)",
  siteUrl = "https://nelsonrivera.dev",
  contactEmail = "nelsonrivera.dev@gmail.com",
  githubUrl = "https://github.com/nelsonriveradev",
}: NotificationClientEmailProps) {
  const siteLabel = siteUrl.replace(/^https?:\/\//, "");

  return (
    <Html lang="es">
      <Head />
      <Preview>Recibí tu mensaje, {name}. Te respondo en 48 horas o menos.</Preview>
      <Body style={{ backgroundColor: colors.canvas, margin: 0, padding: "32px 12px", fontFamily }}>
        <Container
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            border: `1px solid ${colors.border}`,
            overflow: "hidden",
          }}
        >
          <Section style={{ backgroundColor: colors.charcoal, padding: "26px 32px" }}>
            <Text
              style={{
                margin: 0,
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: colors.mint,
              }}
            >
              Nelson<span style={{ color: colors.sage }}>.dev</span>
            </Text>
            <Text
              style={{
                margin: "10px 0 0",
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: "999px",
                backgroundColor: colors.sage,
                color: colors.charcoal,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Mensaje recibido
            </Text>
          </Section>

          <Section style={{ padding: "32px" }}>
            <Heading
              as="h1"
              style={{
                margin: 0,
                fontSize: "22px",
                lineHeight: "30px",
                fontWeight: 700,
                color: colors.heading,
              }}
            >
              ¡Gracias por escribirme, {name}!
            </Heading>
            <Text style={{ margin: "14px 0 0", fontSize: "15px", lineHeight: "24px", color: colors.body }}>
              Ya recibí tu mensaje y lo tengo en mi bandeja de entrada. Te
              responderé en un plazo máximo de{" "}
              <strong style={{ color: colors.heading }}>48 horas</strong>.
            </Text>

            <Section
              style={{
                marginTop: "24px",
                padding: "18px 20px",
                backgroundColor: colors.canvas,
                border: `1px solid ${colors.border}`,
                borderRadius: "12px",
              }}
            >
              <Text
                style={{
                  margin: 0,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: colors.teal,
                }}
              >
                Tiempo de respuesta
              </Text>
              <Text
                style={{
                  margin: "6px 0 0",
                  fontSize: "15px",
                  lineHeight: "24px",
                  fontWeight: 600,
                  color: colors.heading,
                }}
              >
                48 horas o menos
              </Text>
              <Text style={{ margin: "4px 0 0", fontSize: "13px", lineHeight: "21px", color: colors.body }}>
                Si necesitas algo urgente, puedes responder directamente a este
                correo y lo veré antes.
              </Text>
            </Section>

            <Text
              style={{
                margin: "28px 0 8px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: colors.teal,
              }}
            >
              Copia de tu mensaje
            </Text>
            <Section
              style={{
                padding: "18px 20px",
                backgroundColor: colors.mint,
                borderLeft: `3px solid ${colors.sage}`,
                borderRadius: "10px",
              }}
            >
              <Text
                style={{
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: "24px",
                  color: colors.heading,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {message}
              </Text>
              <Text style={{ margin: "12px 0 0", fontSize: "12px", lineHeight: "20px", color: colors.subtle }}>
                Enviado el {receivedAt}
              </Text>
            </Section>

            <Hr style={{ margin: "28px 0 20px", borderColor: colors.border }} />

            <Text style={{ margin: 0, fontSize: "15px", lineHeight: "24px", color: colors.heading, fontWeight: 600 }}>
              Nelson Rivera
            </Text>
            <Text style={{ margin: "2px 0 0", fontSize: "13px", lineHeight: "21px", color: colors.body }}>
              Desarrollador Web
            </Text>

            <Text style={{ margin: "14px 0 0", fontSize: "13px", lineHeight: "22px", color: colors.body }}>
              <Link href={siteUrl} style={{ color: colors.teal, textDecoration: "underline" }}>
                {siteLabel}
              </Link>
              {"  ·  "}
              <Link href={`mailto:${contactEmail}`} style={{ color: colors.teal, textDecoration: "underline" }}>
                {contactEmail}
              </Link>
              {"  ·  "}
              <Link href={githubUrl} style={{ color: colors.teal, textDecoration: "underline" }}>
                GitHub
              </Link>
            </Text>

            <Text style={{ margin: "20px 0 0", fontSize: "11px", lineHeight: "18px", color: colors.subtle }}>
              Este correo se envió automáticamente porque usaste el formulario de
              contacto de {siteLabel}. Puedes responder a este mensaje o
              escribirme a {contactEmail}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

NotificationClientEmail.PreviewProps = {
  name: "María",
  message:
    "Hola Nelson, vi tu portafolio y me gustaría cotizar una landing page para mi negocio.\n\n¿Tienes disponibilidad este mes?",
  receivedAt: "30 de octubre de 2026, 14:35 (UTC)",
  siteUrl: "https://nelsonrivera.dev",
  contactEmail: "nelsonrivera.dev@gmail.com",
  githubUrl: "https://github.com/nelsonriveradev",
} satisfies NotificationClientEmailProps;
