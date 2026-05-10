"use client";

import { useState, useTransition } from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowDownSLine,
  RiCalendarLine,
  RiCheckLine,
  RiMapPinLine,
  RiQuillPenLine,
  RiTimeLine,
} from "@remixicon/react";

import { Divider } from "@/components/Divider";
import { Avatar, AvatarStack } from "@/components/ui/Avatar";
import { cx } from "@/lib/utils";
import type { Attendee } from "@/features/stores/types";

import { signMaintenanceEvent } from "../actions";
import type { MaintenanceEvent } from "../types";

// ── Constantes ────────────────────────────────────────────────
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS_SHORT = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];
const MONTHS_LONG = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

// ── Estilos por tipo de manutenção ────────────────────────────
const typeChip = {
  preventiva: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
  corretiva:  "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  instalação: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
};

const typeLabel = {
  preventiva: "Preventiva",
  corretiva:  "Corretiva",
  instalação: "Instalação",
};

const typeDot = {
  preventiva: "#3b82f6",
  corretiva:  "#f59e0b",
  instalação: "#10b981",
};

// ── Sub-componente: card de evento ────────────────────────────
function ScheduleCard({
  event,
  canSign,
  isSigned,
  isSigning,
  signers,
  onSign,
}: {
  event: MaintenanceEvent;
  canSign: boolean;
  isSigned: boolean;
  isSigning: boolean;
  signers: Attendee[];
  onSign: () => void;
}) {
  // Só pode assinar eventos do banco (com id).
  const canSignThis = canSign && Boolean(event.id);

  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-1.5">
          <span
            className={cx(
              "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
              typeChip[event.type],
            )}
          >
            {typeLabel[event.type]}
          </span>

          <p className="text-sm font-semibold leading-snug text-gray-900 dark:text-gray-50">
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <RiMapPinLine className="size-3.5 shrink-0" />
              {event.location}
            </span>
            <span className="flex items-center gap-1">
              <RiTimeLine className="size-3.5 shrink-0" />
              {event.time}
            </span>
          </div>
        </div>

        <div className="shrink-0 pt-1">
          <AvatarStack attendees={event.attendees} />
        </div>
      </div>

      {(canSignThis || signers.length > 0) && (
        <>
          <Divider className="my-3" />
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-600">
                Assinado por
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                {signers.length > 0 ? (
                  signers.map((s) => (
                    <span
                      key={s.name}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 py-0.5 pl-0.5 pr-2 text-[11px] font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      <Avatar attendee={s} size={20} />
                      {s.name}
                    </span>
                  ))
                ) : (
                  <span className="text-xs italic text-gray-400 dark:text-gray-600">
                    Nenhuma assinatura ainda
                  </span>
                )}
              </div>
            </div>

            {canSignThis && (
              <div className="shrink-0">
                {isSigned ? (
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20"
                    aria-label="Evento assinado"
                  >
                    <RiCheckLine className="size-3" aria-hidden />
                    Assinado
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={onSign}
                    disabled={isSigning}
                    className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                    aria-label="Assinar evento"
                  >
                    <RiQuillPenLine className="size-3" aria-hidden />
                    {isSigning ? "Assinando..." : "Assinar"}
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────
interface StoreCalendarProps {
  storeSlug: string;
  events: MaintenanceEvent[];
  canSign?: boolean;
  currentAttendee?: Attendee | null;
  initialSignedEventIds?: string[];
  initialSignersByEventId?: Record<string, Attendee[]>;
}

export function StoreCalendar({
  storeSlug,
  events,
  canSign = false,
  currentAttendee = null,
  initialSignedEventIds = [],
  initialSignersByEventId = {},
}: StoreCalendarProps) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [signed, setSigned] = useState<Set<string>>(
    () => new Set(initialSignedEventIds),
  );
  const [signersByEvent, setSignersByEvent] = useState<
    Record<string, Attendee[]>
  >(initialSignersByEventId);
  const [signingId, setSigningId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const sign = (ev: MaintenanceEvent) => {
    if (!ev.id || !currentAttendee) return;
    const eventId = ev.id;
    const signer = currentAttendee;
    setSigningId(eventId);
    // Atualização otimista: marca como assinado e adiciona ao roster.
    setSigned((prev) => new Set(prev).add(eventId));
    setSignersByEvent((prev) => {
      const existing = prev[eventId] ?? [];
      if (existing.some((a) => a.name === signer.name)) return prev;
      return { ...prev, [eventId]: [...existing, signer] };
    });

    startTransition(async () => {
      const result = await signMaintenanceEvent(eventId, storeSlug);
      if (!result.ok) {
        setSigned((prev) => {
          const next = new Set(prev);
          next.delete(eventId);
          return next;
        });
        setSignersByEvent((prev) => ({
          ...prev,
          [eventId]: (prev[eventId] ?? []).filter(
            (a) => a.name !== signer.name,
          ),
        }));
      }
      setSigningId(null);
    });
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const toKey = (d: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const eventsByDay = events.reduce<Record<string, MaintenanceEvent[]>>(
    (acc, ev) => {
      const evYear = parseInt(ev.date.slice(0, 4));
      const evMonth = parseInt(ev.date.slice(5, 7)) - 1;
      const evDay = parseInt(ev.date.slice(8, 10));
      if (evYear === year && evMonth === month) {
        const key = String(evDay);
        (acc[key] ??= []).push(ev);
      }
      return acc;
    },
    {},
  );

  const scheduleEvents = selectedDay
    ? (eventsByDay[String(selectedDay)] ?? [])
    : Object.values(eventsByDay).flat().sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const filterLabel = selectedDay
    ? `${String(selectedDay).padStart(2, "0")} ${MONTHS_SHORT[month]}`
    : `${MONTHS_SHORT[month]} ${year}`;

  const cells: (number | null)[] = [
    ...Array<null>(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="flex flex-col gap-0">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <button className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-200">
            {MONTHS_LONG[month]} {year}
            <RiArrowDownSLine className="size-4 text-gray-400" />
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setViewDate(new Date(year, month - 1, 1));
                setSelectedDay(null);
              }}
              className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              aria-label="Mês anterior"
            >
              <RiArrowLeftSLine className="size-4" />
            </button>
            <button
              onClick={() => {
                setViewDate(new Date(year, month + 1, 1));
                setSelectedDay(null);
              }}
              className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              aria-label="Próximo mês"
            >
              <RiArrowRightSLine className="size-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 text-center">
          {WEEKDAYS.map((d, i) => (
            <div
              key={`${d}-${i}`}
              className="py-1 text-[11px] font-medium text-gray-400 dark:text-gray-600"
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-0.5">
          {cells.map((day, i) => {
            if (!day) return <div key={`e-${i}`} />;
            const key = String(day);
            const dayEvents = eventsByDay[key];
            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();
            const isSelected = day === selectedDay;

            const dotColor = dayEvents ? typeDot[dayEvents[0].type] : null;

            return (
              <button
                key={toKey(day)}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                className={cx(
                  "relative mx-auto flex size-8 items-center justify-center rounded-full text-sm transition-colors",
                  isSelected
                    ? "bg-blue-600 font-semibold text-white"
                    : isToday
                      ? "bg-blue-50 font-semibold text-blue-600 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                )}
              >
                {day}
                {dotColor && (
                  <span
                    className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full"
                    style={{ backgroundColor: isSelected ? "#ffffff" : dotColor }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="my-5 border-t border-gray-100 dark:border-gray-800" />

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
            Schedules
          </h3>

          <button
            onClick={() => setSelectedDay(null)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <RiCalendarLine className="size-3.5 text-gray-400 dark:text-gray-500" />
            {filterLabel}
            <RiArrowDownSLine className="size-3.5 text-gray-400" />
          </button>
        </div>

        {scheduleEvents.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {scheduleEvents.map((ev, i) => (
              <ScheduleCard
                key={ev.id ?? `${ev.date}-${ev.time}-${i}`}
                event={ev}
                canSign={canSign}
                isSigned={Boolean(ev.id) && signed.has(ev.id!)}
                isSigning={Boolean(ev.id) && signingId === ev.id}
                signers={ev.id ? signersByEvent[ev.id] ?? [] : []}
                onSign={() => sign(ev)}
              />
            ))}
          </div>
        ) : (
          <p className="py-6 text-center text-xs text-gray-400 dark:text-gray-600">
            Nenhuma manutenção agendada para este período.
          </p>
        )}
      </div>
    </div>
  );
}
