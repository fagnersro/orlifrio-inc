'use server';

import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import { users } from '@/db/schema';
import { signIn } from '@/auth';
import { registerSchema } from '@/lib/schemas/auth';

export type RegisterState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  success?: boolean;
};

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  // 1. Validar entrada
  const parsed = registerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;

  // 2. Verificar se email já existe
  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing) {
    return {
      errors: { email: ['Este email já está cadastrado'] },
    };
  }

  // 3. Hash da senha
  const passwordHash = await bcrypt.hash(password, 10);

  // 4. Inserir no banco
  try {
    await db.insert(users).values({
      name,
      email,
      password: passwordHash,
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return {
      errors: { _form: ['Erro ao criar conta. Tente novamente.'] },
    };
  }

  // 5. Login automático após registro
  await signIn('credentials', {
    email,
    password,
    redirectTo: '/',
  });

  // signIn já redireciona, então essa linha nunca executa,
  // mas TypeScript fica feliz
  return { success: true };
}