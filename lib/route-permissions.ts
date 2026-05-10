import type { Permission } from './permissions';

/**
 * Mapeia prefixos de URL para a permissão necessária.
 * Fonte única de verdade usada pela sidebar (UI) e pelo proxy (server-side).
 *
 * Ordem importa: prefixos mais específicos devem vir antes dos mais genéricos.
 */
export const ROUTE_PERMISSIONS: ReadonlyArray<{
  prefix: string;
  permission: Permission;
}> = [
  { prefix: '/clientes', permission: 'users:read' },
  { prefix: '/manutencao', permission: 'maintenance:manage' },
  { prefix: '/relatorios', permission: 'reports:view' },
  { prefix: '/configuracoes', permission: 'settings:manage' },
];

export function permissionForPath(pathname: string): Permission | undefined {
  const match = ROUTE_PERMISSIONS.find(
    (r) => pathname === r.prefix || pathname.startsWith(r.prefix + '/'),
  );
  return match?.permission;
}
