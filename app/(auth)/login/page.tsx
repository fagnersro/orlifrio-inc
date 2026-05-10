// "use client"

// import React, { useState } from "react"
// import { RiGoogleFill, RiAppleFill } from "@remixicon/react"

// import { Button } from "@/components/Button"
// import { Divider } from "@/components/Divider"
// import { Input } from "@/components/Input"
// import { Label } from "@/components/Label"
// import Logo from "../website/components/ui/Logo"

// const AnimatedElement = ({
//   children,
//   index,
//   styles,
// }: {
//   children: React.ReactNode
//   index: number
//   styles?: React.CSSProperties
// }) => (
//   <div
//     style={{
//       animation: "slideUpFade 300ms ease-in-out backwards",
//       animationDelay: `${index * 75}ms`,
//       ...styles,
//     }}
//   >
//     {children}
//   </div>
// )

// export default function LoginPage() {
//   const [tab, setTab] = useState<"signin" | "signup">("signin")

//   return (
//     <div className="flex min-h-screen w-full">
//       {/* ── Left panel ── */}
//       <main className="flex flex-1 flex-col">
//         <div className="flex h-full flex-col items-center justify-center px-4 py-10 sm:px-0">
//           <div className="w-full sm:max-w-sm">
//             <AnimatedElement index={0}>
//               <Logo className="w-40 mb-8" />
//             </AnimatedElement>

//             <AnimatedElement index={1}>
//               <div className="space-y-1 mb-8">
//                 <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
//                   {tab === "signin" ? "Bem-vindo de volta" : "Crie sua conta"}
//                 </h2>
//                 <p className="text-sm text-gray-700 dark:text-gray-400">
//                   {tab === "signin"
//                     ? "Acesse sua conta para continuar."
//                     : "Preencha os dados para começar."}
//                 </p>
//               </div>
//             </AnimatedElement>

//             {/* Tabs */}
//             <AnimatedElement index={2}>
//               <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 mb-6">
//                 <button
//                   onClick={() => setTab("signin")}
//                   className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
//                     tab === "signin"
//                       ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
//                       : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
//                   }`}
//                 >
//                   Entrar
//                 </button>
//                 <button
//                   onClick={() => setTab("signup")}
//                   className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
//                     tab === "signup"
//                       ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
//                       : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
//                   }`}
//                 >
//                   Criar conta
//                 </button>
//               </div>
//             </AnimatedElement>

//             {/* Social buttons */}
//             <AnimatedElement index={3}>
//               <div className="flex w-full gap-3">
//                 <Button variant="secondary" className="w-full" type="button" aria-label="Entrar com Google">
//                   <span className="inline-flex items-center gap-2">
//                     <RiGoogleFill className="size-4 shrink-0" aria-hidden />
//                     Google
//                   </span>
//                 </Button>
//                 <Button variant="secondary" className="w-full" type="button" aria-label="Entrar com Apple">
//                   <span className="inline-flex items-center gap-2">
//                     <RiAppleFill className="size-4 shrink-0" aria-hidden />
//                     Apple
//                   </span>
//                 </Button>
//               </div>
//             </AnimatedElement>

//             <AnimatedElement index={4}>
//               <Divider>ou continue com</Divider>
//             </AnimatedElement>

//             <form onSubmit={(e) => e.preventDefault()}>
//               <div className="space-y-4">
//                 {tab === "signup" && (
//                   <AnimatedElement index={5}>
//                     <div className="space-y-2">
//                       <Label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-gray-50">
//                         Nome completo <span className="text-red-500">*</span>
//                       </Label>
//                       <Input
//                         type="text"
//                         id="name"
//                         name="name"
//                         autoComplete="name"
//                         placeholder="Seu nome"
//                         required
//                         aria-required="true"
//                       />
//                     </div>
//                   </AnimatedElement>
//                 )}

//                 <AnimatedElement index={tab === "signup" ? 6 : 5}>
//                   <div className="space-y-2">
//                     <Label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-gray-50">
//                       E-mail <span className="text-red-500">*</span>
//                     </Label>
//                     <Input
//                       type="email"
//                       id="email"
//                       name="email"
//                       autoComplete="email"
//                       placeholder="seu@email.com"
//                       required
//                       aria-required="true"
//                     />
//                   </div>
//                 </AnimatedElement>

//                 <AnimatedElement index={tab === "signup" ? 7 : 6}>
//                   <div className="space-y-2">
//                     <div className="flex justify-between items-center">
//                       <Label htmlFor="password" className="text-sm font-medium text-gray-900 dark:text-gray-50">
//                         Senha <span className="text-red-500">*</span>
//                       </Label>
//                       {tab === "signin" && (
//                         <a
//                           href="#"
//                           className="text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-600"
//                         >
//                           Esqueceu a senha?
//                         </a>
//                       )}
//                     </div>
//                     <Input
//                       type="password"
//                       id="password"
//                       name="password"
//                       autoComplete={tab === "signin" ? "current-password" : "new-password"}
//                       placeholder="••••••••"
//                       required
//                       aria-required="true"
//                     />
//                   </div>
//                 </AnimatedElement>
//               </div>

//               <AnimatedElement index={tab === "signup" ? 8 : 7}>
//                 <Button className="mt-6 w-full" type="submit">
//                   {tab === "signin" ? "Entrar" : "Criar conta"}
//                 </Button>
//               </AnimatedElement>
//             </form>

//             <AnimatedElement index={tab === "signup" ? 9 : 8}>
//               <p className="mt-4 text-xs text-gray-700 dark:text-gray-400">
//                 Ao continuar, você concorda com nossos{" "}
//                 <a href="#" className="text-blue-500 hover:text-blue-600">
//                   Termos de Serviço
//                 </a>{" "}
//                 e{" "}
//                 <a href="#" className="text-blue-500 hover:text-blue-600">
//                   Política de Privacidade.
//                 </a>
//               </p>
//             </AnimatedElement>
//           </div>
//         </div>

//         {/* Footer */}
//         <p className="text-sm text-gray-400 dark:text-gray-600 text-center pb-6">
//           © Orlifrio. Todos os direitos reservados.{" "}
//         </p>
//       </main>

//       {/* ── Right panel ── */}
//       <aside
//         className="hidden flex-1 overflow-hidden p-6 lg:flex"
//         aria-label="Vitrine do produto"
//       >
//         <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#0b2d7a] p-16 xl:p-24 relative overflow-hidden">
//           {/* Background grid */}
//           <div className="absolute inset-0 opacity-10">
//             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//               <defs>
//                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//                   <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
//                 </pattern>
//               </defs>
//               <rect width="100%" height="100%" fill="url(#grid)" />
//             </svg>
//           </div>

//           <div className="relative z-10 w-full max-w-sm flex flex-col gap-5">
//             <AnimatedElement index={7} styles={{ animationDelay: "400ms", animationDuration: "700ms" }}>
//               <Logo className="w-36 mb-6" variant="white" />
//               <h2 className="text-2xl font-extrabold leading-tight text-white">
//                 Controle total da sua<br />refrigeração comercial.
//               </h2>
//               <p className="mt-3 text-blue-100 text-base max-w-xs">
//                 Acompanhe serviços, economias e manutenções em um só lugar.
//               </p>
//             </AnimatedElement>

//             <AnimatedElement index={7} styles={{ animationDelay: "500ms", animationDuration: "900ms" }}>
//               {/* Card 1 */}
//               <div className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 shadow-xl">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="w-9 h-9 rounded-full bg-blue-400/30 flex items-center justify-center">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
//                       <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
//                       <polyline points="9 22 9 12 15 12 15 22" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="text-white text-sm font-semibold">Câmara frigorífica</p>
//                     <p className="text-blue-200 text-sm">Instalação concluída</p>
//                   </div>
//                 </div>
//                 <div className="h-2 rounded-full bg-white/20 overflow-hidden">
//                   <div className="h-full w-4/5 rounded-full bg-blue-300" />
//                 </div>
//                 <p className="text-blue-100 text-sm mt-1.5">80% de economia projetada</p>
//               </div>
//             </AnimatedElement>

//             <AnimatedElement index={8} styles={{ animationDelay: "600ms", animationDuration: "700ms" }}>
//               {/* Card 2 */}
//               <div className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 shadow-xl">
//                 <div className="flex items-center justify-between mb-3">
//                   <p className="text-blue-200 text-sm font-semibold uppercase tracking-wide">Economia este mês</p>
//                   <span className="text-sm text-green-300 bg-green-400/20 px-2 py-0.5 rounded-full font-semibold">+38%</span>
//                 </div>
//                 <p className="text-white text-2xl font-extrabold">R$ 4.800</p>
//                 <p className="text-blue-100 text-sm mt-1">em comparação ao mês anterior</p>
//               </div>
//             </AnimatedElement>
//           </div>
//         </div>
//       </aside>
//     </div>
//   )
// }
'use client'

import React, { useState, useActionState } from 'react'
import { signIn } from 'next-auth/react'
import { RiGoogleFill, RiAppleFill } from '@remixicon/react'

import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import Logo from '../../website/components/ui/Logo'

import { loginAction, registerAction, type FormState } from '@/features/auth/actions'

const AnimatedElement = ({
  children,
  index,
  styles,
}: {
  children: React.ReactNode
  index: number
  styles?: React.CSSProperties
}) => (
  <div
    style={{
      animation: 'slideUpFade 300ms ease-in-out backwards',
      animationDelay: `${index * 75}ms`,
      ...styles,
    }}
  >
    {children}
  </div>
)

const initialState: FormState = {}

// Componente de mensagem de erro reutilizável
const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="text-xs text-red-500 mt-1" role="alert">
      {message}
    </p>
  ) : null

export default function LoginPage() {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin')

  // Dois estados separados — um pra cada formulário
  const [signInState, signInFormAction, signInPending] = useActionState(
    loginAction,
    initialState
  )
  const [signUpState, signUpFormAction, signUpPending] = useActionState(
    registerAction,
    initialState
  )

  const isPending = tab === 'signin' ? signInPending : signUpPending
  const currentState = tab === 'signin' ? signInState : signUpState
  const formAction = tab === 'signin' ? signInFormAction : signUpFormAction

  // Login social via client-side signIn
  const handleSocialLogin = (provider: 'google' | 'apple') => {
    signIn(provider, { callbackUrl: '/' })
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* ── Left panel ── */}
      <main className="flex flex-1 flex-col">
        <div className="flex h-full flex-col items-center justify-center px-4 py-10 sm:px-0">
          <div className="w-full sm:max-w-sm">
            <AnimatedElement index={0}>
              <Logo className="w-40 mb-8" />
            </AnimatedElement>

            <AnimatedElement index={1}>
              <div className="space-y-1 mb-8">
                <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
                  {tab === 'signin' ? 'Bem-vindo de volta' : 'Crie sua conta'}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  {tab === 'signin'
                    ? 'Acesse sua conta para continuar.'
                    : 'Preencha os dados para começar.'}
                </p>
              </div>
            </AnimatedElement>

            {/* Tabs */}
            <AnimatedElement index={2}>
              <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 mb-6">
                <button
                  onClick={() => setTab('signin')}
                  type="button"
                  className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                    tab === 'signin'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  Entrar
                </button>
                <button
                  onClick={() => setTab('signup')}
                  type="button"
                  className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                    tab === 'signup'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  Criar conta
                </button>
              </div>
            </AnimatedElement>

            {/* Social buttons */}
            <AnimatedElement index={3}>
              <div className="flex w-full gap-3">
                <Button
                  variant="secondary"
                  className="w-full"
                  type="button"
                  aria-label="Entrar com Google"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isPending}
                >
                  <span className="inline-flex items-center gap-2">
                    <RiGoogleFill className="size-4 shrink-0" aria-hidden />
                    Google
                  </span>
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  type="button"
                  aria-label="Entrar com Apple"
                  onClick={() => handleSocialLogin('apple')}
                  disabled={isPending}
                >
                  <span className="inline-flex items-center gap-2">
                    <RiAppleFill className="size-4 shrink-0" aria-hidden />
                    Apple
                  </span>
                </Button>
              </div>
            </AnimatedElement>

            <AnimatedElement index={4}>
              <Divider>ou continue com</Divider>
            </AnimatedElement>

            {/* key força reset do form ao trocar de tab */}
            <form action={formAction} key={tab}>
              <div className="space-y-4">
                {tab === 'signup' && (
                  <AnimatedElement index={5}>
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-900 dark:text-gray-50"
                      >
                        Nome completo <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="name"
                        placeholder="Seu nome"
                        required
                        aria-required="true"
                        disabled={isPending}
                      />
                      <FieldError message={signUpState.errors?.name?.[0]} />
                    </div>
                  </AnimatedElement>
                )}

                <AnimatedElement index={tab === 'signup' ? 6 : 5}>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-900 dark:text-gray-50"
                    >
                      E-mail <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      placeholder="seu@email.com"
                      required
                      aria-required="true"
                      disabled={isPending}
                    />
                    <FieldError message={currentState.errors?.email?.[0]} />
                  </div>
                </AnimatedElement>

                <AnimatedElement index={tab === 'signup' ? 7 : 6}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-900 dark:text-gray-50"
                      >
                        Senha <span className="text-red-500">*</span>
                      </Label>
                      {tab === 'signin' && (
                        <a
                          href="/forgot-password"
                          className="text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-600"
                        >
                          Esqueceu a senha?
                        </a>
                      )}
                      </div>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      autoComplete={
                        tab === 'signin' ? 'current-password' : 'new-password'
                      }
                      placeholder="••••••••"
                      required
                      aria-required="true"
                      disabled={isPending}
                    />
                    <FieldError message={currentState.errors?.password?.[0]} />
                  </div>
                </AnimatedElement>
              </div>

              {/* Erro geral do formulário */}
              {currentState.errors?._form && (
                <div
                  className="mt-4 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 p-3"
                  role="alert"
                >
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {currentState.errors._form[0]}
                  </p>
                </div>
              )}

              <AnimatedElement index={tab === 'signup' ? 8 : 7}>
                <Button
                  className="mt-6 w-full"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending
                    ? tab === 'signin'
                      ? 'Entrando...'
                      : 'Criando conta...'
                    : tab === 'signin'
                      ? 'Entrar'
                      : 'Criar conta'}
                </Button>
              </AnimatedElement>
            </form>

            <AnimatedElement index={tab === 'signup' ? 9 : 8}>
              <p className="mt-4 text-xs text-gray-700 dark:text-gray-400">
                Ao continuar, você concorda com nossos{' '}
                <a href="#" className="text-blue-500 hover:text-blue-600">
                  Termos de Serviço
                </a>{' '}
                e{' '}
                <a href="#" className="text-blue-500 hover:text-blue-600">
                  Política de Privacidade.
                </a>
              </p>
            </AnimatedElement>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 dark:text-gray-600 text-center pb-6">
          © Orlifrio. Todos os direitos reservados.{' '}
        </p>
      </main>

      {/* ── Right panel ── (sem alterações) */}
      <aside
        className="hidden flex-1 overflow-hidden p-6 lg:flex"
        aria-label="Vitrine do produto"
      >
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#0b2d7a] p-16 xl:p-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 w-full max-w-sm flex flex-col gap-5">
            <AnimatedElement
              index={7}
              styles={{ animationDelay: '400ms', animationDuration: '700ms' }}
            >
              <Logo className="w-36 mb-6" variant="white" />
              <h2 className="text-2xl font-extrabold leading-tight text-white">
                Controle total da sua
                <br />
                refrigeração comercial.
              </h2>
              <p className="mt-3 text-blue-100 text-base max-w-xs">
                Acompanhe serviços, economias e manutenções em um só lugar.
              </p>
            </AnimatedElement>

            <AnimatedElement
              index={7}
              styles={{ animationDelay: '500ms', animationDuration: '900ms' }}
            >
              <div className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-blue-400/30 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      className="w-5 h-5"
                    >
                      <path
                        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      Câmara frigorífica
                    </p>
                    <p className="text-blue-200 text-sm">
                      Instalação concluída
                    </p>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                  <div className="h-full w-4/5 rounded-full bg-blue-300" />
                </div>
                <p className="text-blue-100 text-sm mt-1.5">
                  80% de economia projetada
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement
              index={8}
              styles={{ animationDelay: '600ms', animationDuration: '700ms' }}
            >
              <div className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-blue-200 text-sm font-semibold uppercase tracking-wide">
                    Economia este mês
                  </p>
                  <span className="text-sm text-green-300 bg-green-400/20 px-2 py-0.5 rounded-full font-semibold">
                    +38%
                  </span>
                </div>
                <p className="text-white text-2xl font-extrabold">R$ 4.800</p>
                <p className="text-blue-100 text-sm mt-1">
                  em comparação ao mês anterior
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </aside>
    </div>
  )
}