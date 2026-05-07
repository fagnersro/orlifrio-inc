'use client';

import { useRole } from '@/lib/role-context';
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  type Permission,
} from '@/lib/permissions';

type CanProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
} & (
  | { permission: Permission; any?: never; all?: never }
  | { any: Permission[]; permission?: never; all?: never }
  | { all: Permission[]; permission?: never; any?: never }
);

/**
 * Renderiza `children` apenas se a role da sessão atender à(s) permissão(ões).
 *
 * IMPORTANTE: este componente é apenas UI. Toda checagem de segurança real
 * deve estar nos guards server-side (`requirePermission` em `lib/auth-guard.ts`).
 *
 * @example
 *   <Can permission="users:create"><Button>Novo usuário</Button></Can>
 *   <Can any={["reports:view", "reports:export"]}>...</Can>
 *   <Can all={["services:update", "services:assign"]}>...</Can>
 */
export function Can({ children, fallback = null, ...rest }: CanProps) {
  const role = useRole();

  let allowed = false;
  if ('permission' in rest && rest.permission) {
    allowed = hasPermission(role, rest.permission);
  } else if ('any' in rest && rest.any) {
    allowed = hasAnyPermission(role, rest.any);
  } else if ('all' in rest && rest.all) {
    allowed = hasAllPermissions(role, rest.all);
  }

  return <>{allowed ? children : fallback}</>;
}
