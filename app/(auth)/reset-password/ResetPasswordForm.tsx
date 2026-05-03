'use client'

import { useActionState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { resetPasswordAction, type ResetPasswordState } from './actions'

interface ResetPasswordFormProps {
  token: string
  email: string
}

const initialState: ResetPasswordState = {}

export function ResetPasswordForm({ token, email }: ResetPasswordFormProps) {
  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    initialState,
  )

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="email" value={email} />

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-sm font-medium text-gray-900 dark:text-gray-50"
        >
          Nova senha
        </Label>
        <Input
          type="password"
          id="password"
          name="password"
          autoComplete="new-password"
          placeholder="••••••••"
          required
          disabled={isPending}
        />
        {state.errors?.password?.[0] && (
          <p className="text-xs text-red-500" role="alert">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-gray-900 dark:text-gray-50"
        >
          Confirmar nova senha
        </Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="••••••••"
          required
          disabled={isPending}
        />
        {state.errors?.confirmPassword?.[0] && (
          <p className="text-xs text-red-500" role="alert">
            {state.errors.confirmPassword[0]}
          </p>
        )}
      </div>

      {state.errors?._form?.[0] && (
        <div
          className="rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 p-3"
          role="alert"
        >
          <p className="text-sm text-red-600 dark:text-red-400">
            {state.errors._form[0]}
            {state.errors._form[0].includes('expirado') && (
              <>
                {' '}
                <Link
                  href="/forgot-password"
                  className="font-medium text-blue-500 hover:text-blue-600 underline"
                >
                  Solicitar novo link
                </Link>
              </>
            )}
          </p>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Salvando...' : 'Redefinir senha'}
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        <Link
          href="/login"
          className="font-medium text-blue-500 hover:text-blue-600"
        >
          Voltar para o login
        </Link>
      </p>
    </form>
  )
}
