"use client"

import { useState, useTransition } from "react"
import {
  RiCalendar2Line,
  RiMapPinLine,
  RiTimeLine,
  RiToolsLine,
} from "@remixicon/react"

import { Button } from "@/components/Button"
import { Divider } from "@/components/Divider"
import { Input } from "@/components/Input"
import { Label } from "@/components/Label"
import { RadioGroup, RadioGroupItem } from "@/components/RadioGroup"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { Textarea } from "@/components/TextArea"
import { Avatar, AvatarStack } from "@/components/ui/Avatar"
import { Card } from "@/components/ui/Card"
import type { MaintenanceEventRow } from "@/db/schema"
import { cx } from "@/lib/utils"

import {
  createMaintenanceEvent,
  deleteMaintenanceEvent,
  updateMaintenanceEvent,
} from "../actions"
import {
  PEOPLE_CATALOG,
  TECHS_LIST,
  stores,
} from "@/features/stores/mocks"
import type { Attendee } from "@/features/stores/types"

import { EventsTable } from "./EventsTable"

type EventType = "preventiva" | "corretiva" | "instalação"

const typeChip: Record<EventType, string> = {
  preventiva:
    "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
  corretiva:
    "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  instalação:
    "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
}

const typeLabel: Record<EventType, string> = {
  preventiva: "Preventiva",
  corretiva: "Corretiva",
  instalação: "Instalação",
}

const initialState = {
  storeSlug: "",
  type: "preventiva" as EventType,
  date: "",
  time: "",
  description: "",
  location: "",
  technician: "",
  attendees: [] as Attendee[],
}

function rowToFormState(row: MaintenanceEventRow): typeof initialState {
  return {
    storeSlug: row.storeSlug,
    type: row.type,
    date: row.date,
    time: row.time,
    description: row.description,
    location: row.location,
    technician: row.technicianName,
    attendees: row.attendees as Attendee[],
  }
}

interface PrevisaoFormProps {
  initialEvents: MaintenanceEventRow[]
}

export function PrevisaoForm({ initialEvents }: PrevisaoFormProps) {
  const [form, setForm] = useState(initialState)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<
    | { kind: "success"; message: string }
    | { kind: "error"; message: string }
    | null
  >(null)
  const [isPending, startTransition] = useTransition()

  const update = <K extends keyof typeof initialState>(
    key: K,
    value: (typeof initialState)[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }))

  const toggleAttendee = (a: Attendee) => {
    setForm((prev) => ({
      ...prev,
      attendees: prev.attendees.some((p) => p.name === a.name)
        ? prev.attendees.filter((p) => p.name !== a.name)
        : [...prev.attendees, a],
    }))
  }

  const isAttendeeSelected = (a: Attendee) =>
    form.attendees.some((p) => p.name === a.name)

  const reset = () => {
    setForm(initialState)
    setEditingId(null)
    setFeedback(null)
  }

  const handleEdit = (event: MaintenanceEventRow) => {
    setForm(rowToFormState(event))
    setEditingId(event.id)
    setFeedback(null)
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleDelete = (event: MaintenanceEventRow) => {
    if (typeof window !== "undefined") {
      const ok = window.confirm(
        `Excluir o agendamento "${event.description}"? Esta ação não pode ser desfeita.`,
      )
      if (!ok) return
    }
    setDeletingId(event.id)
    setFeedback(null)
    startTransition(async () => {
      const result = await deleteMaintenanceEvent(event.id)
      if (result.ok) {
        if (editingId === event.id) {
          setForm(initialState)
          setEditingId(null)
        }
        setFeedback({
          kind: "success",
          message: "Agendamento excluído.",
        })
      } else {
        setFeedback({
          kind: "error",
          message: result.error ?? "Falha ao excluir.",
        })
      }
      setDeletingId(null)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)
    const payload = {
      storeSlug: form.storeSlug,
      type: form.type,
      date: form.date,
      time: form.time,
      description: form.description,
      location: form.location,
      technicianName: form.technician,
      attendees: form.attendees,
    }
    const isUpdate = editingId !== null
    startTransition(async () => {
      const result = isUpdate
        ? await updateMaintenanceEvent(editingId!, payload)
        : await createMaintenanceEvent(payload)

      if (result.ok) {
        setForm(initialState)
        setEditingId(null)
        setFeedback({
          kind: "success",
          message: isUpdate
            ? "Agendamento atualizado."
            : "Agendamento salvo. Já aparece nos schedules da loja.",
        })
      } else {
        const firstError =
          result.errors?._form?.[0] ??
          Object.values(result.errors ?? {})
            .flat()
            .find(Boolean) ??
          "Falha ao salvar."
        setFeedback({ kind: "error", message: firstError })
      }
    })
  }

  const selectedStore = stores.find((s) => s.slug === form.storeSlug)
  const isFilled =
    form.storeSlug &&
    form.date &&
    form.time &&
    form.description &&
    form.location &&
    form.technician

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* ── Formulário ─────────────────────────────────────────── */}
      <Card className="p-6">
        <header className="mb-5">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
            {editingId ? "Editar agendamento" : "Novo agendamento"}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
            {editingId
              ? "Altere os campos abaixo e clique em Atualizar."
              : "Cadastre uma manutenção que aparecerá no calendário e nos cards de schedules da loja."}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Loja */}
          <div>
            <Label htmlFor="store" className="font-medium">
              Loja
            </Label>
            <Select
              value={form.storeSlug}
              onValueChange={(v) => update("storeSlug", v)}
            >
              <SelectTrigger id="store" name="store" className="mt-2">
                <SelectValue placeholder="Selecione uma loja" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((s) => (
                  <SelectItem key={s.slug} value={s.slug}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo */}
          <fieldset>
            <legend className="text-sm font-medium text-gray-900 dark:text-gray-50">
              Tipo
            </legend>
            <RadioGroup
              value={form.type}
              onValueChange={(v) => update("type", v as EventType)}
              className="mt-3 flex flex-wrap gap-x-6 gap-y-2"
            >
              {(Object.keys(typeLabel) as EventType[]).map((t) => (
                <div key={t} className="flex items-center gap-x-2">
                  <RadioGroupItem id={`type-${t}`} value={t} />
                  <Label htmlFor={`type-${t}`} className="font-normal">
                    {typeLabel[t]}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </fieldset>

          {/* Data + Hora */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="date" className="font-medium">
                Data
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="time" className="font-medium">
                Hora
              </Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="description" className="font-medium">
              Descrição
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Ex: Inspeção mensal de climatização"
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Local */}
          <div>
            <Label htmlFor="location" className="font-medium">
              Local
            </Label>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="Ex: Área de Climatização"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Técnico responsável */}
          <div>
            <Label htmlFor="technician" className="font-medium">
              Técnico responsável
            </Label>
            <Select
              value={form.technician}
              onValueChange={(v) => update("technician", v)}
            >
              <SelectTrigger id="technician" name="technician" className="mt-2">
                <SelectValue placeholder="Selecione um técnico" />
              </SelectTrigger>
              <SelectContent>
                {TECHS_LIST.map((t) => (
                  <SelectItem key={t.name} value={t.name}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Participantes */}
          <div>
            <Label className="font-medium">Participantes</Label>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              Clique para adicionar ou remover.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {PEOPLE_CATALOG.map((p) => {
                const selected = isAttendeeSelected(p)
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => toggleAttendee(p)}
                    aria-pressed={selected}
                    className={cx(
                      "inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs font-medium transition-colors",
                      selected
                        ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-400"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800",
                    )}
                  >
                    <Avatar attendee={p} size={18} />
                    {p.name}
                  </button>
                )
              })}
            </div>
          </div>

          <Divider />

          {feedback && (
            <p
              role="status"
              className={cx(
                "rounded-md border px-3 py-2 text-sm",
                feedback.kind === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400"
                  : "border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400",
              )}
            >
              {feedback.message}
            </p>
          )}

          {/* Ações */}
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={reset}
              disabled={isPending}
            >
              {editingId ? "Cancelar edição" : "Limpar"}
            </Button>
            <Button type="submit" disabled={!isFilled || isPending}>
              {isPending
                ? editingId
                  ? "Atualizando..."
                  : "Salvando..."
                : editingId
                  ? "Atualizar"
                  : "Salvar"}
            </Button>
          </div>
        </form>
      </Card>

      {/* ── Coluna direita: preview + tabela ────────────────────── */}
      <div className="space-y-6">
        <Card className="p-6">
          <header className="mb-5">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Pré-visualização
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              Veja como o agendamento aparecerá nos schedules da loja.
            </p>
          </header>

          <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/40">
            <p className="mb-3 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-600">
              {selectedStore?.name ?? "Loja não selecionada"}
            </p>

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-1.5">
                <span
                  className={cx(
                    "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
                    typeChip[form.type],
                  )}
                >
                  {typeLabel[form.type]}
                </span>

                <p
                  className={cx(
                    "text-sm font-semibold leading-snug",
                    form.description
                      ? "text-gray-900 dark:text-gray-50"
                      : "italic text-gray-400 dark:text-gray-600",
                  )}
                >
                  {form.description || "Descrição da manutenção"}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <RiCalendar2Line className="size-3.5 shrink-0" />
                    {form.date || "—"}
                  </span>
                  <span className="flex items-center gap-1">
                    <RiMapPinLine className="size-3.5 shrink-0" />
                    {form.location || "—"}
                  </span>
                  <span className="flex items-center gap-1">
                    <RiTimeLine className="size-3.5 shrink-0" />
                    {form.time || "—"}
                  </span>
                </div>

                <div className="flex items-center gap-1 pt-1 text-xs text-gray-500 dark:text-gray-400">
                  <RiToolsLine className="size-3.5 shrink-0" />
                  {form.technician || "Técnico não atribuído"}
                </div>
              </div>

              <div className="shrink-0 pt-1">
                {form.attendees.length > 0 ? (
                  <AvatarStack attendees={form.attendees} />
                ) : (
                  <span className="text-xs text-gray-400 dark:text-gray-600">
                    Sem participantes
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <header className="mb-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Agendamentos cadastrados
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
              Edite ou exclua os agendamentos existentes. As alterações refletem
              imediatamente nas páginas das lojas.
            </p>
          </header>
          <EventsTable
            events={initialEvents}
            editingId={editingId}
            deletingId={deletingId}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card>
      </div>
    </div>
  )
}
