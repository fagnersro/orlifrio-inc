import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido').toLowerCase().trim(),
  password: z.string().min(1, 'Senha obrigatória'),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo')
    .trim(),
  email: z.string().email('Email inválido').toLowerCase().trim(),
  password: z
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Deve conter ao menos uma letra maiúscula')
    .regex(/[a-z]/, 'Deve conter ao menos uma letra minúscula')
    .regex(/[0-9]/, 'Deve conter ao menos um número'),
});