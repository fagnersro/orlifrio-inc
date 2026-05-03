"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTrigger,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu"
import { logoutAction } from "@/app/(auth)/login/actions"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

export type DropdownUserProfileProps = {
  children: React.ReactNode
  align?: "center" | "start" | "end"
  email?: string | null
}

export function DropdownUserProfile({
  children,
  align = "start",
  email,
}: DropdownUserProfileProps) {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className="sm:!min-w-[calc(var(--radix-dropdown-menu-trigger-width))]"
      >
        <DropdownMenuLabel>{email ?? "Usuário"}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSubMenu>
            <DropdownMenuSubMenuTrigger>Tema</DropdownMenuSubMenuTrigger>
            <DropdownMenuSubMenuContent>
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(value) => setTheme(value)}
              >
                <DropdownMenuRadioItem
                  aria-label="Modo claro"
                  value="light"
                  iconType="check"
                >
                  <Sun className="size-4 shrink-0" aria-hidden="true" />
                  Claro
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  aria-label="Modo escuro"
                  value="dark"
                  iconType="check"
                >
                  <Moon className="size-4 shrink-0" aria-hidden="true" />
                  Escuro
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  aria-label="Modo do sistema"
                  value="system"
                  iconType="check"
                >
                  <Monitor className="size-4 shrink-0" aria-hidden="true" />
                  Sistema
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubMenuContent>
          </DropdownMenuSubMenu>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <form action={logoutAction} className="w-full">
              <button type="submit" className="w-full text-left">
                Sair
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
