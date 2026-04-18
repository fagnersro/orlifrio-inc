import Container from "../ui/Container"

const clients = [
  {
    name: "NOME DO CLIENTE",
    description: "Reduziu a conta de energia do restaurante de R$12.000 para R$7.200 por mês.",
  },
  {
    name: "NOME DO CLIENTE",
    description: "Recuperou uma câmara fria parada há 3 dias em menos de 4 horas de atendimento.",
  },
  {
    name: "NOME DO CLIENTE",
    description: "Dobrou a vida útil dos equipamentos com o plano de manutenção preventiva.",
  },
  {
    name: "NOME DO CLIENTE",
    description: "Economia de 38% na conta de energia após revisão completa dos compressores.",
  },
]

// Logos fictícios de clientes (estilizados como marcas conhecidas do setor)
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

export default function Clients() {
  // Duplica a lista para criar loop infinito contínuo
  const loopLogos = [...logos, ...logos]

  return (
    <section className="py-20 bg-white">
      <Container>
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-blue-700 uppercase tracking-wide mb-16">
          Veja alguns de nossos clientes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 max-w-5xl mx-auto">
          {clients.map((client, i) => (
            <div key={i} className="flex items-start gap-6">
              {/* Imagem/Placeholder */}
              <div className="flex-shrink-0 w-44 h-44 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-sky-400 shadow-md" />

              {/* Conteúdo */}
              <div className="flex-1 pt-2">
                <h3 className="font-extrabold text-gray-900 text-sm mb-3">
                  {client.name}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-5">
                  {client.description}
                </p>
                <button className="inline-flex items-center gap-2 border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors font-medium text-sm px-5 py-2.5 rounded-md cursor-pointer">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
                  </svg>
                  Assistir depoimento
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Carrossel infinito de logos */}
      <div className="mt-20">
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
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

      {/* Animação keyframes */}
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
