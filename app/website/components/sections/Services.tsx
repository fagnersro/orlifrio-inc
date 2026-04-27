"use client"

import { useRef } from "react"
import Image from "next/image"
import Container from "../ui/Container"

import expositorVertical from "../../../../public/01_expositor_vertical_vista_frontal.png"
import camaraFrigorifica from "../../../../public/02_camara_frigorifica_planta_baixa.png"
import diagramaEletrico from "../../../../public/03_diagrama_eletrico_refrigeracao.png"
import painelAutomacao from "../../../../public/04_painel_automacao_controle.png"

const services = [
  {
    tag: "Instalação",
    name: "Montagem e instalação de câmara frigorífica",
    description: "Reduziu a conta de energia do restaurante de R$12.000 para R$7.200 por mês.",
    image: camaraFrigorifica,
    author: { name: "Carlos Mendes", role: "Técnico Sênior" },
  },
  {
    tag: "Refrigeração",
    name: "Montagem e instalação de balcão frigorífico",
    description: "Recuperou uma câmara fria parada há 3 dias em menos de 4 horas de atendimento.",
    image: expositorVertical,
    author: { name: "Rafael Lima", role: "Especialista em Frio" },
  },
  {
    tag: "Reparo",
    name: "Reparo e conserto de equipamentos de refrigeração",
    description: "Dobrou a vida útil dos equipamentos com o plano de manutenção preventiva.",
    image: diagramaEletrico,
    author: { name: "Paulo Souza", role: "Engenheiro de Campo" },
  },
  {
    tag: "Consultoria",
    name: "Consultoria técnica especializada",
    description: "Economia de 38% na conta de energia após revisão completa dos compressores.",
    image: painelAutomacao,
    author: { name: "Ana Ferreira", role: "Consultora Técnica" },
  },
]

const logos = [
  { name: "FRIOMAX", style: "font-black tracking-tight" },
  { name: "CoolTech", style: "font-light italic" },
  { name: "ICEBERG", style: "font-extrabold tracking-widest" },
  { name: "Polar", style: "font-bold lowercase tracking-wider" },
  { name: "ARCTIC CO.", style: "font-semibold" },
  { name: "Snowflake", style: "font-medium italic" },
  { name: "REFRIO", style: "font-black" },
  { name: "FreezePro", style: "font-bold tracking-tight" },
]

export default function Services() {
  const loopLogos = [...logos, ...logos]
  const trackRef = useRef<HTMLDivElement>(null)

  function scroll(direction: "prev" | "next") {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector("article")
    if (!card) return
    const gap = 32
    const amount = card.offsetWidth + gap
    track.scrollBy({ left: direction === "next" ? amount : -amount, behavior: "smooth" })
  }

  return (
    <section id="servicos" className="py-20 bg-white bg-">
      <Container>
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              Nossos <span className="text-blue-700">serviços</span>
            </h2>
            <p className="text-gray-500 text-base max-w-xl">
              Soluções completas em refrigeração com qualidade e agilidade para o seu negócio.
            </p>
          </div>

          {/* Nav buttons */}
          <div className="flex gap-3 flex-shrink-0 ml-8">
            <button
              onClick={() => scroll("prev")}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Anterior"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scroll("next")}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Próximo"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div
          ref={trackRef}
          className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: "none" }}
        >
          {services.map((service, i) => (
            <article
              key={i}
              className="flex flex-col flex-shrink-0 w-[80vw] sm:w-[420px] lg:w-[400px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow snap-start"
            >
              {/* Image */}
              <div className="relative h-64 w-full flex-shrink-0">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-6 gap-3">
                <span className="inline-block self-start text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                  {service.tag}
                </span>

                <h3 className="font-bold text-gray-900 text-base leading-snug">
                  {service.name}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  {service.description}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-700">
                      {service.author.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800 leading-none">
                      {service.author.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{service.author.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>

      {/* Carrossel infinito de logos */}
      <div className="mt-20">
        <div
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {loopLogos.map((logo, i) => (
              <div
                key={i}
                className={`flex-shrink-0 text-2xl md:text-3xl text-slate-400 grayscale opacity-70 hover:opacity-100 hover:text-slate-700 transition-all ${logo.style}`}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
