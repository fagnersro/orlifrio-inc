import {
  RiCalendar2Line,
  RiFileList3Line,
  RiSettings3Line,
  RiToolsLine,
} from "@remixicon/react";

import { Card } from "@/components/ui/Card";
import { CategoryBar } from "@/components/ui/CategoryBar";
import { cx } from "@/lib/utils";
import type { AvailableChartColorsKeys } from "@/lib/chartUtils";
import type { StoreDetail } from "../store-data";

// ── Legenda colorida abaixo de cada CategoryBar ───────────────
function LegendItem({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
      <span className={cx("size-2 shrink-0 rounded-sm", color)} />
      {label}:{" "}
      <strong className="font-semibold text-gray-900 dark:text-gray-50">
        {value}
      </strong>
    </span>
  );
}

// ── Props ─────────────────────────────────────────────────────
interface StoreOverviewProps {
  detail: StoreDetail;
}

export function StoreOverview({ detail }: StoreOverviewProps) {
  const { maintenanceSchedule, ticketHistory, reports, equipment } = detail;

  // ── Manutenções ──────────────────────────────────────────────
  const preventiva  = maintenanceSchedule.filter((e) => e.type === "preventiva").length;
  const corretiva   = maintenanceSchedule.filter((e) => e.type === "corretiva").length;
  const instalacao  = maintenanceSchedule.filter((e) => e.type === "instalação").length;
  const totalManut  = maintenanceSchedule.length;

  // ── Chamados ──────────────────────────────────────────────────
  const totalChamados = ticketHistory.reduce((sum, d) => sum + d.chamados, 0);

  // ── Equipamentos ──────────────────────────────────────────────
  const operacional  = equipment.filter((e) => e.status === "operacional").length;
  const emManutencao = equipment.filter((e) => e.status === "em_manutencao").length;
  const inativo      = equipment.filter((e) => e.status === "inativo").length;
  const totalEquip   = equipment.length;

  // CategoryBar exige ao menos um valor > 0
  const manutValues  = totalManut > 0 ? [preventiva, corretiva, instalacao] : [1];
  const manutColors: AvailableChartColorsKeys[] =
    totalManut > 0 ? ["blue", "amber", "emerald"] : ["gray"];

  const equipValues  = totalEquip > 0 ? [operacional, emManutencao, inativo] : [1];
  const equipColors: AvailableChartColorsKeys[] =
    totalEquip > 0 ? ["emerald", "amber", "gray"] : ["gray"];

  // ── Itens do grid de stats ────────────────────────────────────
  const statsItems = [
    {
      label: "Manutenções",
      value: totalManut,
      icon: RiCalendar2Line,
      color: "text-blue-500",
    },
    {
      label: "Chamados",
      value: totalChamados,
      icon: RiToolsLine,
      color: "text-violet-500",
    },
    {
      label: "Relatórios",
      value: reports.length,
      icon: RiFileList3Line,
      color: "text-cyan-500",
    },
    {
      label: "Equipamentos",
      value: totalEquip,
      icon: RiSettings3Line,
      color: "text-emerald-500",
    },
  ] as const;

  return (
    <Card className="overflow-hidden p-0">
      {/* ── Header interno ──────────────────────────────────── */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-900 dark:bg-[#090E1A]">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
          Overview
        </h3>
      </div>

      {/* ── CategoryBars ────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
        {/* Manutenções por tipo */}
        <div className="space-y-2.5">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Manutenções por tipo
          </p>
          <CategoryBar
            values={manutValues}
            colors={manutColors}
            showLabels={false}
          />
          {totalManut > 0 ? (
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              <LegendItem color="bg-blue-500"    label="Preventiva" value={preventiva} />
              <LegendItem color="bg-amber-500"   label="Corretiva"  value={corretiva} />
              <LegendItem color="bg-emerald-500" label="Instalação" value={instalacao} />
            </div>
          ) : (
            <p className="text-xs text-gray-400 dark:text-gray-600">
              Sem manutenções agendadas
            </p>
          )}
        </div>

        {/* Equipamentos por status */}
        <div className="space-y-2.5">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Equipamentos por status
          </p>
          <CategoryBar
            values={equipValues}
            colors={equipColors}
            showLabels={false}
          />
          {totalEquip > 0 ? (
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              <LegendItem color="bg-emerald-500" label="Operacional" value={operacional} />
              <LegendItem color="bg-amber-500"   label="Manutenção"  value={emManutencao} />
              <LegendItem color="bg-gray-400"    label="Inativo"     value={inativo} />
            </div>
          ) : (
            <p className="text-xs text-gray-400 dark:text-gray-600">
              Sem equipamentos cadastrados
            </p>
          )}
        </div>
      </div>

      {/* ── Grid de stats ───────────────────────────────────── */}
      <ul className="grid grid-cols-2 gap-px border-t border-gray-200 bg-gray-200 dark:border-gray-900 dark:bg-gray-900 md:grid-cols-4">
        {statsItems.map((item) => (
          <li
            key={item.label}
            className="flex flex-col items-center justify-center bg-white py-5 dark:bg-[#090E1A]"
          >
            <div className="flex items-center gap-1.5">
              <item.icon
                className={cx("size-4", item.color)}
                aria-hidden
              />
              <span className="text-xl font-bold text-gray-900 dark:text-gray-50">
                {item.value}
              </span>
            </div>
            <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
