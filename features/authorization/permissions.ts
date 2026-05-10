import type { UserRole } from "@/db/schema"

// Defina TODAS as permissões do sistema aqui
export const PERMISSIONS = {
  // Usuários
  "users:read": ["admin", "manager"],
  "users:create": ["admin"],
  "users:update": ["admin"],
  "users:delete": ["admin"],

  // Serviços
  "services:read": ["admin", "manager", "technical", "customer"],
  "services:create": ["admin", "manager", "customer"],
  "services:update": ["admin", "manager", "technical"],
  "services:delete": ["admin", "manager"],
  "services:assign": ["admin", "manager"], // atribuir técnico

  // Relatórios
  "reports:view": ["admin", "manager"],
  "reports:download": ["admin", "manager", "technical"],
  "reports:export": ["admin"],

  // Eventos / Manutenções
  "events:sign": ["manager"],
  "maintenance:manage": ["admin"],

  // Configurações
  "settings:manage": ["admin"],
} as const

export type Permission = keyof typeof PERMISSIONS

/**
 * Checa se uma role tem uma permissão específica.
 * Função pura, sem efeitos colaterais — pode ser usada em qualquer lugar.
 */
export function hasPermission(
  role: UserRole | undefined,
  permission: Permission,
): boolean {
  if (!role) return false
  return (PERMISSIONS[permission] as readonly string[]).includes(role)
}

/**
 * Helper para checar múltiplas permissões (qualquer uma).
 */
export function hasAnyPermission(
  role: UserRole | undefined,
  permissions: Permission[],
): boolean {
  return permissions.some((p) => hasPermission(role, p))
}

/**
 * Helper para checar múltiplas permissões (todas).
 */
export function hasAllPermissions(
  role: UserRole | undefined,
  permissions: Permission[],
): boolean {
  return permissions.every((p) => hasPermission(role, p))
}
