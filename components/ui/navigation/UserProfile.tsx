"use client"

import { Button } from "@/components/Button"
import { cx, focusRing } from "@/lib/utils"
import { ChevronsUpDown } from "lucide-react"
import { DropdownUserProfile } from "./DropdownUserProfile"

type UserProfileProps = {
  name?: string | null
  email?: string | null
  image?: string | null
}

function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return parts[0].slice(0, 2).toUpperCase()
  }
  if (email) return email[0].toUpperCase()
  return "?"
}

export function UserProfile({ name, email, image }: UserProfileProps) {
  const initials = getInitials(name, email)
  const displayName = name ?? email ?? "Usuário"

  return (
    <DropdownUserProfile email={email}>
      <Button
        aria-label="Configurações do usuário"
        variant="ghost"
        className={cx(
          "group flex w-full items-center justify-between rounded-md px-1 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200/50 data-[state=open]:bg-gray-200/50 hover:dark:bg-gray-800/50 data-[state=open]:dark:bg-gray-900",
          focusRing,
        )}
      >
        <span className="flex items-center gap-3">
          {image ? (
            <img
              src={image}
              alt={displayName}
              className="size-8 shrink-0 rounded-full border border-gray-300 dark:border-gray-800"
            />
          ) : (
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
              aria-hidden="true"
            >
              {initials}
            </span>
          )}
          <span className="max-w-[120px] truncate">{displayName}</span>
        </span>
        <ChevronsUpDown
          className="size-4 shrink-0 text-gray-500 group-hover:text-gray-700 group-hover:dark:text-gray-400"
          aria-hidden="true"
        />
      </Button>
    </DropdownUserProfile>
  )
}
