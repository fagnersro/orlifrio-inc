import Container from "../ui/Container"
import Logo from "../ui/Logo"

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-14">
      <Container>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Coluna esquerda */}
          <div>
            {/* Logo */}
            <div className="mb-10">
              <Logo className="h-20 w-auto" variant="white" />
            </div>

            {/* Contato */}
            <div>
              <h3 className="text-xl font-extrabold mb-2">Contato</h3>
              <p className="text-2xl font-extrabold leading-tight">51 4042.4331</p>
              <p className="text-2xl font-extrabold leading-tight">51 99199.5884</p>
              <a
                href="mailto:contato@rickomeco.com.br"
                className="text-sm text-white/90 hover:text-sky-400 transition-colors mt-1 inline-block"
              >
                contato@rickomeco.com.br
              </a>
            </div>
          </div>

          {/* Coluna direita */}
          <div className="flex flex-col md:items-start">
            <h3 className="text-2xl mb-6">
              Nossos <span className="font-bold">Canais</span>
            </h3>

            {/* Redes sociais */}
            <div className="flex items-center gap-5 mb-8">
              <a href="#" aria-label="Instagram" className="text-white hover:text-sky-400 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-white hover:text-sky-400 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v8h3v-8h2.5l.5-3H13V9.5c0-.3.2-.5.5-.5z" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="text-white hover:text-sky-400 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12s0-3.2-.4-4.8zM10 15V9l5 3-5 3z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white hover:text-sky-400 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M4 4h4v4H4zm0 6h4v10H4zm6 0h3.8v1.4h.05c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V20h-4v-4.8c0-1.2 0-2.6-1.6-2.6s-1.85 1.2-1.85 2.5V20h-4V10z" />
                </svg>
              </a>
            </div>

            {/* Botão CTA */}
            <a
              href="#"
              className="inline-flex items-center justify-between gap-3 bg-gradient-to-r from-blue-700 to-sky-500 hover:from-blue-800 hover:to-sky-600 text-white font-semibold uppercase tracking-wide px-6 py-3.5 rounded-full transition-all shadow-lg w-fit"
            >
              Quero uma <span className="font-extrabold">Proposta</span>
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M10 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Linha divisória e rodapé inferior */}
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-white lowercase italic">ciclo</span>
            <p className="text-sm text-white/80">
              2023 Orlifrio Refrigeração © Todos os direitos reservados
            </p>
          </div>

          {/* Selos */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-b from-sky-500 to-blue-700 text-white text-[9px] font-bold uppercase leading-tight px-2 py-1.5 rounded text-center">
              Empresa
              <br />
              certificada
            </div>
            <div className="flex items-center gap-1.5 bg-sky-500 rounded px-2 py-1.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" stroke="#0284c7" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-white text-[9px] font-bold uppercase leading-tight">
                RA 1000
                <br />
                Reclame Aqui
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
