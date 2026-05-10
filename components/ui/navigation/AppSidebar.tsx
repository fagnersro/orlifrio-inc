"use client"
import { Divider } from "@/components/Divider"
import { Input } from "@/components/Input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarLink,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarSubLink,
} from "@/components/Sidebar"
import { hasPermission, type Permission } from "@/lib/permissions"
import { useRole } from "@/lib/role-context"
import { cx, focusRing } from "@/lib/utils"
import { RiArrowDownSFill } from "@remixicon/react"
import {
  House,
  Settings,
  Thermometer,
  Users,
  Wrench,
} from "lucide-react"
import * as React from "react"
import  { Logo }  from "../../../public/Logo"
import { UserProfile } from "./UserProfile"

type NavItem = {
  name: string
  href: string
  icon: React.ElementType
  notifications: boolean
  active: boolean
  permission?: Permission
}

type NavGroup = {
  name: string
  icon: React.ElementType
  children: ReadonlyArray<{
    name: string
    href: string
    active: boolean
    permission?: Permission
  }>
}

const navigation: ReadonlyArray<NavItem> = [
  {
    name: "Visão Geral",
    href: "/",
    icon: House,
    notifications: false,
    active: false,
  },
  {
    name: "Equipamentos",
    href: "/equipamentos/geral",
    icon: Thermometer,
    notifications: false,
    active: false,
  },
  {
    name: "Clientes",
    href: "/clientes",
    icon: Users,
    notifications: false,
    active: false,
    permission: "users:read",
  },
]

const navigation2: ReadonlyArray<NavGroup> = [
  {
    name: "Operações",
    icon: Wrench,
    children: [
      {
        name: "Manutenção",
        href: "/manutencao",
        active: false,
        permission: "maintenance:manage",
      },
      {
        name: "Relatórios",
        href: "/relatorios",
        active: false,
        permission: "reports:view",
      },
    ],
  },
  {
    name: "Configurações",
    icon: Settings,
    children: [
      {
        name: "Geral",
        href: "/configuracoes",
        active: false,
        permission: "settings:manage",
      },
    ],
  },
]

type SessionUser = {
  name?: string | null
  email?: string | null
  image?: string | null
}

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user?: SessionUser }) {
  const role = useRole()
  const [openMenus, setOpenMenus] = React.useState<string[]>([
    navigation2[0].name,
  ])
  const toggleMenu = (name: string) => {
    setOpenMenus((prev: string[]) =>
      prev.includes(name)
        ? prev.filter((item: string) => item !== name)
        : [...prev, name],
    )
  }
  return (
    <Sidebar {...props} className="bg-gray-50 dark:bg-gray-925">
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-white p-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
            <Logo className="size-6 text-blue-500 dark:text-blue-500" />
          </span>
          <div>
            <span className="block text-sm font-semibold text-[#0b2d7a] dark:text-gray-50">
              Orlifrio
            </span>
            <span className="block text-xs text-[#e11d48] dark:text-gray-400">
              Refrigeração
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <Input
              type="search"
              placeholder="Buscar..."
              className="[&>input]:sm:py-1.5"
            />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="pt-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => {
                const disabled = item.permission
                  ? !hasPermission(role, item.permission)
                  : false
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarLink
                      href={item.href}
                      isActive={item.active}
                      icon={item.icon}
                      notifications={item.notifications}
                      disabled={disabled}
                    >
                      {item.name}
                    </SidebarLink>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-3">
          <Divider className="my-0 py-0" />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {navigation2.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={cx(
                      "flex w-full items-center justify-between gap-x-2.5 rounded-md p-2 text-base text-gray-900 transition hover:bg-gray-200/50 sm:text-sm dark:text-gray-400 hover:dark:bg-gray-900 hover:dark:text-gray-50",
                      focusRing,
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon
                        className="size-[18px] shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                    <RiArrowDownSFill
                      className={cx(
                        openMenus.includes(item.name)
                          ? "rotate-0"
                          : "-rotate-90",
                        "size-5 shrink-0 text-gray-400 transition-transform duration-150 ease-in-out dark:text-gray-600",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {item.children && openMenus.includes(item.name) && (
                    <SidebarMenuSub>
                      <div className="absolute inset-y-0 left-4 w-px bg-gray-300 dark:bg-gray-800" />
                      {item.children.map((child) => {
                        const disabled = child.permission
                          ? !hasPermission(role, child.permission)
                          : false
                        return (
                          <SidebarMenuItem key={child.name}>
                            <SidebarSubLink
                              href={child.href}
                              isActive={child.active}
                              disabled={disabled}
                            >
                              {child.name}
                            </SidebarSubLink>
                          </SidebarMenuItem>
                        )
                      })}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="border-t border-gray-200 dark:border-gray-800" />
        <UserProfile name={user?.name} email={user?.email} image={user?.image} />
      </SidebarFooter>
    </Sidebar>
  )
}
