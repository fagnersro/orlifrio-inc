"use client"

import { useEffect, useRef, useState } from "react"
import Container from "../ui/Container"

// Offsets iniciais de cada card (de onde vêm antes de se "encontrarem")
const cardOffsets = [
  { x: -80, y: -60 },   // Card 1 — vem da esquerda/cima
  { x: 0, y: -100 },    // Card 2 — vem de cima
  { x: 80, y: -60 },    // Card 3 — vem da direita/cima
  { x: 0, y: 100 },     // Card 4 — vem de baixo
  { x: -80, y: 60 },    // Card 5 — vem da esquerda/baixo
  { x: 80, y: 60 },     // Card 6 — vem da direita/baixo
]

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowH = window.innerHeight

      // Começa a animar quando a seção entra na viewport
      // progress: 0 = seção acabou de entrar, 1 = seção está totalmente visível
      const start = windowH
      const end = windowH * 0.3
      const raw = 1 - (rect.top - end) / (start - end)
      setProgress(Math.max(0, Math.min(1, raw)))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // calcular estado inicial
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Easing suave (ease-out cubic)
  const eased = 1 - Math.pow(1 - progress, 3)

  // Parallax das imagens: se move mais devagar (offset baseado no progress)
  const imageParallax = (1 - eased) * 20

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-r from-sky-500 via-blue-600 to-blue-800 pt-16 pb-24 overflow-hidden"
    >
      <Container>
        <h2
          className="text-center text-white text-3xl md:text-4xl mb-12 transition-all duration-300"
          style={{
            opacity: eased,
            transform: `translateY(${(1 - eased) * -30}px)`,
          }}
        >
          Por que investir <span className="font-bold">em refrigeração de qualidade?</span>
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-3 gap-4 auto-rows-auto">

          {/* Card 1 — Economia (tall left, 2 rows) */}
          <div
            className="md:col-span-2 md:row-span-2 bg-white rounded-2xl p-6 flex flex-col justify-between min-h-[200px] md:min-h-0"
            style={{
              opacity: eased,
              transform: `translate(${cardOffsets[0].x * (1 - eased)}px, ${cardOffsets[0].y * (1 - eased)}px)`,
              transition: "transform 0.1s linear, opacity 0.1s linear",
            }}
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Economia</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Reduza até 40% no consumo de energia com equipamentos bem ajustados e eficientes.
              </p>
            </div>
            <div className="mt-4 h-48 bg-gradient-to-br from-sky-100 to-blue-200 rounded-xl flex items-center justify-center overflow-hidden">
              <span
                className="text-blue-300 text-xs"
                style={{ transform: `translateY(${imageParallax}px)` }}
              >
                [Imagem]
              </span>
            </div>
          </div>

          {/* Card 2 — Vida útil (center top) */}
          <div
            className="md:col-span-2 bg-white rounded-2xl p-6 flex flex-col items-center text-center justify-center min-h-[200px] md:min-h-0"
            style={{
              opacity: eased,
              transform: `translate(${cardOffsets[1].x * (1 - eased)}px, ${cardOffsets[1].y * (1 - eased)}px)`,
              transition: "transform 0.1s linear, opacity 0.1s linear",
            }}
          >
            <div
              className="w-14 h-14 bg-gradient-to-br from-sky-100 to-blue-200 rounded-full flex items-center justify-center mb-4 overflow-hidden"
            >
              <span
                className="text-blue-300 text-xs"
                style={{ transform: `translateY(${imageParallax * 0.5}px)` }}
              >
                [Img]
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Vida útil</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Prolongue em até 3x a durabilidade do seu equipamento com manutenção preventiva.
            </p>
          </div>

          {/* Card 3 — Confiança (tall right, 2 rows) */}
          <div
            className="md:col-span-2 md:row-span-2 bg-white rounded-2xl p-6 flex flex-col min-h-[200px] md:min-h-0"
            style={{
              opacity: eased,
              transform: `translate(${cardOffsets[2].x * (1 - eased)}px, ${cardOffsets[2].y * (1 - eased)}px)`,
              transition: "transform 0.1s linear, opacity 0.1s linear",
            }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">Confiança</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Mais de 15 anos de experiência em refrigeração comercial e industrial.
            </p>
            <div className="flex-1 bg-gradient-to-br from-sky-100 to-blue-200 rounded-xl flex items-center justify-center min-h-[180px] overflow-hidden">
              <span
                className="text-blue-300 text-xs"
                style={{ transform: `translateY(${-imageParallax}px)` }}
              >
                [Imagem]
              </span>
            </div>
          </div>

          {/* Card 4 — Agilidade (center bottom) */}
          <div
            className="md:col-span-2 bg-white rounded-2xl p-6 flex flex-col items-center text-center justify-center min-h-[200px] md:min-h-0"
            style={{
              opacity: eased,
              transform: `translate(${cardOffsets[3].x * (1 - eased)}px, ${cardOffsets[3].y * (1 - eased)}px)`,
              transition: "transform 0.1s linear, opacity 0.1s linear",
            }}
          >
            <div className="flex gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-blue-200 rounded-full flex items-center justify-center overflow-hidden">
                <span
                  className="text-blue-300 text-[8px]"
                  style={{ transform: `translateY(${imageParallax * 0.5}px)` }}
                >
                  [Img]
                </span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-sky-100 to-blue-200 rounded-full flex items-center justify-center overflow-hidden">
                <span
                  className="text-blue-300 text-[8px]"
                  style={{ transform: `translateY(${imageParallax * 0.5}px)` }}
                >
                  [Img]
                </span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">Agilidade</h3>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">no atendimento</h3>
            <p className="text-sm text-gray-600 leading-relaxed mt-2">
              Atendimento técnico rápido, evitando paradas prolongadas no seu negócio.
            </p>
          </div>

          {/* Card 5 — Suporte 24h (bottom left, wide) */}
          <div
            className="md:col-span-3 bg-white rounded-2xl p-6 flex flex-row items-center gap-6 min-h-[200px] md:min-h-0"
            style={{
              opacity: eased,
              transform: `translate(${cardOffsets[4].x * (1 - eased)}px, ${cardOffsets[4].y * (1 - eased)}px)`,
              transition: "transform 0.1s linear, opacity 0.1s linear",
            }}
          >
            <div className="w-36 h-36 flex-shrink-0 bg-gradient-to-br from-sky-100 to-blue-200 rounded-xl flex items-center justify-center overflow-hidden">
              <span
                className="text-blue-300 text-xs"
                style={{ transform: `translateY(${imageParallax * 1.2}px)` }}
              >
                [Imagem]
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Suporte 24 horas.
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Assistência técnica disponível a qualquer hora do dia ou da noite, para que seu negócio nunca pare.
              </p>
            </div>
          </div>

          {/* Card 6 — Peças Originais (bottom right, wide) */}
          <div
            className="md:col-span-3 bg-white rounded-2xl p-6 flex flex-row items-center gap-6 min-h-[200px] md:min-h-0"
            style={{
              opacity: eased,
              transform: `translate(${cardOffsets[5].x * (1 - eased)}px, ${cardOffsets[5].y * (1 - eased)}px)`,
              transition: "transform 0.1s linear, opacity 0.1s linear",
            }}
          >
            <div className="w-36 h-36 flex-shrink-0 bg-gradient-to-br from-sky-100 to-blue-200 rounded-xl flex items-center justify-center overflow-hidden">
              <span
                className="text-blue-300 text-xs"
                style={{ transform: `translateY(${-imageParallax * 1.2}px)` }}
              >
                [Imagem]
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Peças originais e garantidas.
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Trabalhamos apenas com peças originais e homologadas, garantindo segurança e desempenho máximo.
              </p>
            </div>
          </div>
        </div>

        {/* Link inferior */}
        <div
          className="text-center mt-8"
          style={{
            opacity: eased,
            transform: `translateY(${(1 - eased) * 20}px)`,
          }}
        >
          <a href="#" className="text-white/80 text-sm hover:text-white transition-colors">
            Tem dúvidas? <span className="font-semibold underline">Veja detalhes e FAQ &gt;</span>
          </a>
        </div>
      </Container>

      {/* Corte diagonal inferior */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12 md:h-16"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <path d="M0 60h1200V20L0 60z" fill="#f5f5f5" />
        </svg>
      </div>
    </section>
  )
}
