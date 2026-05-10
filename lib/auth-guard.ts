import { auth } from '@/auth';
import { hasPermission, type Permission } from '@/features/authorization/permissions';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) redirect('/login');
  return session;
}

export async function requirePermission(permission: Permission){
  const session = await requireAuth();
  if (!hasPermission(session.user.role, permission)) {
    redirect('/?error=forbidden');
  }
  return session;
}