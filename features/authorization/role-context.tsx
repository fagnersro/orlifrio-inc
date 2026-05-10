"use client"

import { createContext, useContext } from "react"
import type { UserRole } from "@/db/schema"

const RoleContext = createContext<UserRole | undefined>(undefined)

export function RoleProvider({
  role,
  children,
}: {
  role: UserRole | undefined
  children: React.ReactNode
}) {
  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>
}

export function useRole(): UserRole | undefined {
  return useContext(RoleContext)
}
