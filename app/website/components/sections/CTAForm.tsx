import Container from "../ui/Container"
import Logo from "../ui/Logo"

export default function CTAForm() {
  return (
    <section className="relative bg-gradient-to-r from-sky-500 via-blue-600 to-blue-800 py-16 overflow-hidden">
      <Container>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Lado esquerdo - Conteúdo */}
          <div className="text-white">
            {/* Logo */}
            <div className="mb-8">
              <Logo className="h-20 w-auto" variant="white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              Soluções completas em{" "}
              <br />
              refrigeração{" "}
              <span className="font-normal italic">
                para o seu negócio
              </span>
            </h2>

            <p className="text-white/90 text-base leading-relaxed max-w-sm">
              Aumente a vida útil dos seus equipamentos e reduza sua conta de energia em até 40%!
            </p>
          </div>

          {/* Lado direito - Formulário */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <h3 className="text-blue-700 text-xl font-bold mb-1">
              Precisa de manutenção?
            </h3>
            <p className="text-gray-800 font-extrabold text-lg mb-6">
              Estamos aqui para falar com você!
            </p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="NOME"
                className="w-full bg-gray-200 placeholder-gray-500 text-gray-700 text-sm font-medium uppercase tracking-wide px-5 py-3.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <input
                type="email"
                placeholder="E-MAIL"
                className="w-full bg-gray-200 placeholder-gray-500 text-gray-700 text-sm font-medium uppercase tracking-wide px-5 py-3.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <input
                type="tel"
                placeholder="TELEFONE"
                className="w-full bg-gray-200 placeholder-gray-500 text-gray-700 text-sm font-medium uppercase tracking-wide px-5 py-3.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
              />

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-sky-500 hover:from-blue-800 hover:to-sky-600 text-white font-bold uppercase tracking-wide px-6 py-3 rounded-lg transition-all shadow-md cursor-pointer"
                >
                  Enviar
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M10 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold uppercase tracking-wide px-6 py-3 rounded-lg transition-all shadow-md cursor-pointer"
                >
                  Falar pelo Whatsapp
                </button>
              </div>
            </form>

            {/* Selos de garantia */}
            <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </span>
                <div className="text-[10px] font-bold uppercase leading-tight text-gray-700">
                  Garantia<br />nos serviços
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M13 2L4 14h7l-1 8 9-12h-7z" strokeLinejoin="round" strokeLinecap="round" />
                  </svg>
                </span>
                <div className="text-[10px] font-bold uppercase leading-tight text-gray-700">
                  Atendimento<br />24 horas
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8M12 8v8" strokeLinecap="round" />
                  </svg>
                </span>
                <div className="text-[10px] font-bold uppercase leading-tight text-gray-700">
                  Peças<br />originais
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
