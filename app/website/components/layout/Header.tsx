import Container from "../ui/Container"
import Logo from "../ui/Logo"

const navLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Clientes", href: "#clientes" },
  { label: "Contato", href: "#contato" },
]

export default function Header() {
  return (
    <header className="w-full bg-white">
      <Container>
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Logo className="h-12 w-auto" />

          {/* Navegação */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-800 hover:text-blue-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Botão de ação à direita */}
          <a
            href="#contato"
            className="hidden md:inline-flex text-sm font-semibold text-slate-800 hover:text-blue-700 transition-colors"
          >
            Fale conosco <span aria-hidden="true">→</span>
          </a>
        </div>
      </Container>
    </header>
  )
}
