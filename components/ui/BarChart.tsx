"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";
import { cx } from "@/lib/utils";

const colorMap: Record<string, string> = {
  blue: "#3b82f6",
  emerald: "#10b981",
  violet: "#8b5cf6",
  amber: "#f59e0b",
  rose: "#f43f5e",
  cyan: "#06b6d4",
  gray: "#6b7280",
};

interface BarChartProps {
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

export function BarChart({
  data,
  index,
  categories,
  colors = ["blue"],
  valueFormatter = defaultFormatter,
  showLegend = false,
  showGridLines = true,
  showXAxis = true,
  showYAxis = true,
  className,
  height = 300,
}: BarChartProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const gridColor = isDark ? "#1f2937" : "#e5e7eb";
  const tickColor = isDark ? "#6b7280" : "#6b7280";
  const tooltipBg = isDark ? "#111827" : "#ffffff";
  const tooltipBorder = isDark ? "#1f2937" : "#e5e7eb";
  const tooltipText = isDark ? "#f9fafb" : "#111827";
  const cursorFill = isDark ? "#1f2937" : "#f3f4f6";

  return (
    <div className={cx("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
          barCategoryGap="38%"
        >
          {showGridLines && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
          )}
          {showXAxis && (
            <XAxis
              dataKey={index}
              tick={{ fontSize: 12, fill: tickColor }}
              tickLine={false}
              axisLine={false}
            />
          )}
          {showYAxis && (
            <YAxis
              tick={{ fontSize: 12, fill: tickColor }}
              tickLine={false}
              axisLine={false}
              tickFormatter={valueFormatter}
              width={36}
              allowDecimals={false}
            />
          )}
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: "8px",
              fontSize: "12px",
              color: tooltipText,
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.2)",
            }}
            formatter={(value, name) => [valueFormatter(value as number), name]}
            cursor={{ fill: cursorFill }}
          />
          {showLegend && (
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
            />
          )}
          {categories.map((cat, i) => (
            <Bar
              key={cat}
              dataKey={cat}
              fill={colorMap[colors[i % colors.length] ?? "blue"] ?? "#3b82f6"}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
