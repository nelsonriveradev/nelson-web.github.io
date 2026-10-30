import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "react-email";

export type NotificationAdminEmailProps = {
  name: string;
  email: string;
  message: string;
  receivedAt: string;
  siteUrl: string;
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

export default function NotificationAdminEmail({
  name = "María González",
  email = "maria@ejemplo.com",
  message = "Hola Nelson, vi tu portafolio y me gustaría cotizar una landing page para mi negocio.\n\n¿Tienes disponibilidad este mes?",
  receivedAt = "30 de octubre de 2026, 14:35 (UTC)",
  siteUrl = "https://nelsonrivera.dev",
}: NotificationAdminEmailProps) {
  const replyHref = `mailto:${email}?subject=${encodeURIComponent(
    "Re: tu mensaje a Nelson Rivera",
  )}`;

  return (
    <Html lang="es">
      <Head />
      <Preview>Nuevo mensaje de {name} desde el formulario de contacto</Preview>
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
              Nuevo contacto
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
              Tienes un mensaje nuevo
            </Heading>
            <Text style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "24px", color: colors.body }}>
              Alguien acaba de enviar el formulario de contacto de tu sitio.
              Responde directamente a este correo para contestarle.
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
              <Row>
                <Column style={{ width: "92px", verticalAlign: "top" }}>
                  <Text style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: colors.subtle }}>
                    Nombre
                  </Text>
                </Column>
                <Column>
                  <Text
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: "22px",
                      fontWeight: 600,
                      color: colors.heading,
                      wordBreak: "break-word",
                    }}
                  >
                    {name}
                  </Text>
                </Column>
              </Row>

              <Row>
                <Column style={{ width: "92px", verticalAlign: "top" }}>
                  <Text style={{ margin: "12px 0 0", fontSize: "12px", fontWeight: 700, color: colors.subtle }}>
                    Correo
                  </Text>
                </Column>
                <Column>
                  <Text style={{ margin: "12px 0 0", fontSize: "14px", lineHeight: "22px", wordBreak: "break-word" }}>
                    <Link href={`mailto:${email}`} style={{ color: colors.teal, textDecoration: "underline" }}>
                      {email}
                    </Link>
                  </Text>
                </Column>
              </Row>

              <Row>
                <Column style={{ width: "92px", verticalAlign: "top" }}>
                  <Text style={{ margin: "12px 0 0", fontSize: "12px", fontWeight: 700, color: colors.subtle }}>
                    Recibido
                  </Text>
                </Column>
                <Column>
                  <Text style={{ margin: "12px 0 0", fontSize: "14px", lineHeight: "22px", color: colors.body }}>
                    {receivedAt}
                  </Text>
                </Column>
              </Row>
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
              Mensaje
            </Text>
            <Section
              style={{
                padding: "18px 20px",
                backgroundColor: colors.mint,
                borderLeft: `3px solid ${colors.teal}`,
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
            </Section>

            <Section style={{ marginTop: "28px" }}>
              <Link
                href={replyHref}
                style={{
                  display: "inline-block",
                  padding: "13px 24px",
                  borderRadius: "999px",
                  backgroundColor: colors.teal,
                  color: colors.mint,
                  fontSize: "14px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Responder a {name}
              </Link>
            </Section>

            <Text style={{ margin: "14px 0 0", fontSize: "12px", lineHeight: "20px", color: colors.subtle }}>
              Si el botón no funciona, escribe a{" "}
              <Link href={`mailto:${email}`} style={{ color: colors.teal, textDecoration: "underline" }}>
                {email}
              </Link>
              .
            </Text>

            <Hr style={{ margin: "28px 0 18px", borderColor: colors.border }} />

            <Text style={{ margin: 0, fontSize: "12px", lineHeight: "20px", color: colors.subtle }}>
              Enviado desde el formulario de{" "}
              <Link href={siteUrl} style={{ color: colors.teal, textDecoration: "underline" }}>
                {siteUrl.replace(/^https?:\/\//, "")}
              </Link>
              . El mensaje también quedó guardado en la tabla ContactForm de Supabase.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

NotificationAdminEmail.PreviewProps = {
  name: "María González",
  email: "maria@ejemplo.com",
  message:
    "Hola Nelson, vi tu portafolio y me gustaría cotizar una landing page para mi negocio.\n\n¿Tienes disponibilidad este mes?",
  receivedAt: "30 de octubre de 2026, 14:35 (UTC)",
  siteUrl: "https://nelsonrivera.dev",
} satisfies NotificationAdminEmailProps;
