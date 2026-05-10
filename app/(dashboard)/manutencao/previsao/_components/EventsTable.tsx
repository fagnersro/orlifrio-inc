"use client"

import { RiMoreLine, RiPencilLine, RiDeleteBinLine } from "@remixicon/react"

import { Button } from "@/components/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table"
import { stores } from "@/app/(dashboard)/(overview)/data"
import type { AttendeeSnapshot, MaintenanceEventRow } from "@/db/schema"
import { cx } from "@/lib/utils"

const typeChip: Record<MaintenanceEventRow["type"], string> = {
  preventiva:
    "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
  corretiva:
    "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  instalação:
    "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
}

const typeLabel: Record<MaintenanceEventRow["type"], string> = {
  preventiva: "Preventiva",
  corretiva: "Corretiva",
  instalação: "Instalação",
}

const storeNameBySlug: Record<string, string> = Object.fromEntries(
  stores.map((s) => [s.slug, s.name]),
)

function formatDate(iso: string): string {
  // iso vem como "YYYY-MM-DD"; renderiza dd/mm/yyyy sem criar Date (evita timezone)
  const [y, m, d] = iso.split("-")
  return d && m && y ? `${d}/${m}/${y}` : iso
}

function MiniAvatar({ attendee }: { attendee: AttendeeSnapshot }) {
  return (
    <span
      title={attendee.name}
      style={{ backgroundColor: attendee.color }}
      className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-white text-[9px] font-semibold text-white dark:border-gray-900"
    >
      {attendee.initials}
    </span>
  )
}

function AttendeesStack({ attendees }: { attendees: AttendeeSnapshot[] }) {
  const visible = attendees.slice(0, 3)
  const overflow = attendees.length - visible.length

  if (attendees.length === 0) {
    return (
      <span className="text-xs text-gray-400 dark:text-gray-600">—</span>
    )
  }

  return (
    <div className="flex items-center">
      {visible.map((a, i) => (
        <span
          key={a.name}
          className="relative"
          style={{ marginLeft: i === 0 ? 0 : -6, zIndex: visible.length - i }}
        >
          <MiniAvatar attendee={a} />
        </span>
      ))}
      {overflow > 0 && (
        <span
          className="relative inline-flex size-6 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-[9px] font-semibold text-gray-600 dark:border-gray-900 dark:bg-gray-700 dark:text-gray-300"
          style={{ marginLeft: -6 }}
        >
          +{overflow}
        </span>
      )}
    </div>
  )
}

interface EventsTableProps {
  events: MaintenanceEventRow[]
  editingId: string | null
  deletingId: string | null
  onEdit: (event: MaintenanceEventRow) => void
  onDelete: (event: MaintenanceEventRow) => void
}

export function EventsTable({
  events,
  editingId,
  deletingId,
  onEdit,
  onDelete,
}: EventsTableProps) {
  if (events.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-400 dark:text-gray-600">
        Nenhum agendamento cadastrado ainda.
      </p>
    )
  }

  return (
    <TableRoot>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Loja</TableHeaderCell>
            <TableHeaderCell>Tipo</TableHeaderCell>
            <TableHeaderCell>Data</TableHeaderCell>
            <TableHeaderCell>Hora</TableHeaderCell>
            <TableHeaderCell>Técnico</TableHeaderCell>
            <TableHeaderCell>Participantes</TableHeaderCell>
            <TableHeaderCell className="w-8">
              <span className="sr-only">Ações</span>
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => {
            const isEditing = editingId === event.id
            const isDeleting = deletingId === event.id
            return (
              <TableRow
                key={event.id}
                className={cx(
                  "transition-colors",
                  isEditing && "bg-blue-50/50 dark:bg-blue-500/5",
                  isDeleting && "opacity-50",
                )}
              >
                <TableCell className="font-medium text-gray-900 dark:text-gray-50">
                  {storeNameBySlug[event.storeSlug] ?? event.storeSlug}
                </TableCell>
                <TableCell>
                  <span
                    className={cx(
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
                      typeChip[event.type],
                    )}
                  >
                    {typeLabel[event.type]}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDate(event.date)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {event.time}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {event.technicianName}
                </TableCell>
                <TableCell>
                  <AttendeesStack attendees={event.attendees} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="size-8 !p-0"
                        aria-label="Ações"
                        disabled={isDeleting}
                      >
                        <RiMoreLine className="size-4" aria-hidden />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                      <DropdownMenuItem onSelect={() => onEdit(event)}>
                        <RiPencilLine
                          className="mr-2 size-4 text-gray-500 dark:text-gray-400"
                          aria-hidden
                        />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => onDelete(event)}
                        className="text-red-600 focus:bg-red-50 focus:text-red-700 dark:text-red-400 dark:focus:bg-red-500/10 dark:focus:text-red-300"
                      >
                        <RiDeleteBinLine
                          className="mr-2 size-4"
                          aria-hidden
                        />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableRoot>
  )
}
