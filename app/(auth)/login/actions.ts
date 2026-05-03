'use server';

import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { AuthError } from 'next-auth';

import { db } from '@/db';
import { users } from '@/db/schema';
import { signIn, signOut } from '@/auth';
import { loginSchema, registerSchema } from '@/lib/schemas/auth';

export type FormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
};

// ============= LOGIN =============
export async function loginAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: '/',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { errors: { _form: ['Email ou senha inválidos'] } };
      }
      return { errors: { _form: ['Erro ao entrar. Tente novamente.'] } };
    }
    throw error; // re-lança o redirect do Next
  }

  return {};
}

// ============= REGISTRO =============
export async function registerAction(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = registerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing) {
    return { errors: { email: ['Este email já está cadastrado'] } };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({
      name,
      email,
      password: passwordHash,
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return { errors: { _form: ['Erro ao criar conta. Tente novamente.'] } };
  }

  // Login automático após registro
  await signIn('credentials', {
    email,
    password,
    redirectTo: '/',
  });

  return {};
}

// ============= LOGOUT =============
export async function logoutAction() {
  await signOut({ redirectTo: '/login' });
}