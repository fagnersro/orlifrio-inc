'use server'

import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { users, verificationTokens } from '@/db/schema'
import { sendPasswordResetEmail } from '@/lib/email'
import { forgotPasswordSchema } from '@/lib/schemas/auth'

export type ForgotPasswordState = {
  success?: boolean
  errors?: {
    email?: string[]
    _form?: string[]
  }
}

export async function forgotPasswordAction(
  _prev: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const parsed = forgotPasswordSchema.safeParse({ email: formData.get('email') })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const { email } = parsed.data

  try {
    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (user) {
      // Remove tokens anteriores para o mesmo email
      await db
        .delete(verificationTokens)
        .where(eq(verificationTokens.identifier, email))

      const token = crypto.randomUUID()
      const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hora

      await db.insert(verificationTokens).values({ identifier: email, token, expires })

      const baseUrl = process.env.AUTH_URL ?? 'http://localhost:3000'
      const resetUrl = `${baseUrl}/reset-password?token=${token}&email=${encodeURIComponent(email)}`

      await sendPasswordResetEmail(email, resetUrl)
    }
  } catch (error) {
    console.error('[forgotPasswordAction]', error)
    return { errors: { _form: ['Erro ao processar solicitação. Tente novamente.'] } }
  }

  // Sempre retorna sucesso para não revelar se o email existe
  return { success: true }
}
