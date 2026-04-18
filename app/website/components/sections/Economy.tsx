"use client"

import { useEffect, useRef, useState } from "react"
import Container from "../ui/Container"

// Imagens placeholder para o grid (3 colunas staggered)
const imageGrid = [
  // Coluna 1 (centro)
  [
    { gradient: "from-sky-200 to-blue-300", height: "h-72" },
  ],
  // Coluna 2 (mais alta)
  [
    { gradient: "from-blue-200 to-sky-300", height: "h-56" },
    { gradient: "from-sky-300 to-blue-400", height: "h-56" },
  ],
  // Coluna 3 (mais alta ainda, cortada)
  [
    { gradient: "from-blue-300 to-sky-200", height: "h-48" },
    { gradient: "from-sky-200 to-blue-300", height: "h-48" },
  ],
]

// Velocidades de parallax diferentes por coluna
const columnParallaxSpeed = [0.3, 0.5, 0.7]
// Offsets verticais iniciais para efeito staggered
const columnBaseOffset = [60, -20, -80]

export default function Economy() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowH = window.innerHeight

      setScrollY(window.scrollY)

      const start = windowH
      const end = windowH * 0.3
      const raw = 1 - (rect.top - end) / (start - end)
      setProgress(Math.max(0, Math.min(1, raw)))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const eased = 1 - Math.pow(1 - progress, 3)

  return (
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Lado esquerdo — Conteúdo */}
          <div
            className="max-w-lg"
            style={{
              opacity: eased,
              transform: `translateY(${(1 - eased) * 40}px)`,
              transition: "transform 0.1s linear, opacity 0.1s linear",
            }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
              A melhor maneira de{" "}
              <span className="text-blue-700">cuidar</span> do seu equipamento
            </h2>

            <p className="text-lg text-slate-500 leading-relaxed mb-10">
              Avaliamos cada detalhe dos seus sistemas de refrigeração para
              identificar falhas, reduzir o consumo de energia e garantir o
              máximo desempenho. Com manutenção preventiva e corretiva usando
              peças originais, seu equipamento funciona melhor e dura muito mais.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#contato"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-700 to-sky-500 hover:from-blue-800 hover:to-sky-600 text-white font-semibold uppercase tracking-wide px-8 py-4 rounded-lg transition-all shadow-lg shadow-blue-500/25"
              >
                Quero <span className="font-extrabold">Economizar</span>
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M10 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center gap-1 text-slate-900 font-semibold hover:text-blue-700 transition-colors"
              >
                Saiba mais <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Lado direito — Grid de imagens staggered com parallax */}
          <div className="relative h-[500px] md:h-[600px] hidden md:block">
            <div className="absolute inset-0 flex gap-4 justify-end">
              {imageGrid.map((column, colIdx) => (
                <div
                  key={colIdx}
                  className="flex flex-col gap-4 w-44"
                  style={{
                    transform: `translateY(${
                      columnBaseOffset[colIdx] +
                      (scrollY - (sectionRef.current?.offsetTop ?? 0)) *
                        columnParallaxSpeed[colIdx] *
                        -0.15
                    }px)`,
                    transition: "transform 0.05s linear",
                  }}
                >
                  {column.map((img, imgIdx) => (
                    <div
                      key={imgIdx}
                      className={`${img.height} w-full rounded-2xl bg-gradient-to-br ${img.gradient} shadow-lg overflow-hidden flex items-center justify-center`}
                      style={{
                        opacity: eased,
                        transform: `scale(${0.85 + eased * 0.15})`,
                        transition: "transform 0.1s linear, opacity 0.1s linear",
                      }}
                    >
                      <span className="text-blue-400/60 text-xs">[Imagem]</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Versão mobile — grid simplificado */}
          <div className="md:hidden grid grid-cols-2 gap-3">
            {[
              "from-sky-200 to-blue-300",
              "from-blue-200 to-sky-300",
              "from-sky-300 to-blue-400",
              "from-blue-300 to-sky-200",
            ].map((grad, i) => (
              <div
                key={i}
                className={`h-40 rounded-2xl bg-gradient-to-br ${grad} shadow-md flex items-center justify-center`}
                style={{
                  opacity: eased,
                  transform: `translateY(${(1 - eased) * (i % 2 === 0 ? 30 : -30)}px)`,
                  transition: "transform 0.1s linear, opacity 0.1s linear",
                }}
              >
                <span className="text-blue-400/60 text-xs">[Imagem]</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
