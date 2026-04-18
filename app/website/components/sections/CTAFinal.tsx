import Container from "../ui/Container"

export default function CTAFinal() {
  return (
    <section className="bg-gradient-to-r from-sky-500 via-blue-600 to-blue-800 py-8">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          <h2 className="text-white text-2xl md:text-3xl text-center md:text-right leading-tight">
            <span className="font-extrabold">Refrigeração de confiança</span>
            <br />
            <span className="font-light">para o seu negócio não parar</span>
          </h2>

          <a
            href="#"
            className="inline-flex items-center justify-center bg-gradient-to-b from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800 text-white font-bold uppercase tracking-wide px-10 py-5 rounded-lg shadow-lg transition-all cursor-pointer"
          >
            Eu quero economizar!
          </a>
        </div>
      </Container>
    </section>
  )
}
