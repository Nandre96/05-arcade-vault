import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import type { ContactPayload } from "@/app/data/types";

export default function ContactEmail({ name, email, message }: ContactPayload) {
  return (
    <Html lang="es">
      <Head />
      <Preview>{`Nuevo mensaje de ${name}`}</Preview>
      <Body style={{ backgroundColor: "#0a0a0f", fontFamily: "monospace", color: "#e8e8f0", margin: 0 }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", padding: "32px 24px" }}>
          <Heading as="h1" style={{ color: "#00f5ff", fontSize: 20, letterSpacing: "0.08em" }}>
            ▸ NUEVO MENSAJE · ARCADE VAULT
          </Heading>
          <Section>
            <Text style={{ margin: "0 0 4px", color: "#8a8aa0", fontSize: 12 }}>NOMBRE</Text>
            <Text style={{ margin: "0 0 16px", fontSize: 15 }}>{name}</Text>
            <Text style={{ margin: "0 0 4px", color: "#8a8aa0", fontSize: 12 }}>CORREO</Text>
            <Text style={{ margin: "0 0 16px", fontSize: 15 }}>{email}</Text>
            <Text style={{ margin: "0 0 4px", color: "#8a8aa0", fontSize: 12 }}>MENSAJE</Text>
            <Text style={{ margin: 0, fontSize: 15, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
