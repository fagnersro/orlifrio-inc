'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { RiCloseLine, RiShieldCrossLine } from '@remixicon/react';

export function ForbiddenBanner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (searchParams.get('error') !== 'forbidden') return null;

  const dismiss = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('error');
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div
      role="alert"
      className="flex items-start gap-3 border-b border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
    >
      <RiShieldCrossLine className="mt-0.5 size-5 shrink-0" aria-hidden />
      <div className="flex-1">
        <p className="font-medium">Acesso negado</p>
        <p className="text-red-800/80 dark:text-red-300/80">
          Você não tem permissão para acessar essa área.
        </p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Fechar aviso"
        className="rounded p-1 text-red-900/70 hover:bg-red-100 hover:text-red-900 dark:text-red-200/70 dark:hover:bg-red-900/40 dark:hover:text-red-100"
      >
        <RiCloseLine className="size-4" aria-hidden />
      </button>
    </div>
  );
}
