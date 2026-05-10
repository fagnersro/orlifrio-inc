import Link from "next/link";
import { notFound } from "next/navigation";
import {
  RiArrowLeftLine,
  RiCalendar2Line,
  RiDownloadLine,
  RiFileList3Line,
  RiMapPinLine,
  RiPhoneLine,
  RiSettings3Line,
  RiToolsLine,
  RiUserLine,
} from "@remixicon/react";

import { and, asc, eq, inArray } from "drizzle-orm";

import { auth } from "@/auth";
import { db } from "@/db";
import { eventSignatures, maintenanceEvents, users } from "@/db/schema";
import { hasPermission } from "@/lib/permissions";
import { userToAttendee } from "@/lib/avatar";
import type { Attendee } from "./store-data";
import { Can } from "@/components/ui/Can";
import { Card } from "@/components/ui/Card";
import { stores } from "@/app/(dashboard)/(overview)/data";
import { getStoreDetail, type MaintenanceEvent } from "./store-data";
import { StoreCalendar } from "./components/StoreCalendar";
import { StoreOverview } from "./components/StoreOverview";
import { TicketsChart } from "./components/TicketsChart";
import { cx } from "@/lib/utils";

export function generateStaticParams() {
  return stores.map((s) => ({ slug: s.slug }));
}

const statusStyle = {
  ativo:      "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",
  inativo:    "bg-gray-100 text-gray-500 ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700",
  em_reforma: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
};

const statusLabel = {
  ativo:      "Ativo",
  inativo:    "Inativo",
  em_reforma: "Em Reforma",
};

const equipmentStatusStyle = {
  operacional:   "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  em_manutencao: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  inativo:       "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500",
};

const equipmentStatusLabel = {
  operacional:   "Operacional",
  em_manutencao: "Em manutenção",
  inativo:       "Inativo",
};

const reportTypeBadge: Record<string, string> = {
  Preventiva: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Corretiva:  "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Chamados:   "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
  Inventário: "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400",
  Semestral:  "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Anual:      "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
};

export default async function StorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = stores.find((s) => s.slug === slug);

  if (!store) notFound();

  const detail = getStoreDetail(slug);
  const session = await auth();
  const canSign = hasPermission(session?.user?.role, "events:sign");
  const currentAttendee = canSign
    ? userToAttendee({
        id: session!.user.id,
        name: session!.user.name,
        email: session!.user.email,
      })
    : null;

  // Eventos persistidos no banco para esta loja
  const dbEvents = await db
    .select()
    .from(maintenanceEvents)
    .where(eq(maintenanceEvents.storeSlug, slug))
    .orderBy(asc(maintenanceEvents.date), asc(maintenanceEvents.time));

  const events: MaintenanceEvent[] = dbEvents.map((e) => ({
    id: e.id,
    date: e.date,
    type: e.type,
    description: e.description,
    technician: e.technicianName,
    time: e.time,
    location: e.location,
    attendees: e.attendees,
  }));

  // Todos os signers de todos os eventos exibidos (JOIN com user)
  const signersByEventId: Record<string, Attendee[]> = {};
  let signedEventIds: string[] = [];
  if (events.length > 0) {
    const eventIds = events.map((e) => e.id!).filter(Boolean);
    if (eventIds.length > 0) {
      const rows = await db
        .select({
          eventId: eventSignatures.eventId,
          userId: users.id,
          userName: users.name,
          userEmail: users.email,
        })
        .from(eventSignatures)
        .innerJoin(users, eq(eventSignatures.userId, users.id))
        .where(inArray(eventSignatures.eventId, eventIds));

      for (const r of rows) {
        const attendee = userToAttendee({
          id: r.userId,
          name: r.userName,
          email: r.userEmail,
        });
        if (attendee) {
          (signersByEventId[r.eventId] ??= []).push(attendee);
        }
        if (session?.user?.id && r.userId === session.user.id) {
          signedEventIds.push(r.eventId);
        }
      }
    }
  }

  return (
    <section aria-label={store.name} className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <RiArrowLeftLine className="size-4" aria-hidden />
        Todas as lojas
      </Link>

      {/* ── Header ── */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <store.icon className="size-6 text-blue-500" aria-hidden />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                {store.name}
              </h1>
              <span
                className={cx(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
                  statusStyle[detail.status],
                )}
              >
                {statusLabel[detail.status]}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {store.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <RiMapPinLine className="size-4 shrink-0 text-gray-400 dark:text-gray-600" />
                {detail.address}
              </span>
              <span className="flex items-center gap-1.5">
                <RiPhoneLine className="size-4 shrink-0 text-gray-400 dark:text-gray-600" />
                {detail.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <RiUserLine className="size-4 shrink-0 text-gray-400 dark:text-gray-600" />
                {detail.manager}
              </span>
              <span className="flex items-center gap-1.5">
                <RiSettings3Line className="size-4 shrink-0 text-gray-400 dark:text-gray-600" />
                Região {detail.region}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* ── Overview ── */}
      <StoreOverview detail={detail} />

      {/* ── Grid principal ── */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Calendário */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <RiCalendar2Line className="size-5 text-blue-500" aria-hidden />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Previsão de Manutenções
            </h2>
          </div>
          <StoreCalendar
            storeSlug={slug}
            events={events}
            canSign={canSign}
            currentAttendee={currentAttendee}
            initialSignedEventIds={signedEventIds}
            initialSignersByEventId={signersByEventId}
          />
        </Card>

        {/* Gráfico de chamados */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <RiToolsLine className="size-5 text-blue-500" aria-hidden />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Chamados Técnicos
            </h2>
          </div>
          <TicketsChart data={detail.ticketHistory} />
        </Card>

        {/* Relatórios */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <RiFileList3Line className="size-5 text-blue-500" aria-hidden />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Relatórios Gerados
            </h2>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {detail.reports.map((rep) => (
              <div
                key={rep.id}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
                    {rep.title}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={cx(
                        "inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                        reportTypeBadge[rep.type] ??
                          "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
                      )}
                    >
                      {rep.type}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-600">
                      {rep.date}
                    </span>
                  </div>
                </div>

                <Can permission="reports:download">
                  <a
                    href={rep.url}
                    download
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                    aria-label={`Baixar ${rep.title}`}
                  >
                    <RiDownloadLine className="size-3.5" aria-hidden />
                    Baixar
                  </a>
                </Can>
              </div>
            ))}

            {detail.reports.length === 0 && (
              <p className="py-4 text-center text-sm text-gray-400 dark:text-gray-600">
                Nenhum relatório disponível.
              </p>
            )}
          </div>
        </Card>

        {/* Equipamentos */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <RiSettings3Line className="size-5 text-blue-500" aria-hidden />
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                Equipamentos
              </h2>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-600">
              {detail.equipment.length} itens
            </span>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {detail.equipment.map((eq) => (
              <div
                key={eq.id}
                className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
                    {eq.name}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-600">
                    {eq.type} · S/N: {eq.serial}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
                  <span
                    className={cx(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                      equipmentStatusStyle[eq.status],
                    )}
                  >
                    {equipmentStatusLabel[eq.status]}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-600">
                    Manutenção: {eq.lastMaintenance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
