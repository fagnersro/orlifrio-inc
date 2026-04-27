"use client"

import { useState } from "react"
import Logo from "../website/components/ui/Logo"

export default function LoginPage() {
  const [tab, setTab] = useState<"signin" | "signup">("signin")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-950">
      {/* ── Left panel ── */}
      <div className="flex flex-col w-full lg:w-1/2 px-8 sm:px-16 py-10 bg-white dark:bg-gray-950">
        {/* Logo — aumentada */}
        <Logo className="w-52" />

        {/* Form area */}
        <div className="flex flex-col flex-1 justify-center max-w-sm w-full mx-auto">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
            Bem-vindo à Orlifrio
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-300 mb-8">
            Acesse sua conta ou crie uma nova para continuar.
          </p>

          {/* Tabs */}
          <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1 mb-8">
            <button
              onClick={() => setTab("signin")}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                tab === "signin"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                tab === "signup"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Criar conta
            </button>
          </div>

          <form className="flex flex-col gap-4">
            {tab === "signup" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  Nome completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                Senha <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" strokeLinecap="round" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" strokeLinecap="round" />
                      <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {tab === "signin" && (
              <div className="text-right">
                <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Esqueceu a senha?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-sm py-3 rounded-lg transition-colors mt-1"
            >
              {tab === "signin" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">ou continue com</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Social buttons */}
          <div className="flex gap-3">
            {[
              {
                label: "Google",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                ),
              },
              {
                label: "Apple",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-800 dark:text-gray-100" fill="currentColor" aria-hidden>
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                ),
              },
              {
                label: "Facebook",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#1877F2" aria-hidden>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                ),
              },
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                aria-label={`Entrar com ${label}`}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 rounded-lg py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 dark:text-gray-600 text-center mt-6">
          © Orlifrio. Todos os direitos reservados.{" "}
          <a href="#" className="hover:underline dark:text-gray-500 dark:hover:text-gray-300">Termos</a>{" "}
          ·{" "}
          <a href="#" className="hover:underline dark:text-gray-500 dark:hover:text-gray-300">Privacidade</a>
        </p>
      </div>

      {/* ── Right panel ── */}
      <div className="hidden lg:flex flex-col w-1/2 bg-[#0b2d7a] relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating cards */}
        <div className="flex flex-col flex-1 items-center justify-center px-12 relative z-10 gap-5">
          {/* Card 1 */}
          <div className="w-full max-w-xs bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-blue-400/30 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Câmara frigorífica</p>
                <p className="text-blue-200 text-sm">Instalação concluída</p>
              </div>
            </div>
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full w-4/5 rounded-full bg-blue-300" />
            </div>
            <p className="text-blue-100 text-sm mt-1.5">80% de economia projetada</p>
          </div>

          {/* Card 2 */}
          <div className="w-full max-w-xs bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 shadow-xl self-end">
            <p className="text-blue-200 text-sm font-semibold uppercase tracking-wide mb-2">Último atendimento</p>
            <p className="text-white text-base font-bold mb-1">Reparo em balcão frigorífico</p>
            <p className="text-blue-100 text-sm">Concluído em 3h 20min · Cliente satisfeito</p>
            <div className="flex gap-1 mt-3">
              {[1,2,3,4,5].map((s) => (
                <svg key={s} viewBox="0 0 20 20" fill="#fbbf24" className="w-4 h-4">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-full max-w-xs bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <p className="text-blue-200 text-sm font-semibold uppercase tracking-wide">Economia este mês</p>
              <span className="text-sm text-green-300 bg-green-400/20 px-2 py-0.5 rounded-full font-semibold">+38%</span>
            </div>
            <p className="text-white text-2xl font-extrabold">R$ 4.800</p>
            <p className="text-blue-100 text-sm mt-1">em comparação ao mês anterior</p>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10 px-12 pb-12 text-center">
          <Logo className="w-44 mx-auto mb-4" variant="white" />
          <p className="text-white text-xl font-extrabold leading-tight">
            Controle total da sua<br />refrigeração comercial.
          </p>
          <p className="text-blue-100 text-base mt-2 max-w-xs mx-auto">
            Acompanhe serviços, economias e manutenções em um só lugar.
          </p>
        </div>
      </div>
    </div>
  )
}
