import { auth } from '@/auth';

export default auth((req) => {
  // Sessão acessível em req.auth
  // Sem lógica adicional por enquanto — apenas anexa a sessão
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};