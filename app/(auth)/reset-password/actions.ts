'use server'

import bcrypt from 'bcryptjs'
import { and, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

import { db } from '@/db'
import { users, verificationTokens } from '@/db/schema'
import { resetPasswordSchema } from '@/lib/schemas/auth'

export type ResetPasswordState = {
  errors?: {
    password?: string[]
    confirmPassword?: string[]
    _form?: string[]
  }
}

export async function resetPasswordAction(
  _prev: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get('token'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const { token, email, password } = parsed.data

  const [record] = await db
    .select()
    .from(verificationTokens)
    .where(
      and(
        eq(verificationTokens.identifier, email),
        eq(verificationTokens.token, token),
      ),
    )
    .limit(1)

  if (!record) {
    return { errors: { _form: ['Link inválido ou já utilizado.'] } }
  }

  if (record.expires < new Date()) {
    await db
      .delete(verificationTokens)
      .where(
        and(
          eq(verificationTokens.identifier, email),
          eq(verificationTokens.token, token),
        ),
      )
    return { errors: { _form: ['Link expirado. Solicite um novo.'] } }
  }

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (!user) {
    return { errors: { _form: ['Usuário não encontrado.'] } }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db
    .update(users)
    .set({ password: passwordHash })
    .where(eq(users.id, user.id))

  await db
    .delete(verificationTokens)
    .where(
      and(
        eq(verificationTokens.identifier, email),
        eq(verificationTokens.token, token),
      ),
    )

  redirect('/login?reset=true')
}
