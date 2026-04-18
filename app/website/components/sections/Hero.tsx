"use client"

import { useEffect, useState } from "react"
import Logo from "../ui/Logo"

const navLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Clientes", href: "#clientes" },
  { label: "Contato", href: "#contato" },
  { label: "Login", href: "#login" },
]

// Cada slide tem uma forma + um gradiente.
// Todas as formas usam 8 pontos para permitir morfagem suave entre formatos.
// Ordem dos pontos (sentido horário começando pelo topo do recorte):
//   P1 = topo-esquerda (início do corte)
//   P2 = topo-direita
//   P3 = direita-superior
//   P4 = direita-inferior
//   P5 = base-direita
//   P6 = base-esquerda (fim do corte)
//   P7 = meio-esquerda inferior
//   P8 = meio-esquerda superior
const slides = [
  {
    // Diagonal simples — corte reto de (15,0) até (0,100)
    clipPath:
      "polygon(15% 0%, 100% 0%, 100% 33%, 100% 66%, 100% 100%, 0% 100%, 5% 66%, 10% 33%)",
    image: "/01_expositor_vertical_vista_frontal.png",
  },
  {
    // Trapézio invertido — corte oposto de (0,0) até (25,100)
    clipPath:
      "polygon(0% 0%, 100% 0%, 100% 33%, 100% 66%, 100% 100%, 25% 100%, 16% 66%, 8% 33%)",
    image: "/02_camara_frigorifica_planta_baixa.png",
  },
  {
    // Forma orgânica com cortes retos — borda esquerda quebrada em ângulo
    clipPath:
      "polygon(20% 0%, 100% 0%, 100% 33%, 100% 66%, 100% 100%, 40% 100%, 0% 60%, 10% 30%)",
    image: "/03_diagrama_eletrico_refrigeracao.png",
  },
  {
    // Zigue-zague — bordas em pontas (2 dentes)
    clipPath:
      "polygon(15% 0%, 100% 0%, 100% 33%, 100% 66%, 100% 100%, 0% 100%, 15% 66%, 0% 33%)",
    image: "/04_painel_automacao_controle.png",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-white overflow-hidden w-full">
      <div className="relative grid md:grid-cols-2 min-h-[85vh]">
        {/* Lado esquerdo - Nav + Conteúdo */}
        <div className="relative z-20 flex flex-col px-8 md:px-16 lg:px-24 py-8">
          {/* Navegação no topo, alinhada com o conteúdo */}
          <nav className="flex items-center justify-between gap-8 mb-6 md:mb-20">
            <Logo className="h-20 w-auto" />
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-slate-800 hover:text-blue-700 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Conteúdo principal */}
          <div className="flex-1 flex flex-col justify-start pt-4 md:justify-center md:pt-0 max-w-xl">
            {/* Badge pill */}
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 text-xs text-slate-600 shadow-sm hover:shadow-md transition-shadow mb-8 w-fit"
            >
              Atendimento técnico 24h disponível.
              <span className="text-blue-700 font-semibold inline-flex items-center gap-1">
                Saiba mais <span aria-hidden="true">→</span>
              </span>
            </a>

            {/* Título principal */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6">
              Refrigeração que{" "}
              <span className="text-blue-700">não para</span> o seu negócio
            </h1>

            {/* Parágrafo */}
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              Maximize eficiência energética e confiabilidade com manutenção técnica especializada e controle operacional.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-6">
              <a
                href="#contato"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg shadow-blue-700/20"
              >
                Solicitar orçamento
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center gap-1 text-slate-900 font-semibold hover:text-blue-700 transition-colors"
              >
                Saiba mais <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Lado direito - Carrossel com clip-path animado */}
        <div
          className="absolute top-0 right-0 w-[70%] h-full opacity-55 md:opacity-100 md:w-1/2 z-0 md:z-10"
          style={{
            clipPath: slides[currentSlide].clipPath,
            transition: "clip-path 1.5s cubic-bezier(0.65, 0, 0.35, 1)",
          }}
        >
          {/* Stack de slides — cada um com sua imagem e fade */}
          {slides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{ opacity: i === currentSlide ? 1 : 0 }}
            >
              <img
                src={slide.image}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay decorativo */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Indicadores (dots) */}
        <div className="hidden md:flex absolute bottom-8 right-8 z-20 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Ir para slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === currentSlide
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
