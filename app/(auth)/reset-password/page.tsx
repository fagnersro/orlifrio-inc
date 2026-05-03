import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

import Logo from '../../website/components/ui/Logo'
import { ResetPasswordForm } from './ResetPasswordForm'

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string; email?: string }>
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token, email } = await searchParams

  const isInvalid = !token || !email

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

        <div
          style={{
            animation: 'slideUpFade 300ms ease-in-out backwards',
            animationDelay: '75ms',
          }}
        >
          {isInvalid ? (
            <>
              <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30 p-6 text-center">
                <AlertCircle className="mx-auto mb-3 size-10 text-red-500" />
                <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-1">
                  Link inválido
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Este link de redefinição de senha é inválido ou está incompleto.
                </p>
              </div>
              <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                <Link
                  href="/forgot-password"
                  className="font-medium text-blue-500 hover:text-blue-600"
                >
                  Solicitar novo link
                </Link>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
                Criar nova senha
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Escolha uma senha forte para sua conta.
              </p>
              <ResetPasswordForm token={token} email={email} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
