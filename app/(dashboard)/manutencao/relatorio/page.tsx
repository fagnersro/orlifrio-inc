import { Card } from "@/components/ui/Card"

export default function RelatorioPage() {
  return (
    <section aria-label="Gerar Relatório" className="px-4 py-6 sm:px-6">
      <Card className="p-6">
        <header className="mb-4">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
            Novo relatório
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
            Gere um relatório que ficará disponível para download na página da
            loja.
          </p>
        </header>

        <form className="space-y-4">
          {/* TODO: campos do formulário (loja, título, tipo, período, anexo)
              — aguardando definição dos componentes do Tremor. */}
        </form>
      </Card>
    </section>
  )
}
