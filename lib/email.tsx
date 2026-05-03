import { render } from '@react-email/components'
import { Resend } from 'resend'
import { PasswordResetEmail } from './emails/password-reset'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM =
  process.env.RESEND_FROM_EMAIL ?? 'Orlifrio <onboarding@resend.dev>'

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const html = await render(<PasswordResetEmail resetUrl={resetUrl} />)

  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Redefinição de senha — Orlifrio',
    html,
  })
}
