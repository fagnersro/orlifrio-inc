"use client";

import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cx } from "@/lib/utils";

const colorPalette: Record<string, { stroke: string; fill: string }> = {
  blue:   { stroke: "#3b82f6", fill: "#3b82f6" },
  emerald:{ stroke: "#10b981", fill: "#10b981" },
  violet: { stroke: "#8b5cf6", fill: "#8b5cf6" },
  amber:  { stroke: "#f59e0b", fill: "#f59e0b" },
  rose:   { stroke: "#f43f5e", fill: "#f43f5e" },
  cyan:   { stroke: "#06b6d4", fill: "#06b6d4" },
  gray:   { stroke: "#6b7280", fill: "#6b7280" },
};

interface AreaChartProps {
  data: Record<string, unknown>[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showGridLines?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  className?: string;
  height?: number;
}

const defaultFormatter = (v: number) => String(v);

export function AreaChart({
  data,
  index,
  categories,
  colors = ["blue", "emerald", "violet", "amber", "rose", "cyan"],
  valueFormatter = defaultFormatter,
  showLegend = true,
  showGridLines = true,
  showXAxis = true,
  showYAxis = true,
  className,
  height = 300,
}: AreaChartProps) {
  return (
    <div className={cx("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            {categories.map((cat, i) => {
              const colorKey = colors[i % colors.length] ?? "blue";
              const color = colorPalette[colorKey] ?? colorPalette.blue;
              return (
                <linearGradient key={cat} id={`fill-${cat}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={color.fill} stopOpacity={0.18} />
                  <stop offset="95%" stopColor={color.fill} stopOpacity={0} />
                </linearGradient>
              );
            })}
          </defs>

          {showGridLines && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
          )}

          {showXAxis && (
            <XAxis
              dataKey={index}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={false}
            />
          )}

          {showYAxis && (
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={valueFormatter}
              width={56}
            />
          )}

          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "12px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            formatter={(value, name) => [
              valueFormatter(value as number),
              name,
            ]}
          />

          {showLegend && (
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
            />
          )}

          {categories.map((cat, i) => {
            const colorKey = colors[i % colors.length] ?? "blue";
            const color = colorPalette[colorKey] ?? colorPalette.blue;
            return (
              <Area
                key={cat}
                type="monotone"
                dataKey={cat}
                stroke={color.stroke}
                strokeWidth={2}
                fill={`url(#fill-${cat})`}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            );
          })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
