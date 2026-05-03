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
} from '@react-email/components'

interface PasswordResetEmailProps {
  resetUrl: string
  expiresInHours?: number
}

export function PasswordResetEmail({
  resetUrl,
  expiresInHours = 1,
}: PasswordResetEmailProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Redefinição de senha — Orlifrio Refrigeração</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>Orlifrio</Heading>
            <Text style={headerSubtitle}>Refrigeração</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Heading style={contentTitle}>Redefinição de senha</Heading>
            <Text style={paragraph}>
              Recebemos uma solicitação para redefinir a senha da sua conta.
              Clique no botão abaixo para criar uma nova senha.
            </Text>

            <Section style={buttonWrapper}>
              <Link href={resetUrl} style={button}>
                Redefinir senha
              </Link>
            </Section>

            <Text style={paragraph}>
              Este link expira em{' '}
              <strong>
                {expiresInHours} hora{expiresInHours !== 1 ? 's' : ''}
              </strong>
              . Se você não solicitou a redefinição de senha, ignore este
              email — sua conta está segura.
            </Text>

            <Hr style={divider} />

            <Text style={footerLink}>
              Ou copie e cole este link no navegador:{' '}
              <Link href={resetUrl} style={{ color: '#3b82f6' }}>
                {resetUrl}
              </Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Orlifrio Refrigeração. Todos os
              direitos reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const body: React.CSSProperties = {
  backgroundColor: '#f9fafb',
  fontFamily: "system-ui, -apple-system, 'Segoe UI', Arial, sans-serif",
  margin: 0,
  padding: 0,
}

const container: React.CSSProperties = {
  maxWidth: '480px',
  margin: '40px auto',
  padding: '0 16px',
}

const header: React.CSSProperties = {
  backgroundColor: '#0b2d7a',
  borderRadius: '8px 8px 0 0',
  padding: '24px 32px',
}

const headerTitle: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '22px',
  fontWeight: '800',
  margin: 0,
  lineHeight: 1.2,
}

const headerSubtitle: React.CSSProperties = {
  color: '#bae6fd',
  fontSize: '13px',
  margin: '4px 0 0',
}

const content: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '32px',
  border: '1px solid #e5e7eb',
  borderTop: 'none',
}

const contentTitle: React.CSSProperties = {
  fontSize: '20px',
  color: '#111827',
  margin: '0 0 8px',
  fontWeight: '700',
}

const paragraph: React.CSSProperties = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0 0 24px',
  lineHeight: '1.6',
}

const buttonWrapper: React.CSSProperties = {
  textAlign: 'center',
  margin: '0 0 24px',
}

const button: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: '#0b2d7a',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600',
  padding: '12px 28px',
  borderRadius: '6px',
  textDecoration: 'none',
}

const divider: React.CSSProperties = {
  borderColor: '#e5e7eb',
  margin: '16px 0',
}

const footerLink: React.CSSProperties = {
  fontSize: '12px',
  color: '#9ca3af',
  lineHeight: '1.5',
  margin: 0,
  wordBreak: 'break-all',
}

const footer: React.CSSProperties = {
  padding: '16px 0',
  textAlign: 'center',
}

const footerText: React.CSSProperties = {
  fontSize: '12px',
  color: '#9ca3af',
  margin: 0,
}
