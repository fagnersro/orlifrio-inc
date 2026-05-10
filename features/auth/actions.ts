"use server"

import bcrypt from "bcryptjs"
import { and, eq } from "drizzle-orm"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

import { signIn, signOut } from "@/auth"
import { db } from "@/db"
import { users, verificationTokens } from "@/db/schema"
import { sendPasswordResetEmail } from "@/lib/email"

import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./schemas"

// ── Tipos de estado dos forms ───────────────────────────────────

export type FormState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
    _form?: string[]
  }
}

export type ForgotPasswordState = {
  success?: boolean
  errors?: {
    email?: string[]
    _form?: string[]
  }
}

export type ResetPasswordState = {
  errors?: {
    password?: string[]
    confirmPassword?: string[]
    _form?: string[]
  }
}

// ── Login ───────────────────────────────────────────────────────

export async function loginAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { errors: { _form: ["Email ou senha inválidos"] } }
      }
      return { errors: { _form: ["Erro ao entrar. Tente novamente."] } }
    }
    throw error // re-lança o redirect do Next
  }

  return {}
}

// ── Registro ────────────────────────────────────────────────────

export async function registerAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const { name, email, password } = parsed.data

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existing) {
    return { errors: { email: ["Este email já está cadastrado"] } }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  try {
    await db.insert(users).values({
      name,
      email,
      password: passwordHash,
    })
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
    return { errors: { _form: ["Erro ao criar conta. Tente novamente."] } }
  }

  // Login automático após registro
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  })

  return {}
}

// ── Logout ──────────────────────────────────────────────────────

export async function logoutAction() {
  await signOut({ redirectTo: "/login" })
}

// ── Recuperação de senha ────────────────────────────────────────

export async function forgotPasswordAction(
  _prev: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  })

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

      await db
        .insert(verificationTokens)
        .values({ identifier: email, token, expires })

      const baseUrl = process.env.AUTH_URL ?? "http://localhost:3000"
      const resetUrl = `${baseUrl}/reset-password?token=${token}&email=${encodeURIComponent(email)}`

      await sendPasswordResetEmail(email, resetUrl)
    }
  } catch (error) {
    console.error("[forgotPasswordAction]", error)
    return {
      errors: { _form: ["Erro ao processar solicitação. Tente novamente."] },
    }
  }

  // Sempre retorna sucesso para não revelar se o email existe
  return { success: true }
}

export async function resetPasswordAction(
  _prev: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
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
    return { errors: { _form: ["Link inválido ou já utilizado."] } }
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
    return { errors: { _form: ["Link expirado. Solicite um novo."] } }
  }

  const [user] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (!user) {
    return { errors: { _form: ["Usuário não encontrado."] } }
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

  redirect("/login?reset=true")
}
