"use client";

import { useState } from "react";
import { BarChart } from "@/components/ui/BarChart";
import { cx } from "@/lib/utils";
import type { TicketDataPoint } from "../store-data";

const RANGES = [
  { label: "3 meses", value: 3 },
  { label: "6 meses", value: 6 },
  { label: "12 meses", value: 12 },
];

interface TicketsChartProps {
  data: TicketDataPoint[];
}

export function TicketsChart({ data }: TicketsChartProps) {
  const [range, setRange] = useState(6);

  const filtered = data.slice(-range);
  const total = filtered.reduce((sum, d) => sum + d.chamados, 0);
  const avg = filtered.length > 0 ? (total / filtered.length).toFixed(1) : "0";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Total no período
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              {total}
            </span>
            <span className="text-sm text-gray-400 dark:text-gray-500">
              chamados
            </span>
          </div>
          <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-600">
            Média: {avg} / mês
          </p>
        </div>

        {/* Seletor de período */}
        <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 dark:border-gray-700 dark:bg-gray-800">
          {RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={cx(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                range === r.value
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-50"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <BarChart
        data={filtered.map((d) => ({ ...d, Chamados: d.chamados }))}
        index="period"
        categories={["Chamados"]}
        colors={["blue"]}
        height={220}
        showLegend={false}
        valueFormatter={(v) => String(v)}
      />
    </div>
  );
}
