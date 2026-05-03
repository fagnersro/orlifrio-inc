'use client'

import { useActionState } from 'react'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import Logo from '../../website/components/ui/Logo'
import { forgotPasswordAction, type ForgotPasswordState } from './actions'

const initialState: ForgotPasswordState = {}

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(
    forgotPasswordAction,
    initialState,
  )

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-sm">
        <div
          style={{
            animation: 'slideUpFade 300ms ease-in-out backwards',
            animationDelay: '0ms',
          }}
        >
          <Logo className="w-36 mb-8" />
        </div>

        {state.success ? (
          <div
            style={{
              animation: 'slideUpFade 300ms ease-in-out backwards',
              animationDelay: '75ms',
            }}
          >
            <div className="rounded-xl border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 p-6 text-center">
              <CheckCircle className="mx-auto mb-3 size-10 text-green-500" />
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-1">
                Verifique seu email
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Se esse email estiver cadastrado, você receberá um link para
                redefinir sua senha em breve.
              </p>
            </div>
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              <Link
                href="/login"
                className="font-medium text-blue-500 hover:text-blue-600"
              >
                Voltar para o login
              </Link>
            </p>
          </div>
        ) : (
          <>
            <div
              style={{
                animation: 'slideUpFade 300ms ease-in-out backwards',
                animationDelay: '75ms',
              }}
            >
              <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
                Esqueceu a senha?
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Informe seu email e enviaremos um link para redefinir sua senha.
              </p>
            </div>

            <form
              action={formAction}
              className="mt-8 space-y-4"
              style={{
                animation: 'slideUpFade 300ms ease-in-out backwards',
                animationDelay: '150ms',
              }}
            >
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 dark:text-gray-50"
                >
                  E-mail
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  required
                  disabled={isPending}
                />
                {state.errors?.email?.[0] && (
                  <p className="text-xs text-red-500" role="alert">
                    {state.errors.email[0]}
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
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? 'Enviando...' : 'Enviar link'}
              </Button>
            </form>

            <p
              className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400"
              style={{
                animation: 'slideUpFade 300ms ease-in-out backwards',
                animationDelay: '225ms',
              }}
            >
              <Link
                href="/login"
                className="font-medium text-blue-500 hover:text-blue-600"
              >
                Voltar para o login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
