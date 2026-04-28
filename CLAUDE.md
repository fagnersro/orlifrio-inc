@AGENTS.md
# Contexto do Sistema de Autenticação — Orlifrio

> Este documento descreve a arquitetura, decisões e estado atual do sistema de
> autenticação. Use como referência ao implementar novas funcionalidades
> relacionadas a auth, sessões ou proteção de rotas.

## Stack Técnico

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Runtime:** Node.js (não Edge — `proxy.ts` roda em Node)
- **Auth:** Auth.js v5 (`next-auth@beta`)
- **ORM:** Drizzle ORM
- **Banco:** PostgreSQL 16 (rodando em Docker via `docker-compose.yml`)
- **Validação:** Zod
- **Hash de senha:** bcryptjs (10 rounds)
- **UI:** Tailwind CSS + componentes próprios em `@/components/*`
- **Gerenciador de pacotes:** pnpm

## Estrutura de Arquivos Relevante

```
.
├── auth.ts                          # Configuração principal do Auth.js
├── proxy.ts                         # Substitui middleware.ts no Next 16
├── drizzle.config.ts                # Config do Drizzle Kit
├── docker-compose.yml               # Postgres em container
├── db/
│   ├── index.ts                     # Conexão com o banco (sem dotenv aqui!)
│   ├── schema.ts                    # Tabelas (user, account, session, verification_token)
│   ├── test.ts                      # Script standalone de teste (com dotenv)
│   └── migrations/                  # Migrations geradas pelo Drizzle Kit
├── lib/
│   └── schemas/
│       └── auth.ts                  # Schemas Zod (loginSchema, registerSchema)
└── app/
    └── (auth)/
        └── login/
            ├── page.tsx             # Página única com tabs Login/Registro
            └── actions.ts           # Server Actions (loginAction, registerAction)
```

## Decisões Arquiteturais Importantes

### 1. Estratégia de Sessão: JWT (não database)
Usamos `session: { strategy: 'jwt' }` no `auth.ts` porque o provider Credentials
**não funciona** com estratégia de sessão em banco. JWTs são assinados com `AUTH_SECRET`.

### 2. Tabela `user` tem coluna `password` customizada
Não faz parte do schema padrão do Auth.js. É **nullable** porque usuários OAuth
(Google/Apple) não têm senha. O provider Credentials lê dessa coluna.

### 3. Vinculação automática de contas (email matching)
`Google` provider tem `allowDangerousEmailAccountLinking: true`. Seguro porque
Google verifica emails. Permite que um usuário cadastrado por email/senha
vincule automaticamente sua conta Google se usar o mesmo email.

### 4. `dotenv` apenas em scripts standalone
- ❌ NÃO importar `dotenv` em `db/index.ts`, `auth.ts`, ou qualquer código
  rodado pelo Next.js (ele carrega `.env.local` automaticamente)
- ✅ USAR `dotenv` em scripts standalone como `db/test.ts` e `drizzle.config.ts`
  (usados pelo `tsx` ou `drizzle-kit`, que não carregam env automaticamente)

### 5. Next.js 16: `proxy.ts` substitui `middleware.ts`
O `proxy.ts` roda em **Node.js runtime**, então pode importar Drizzle, postgres.js,
bcrypt diretamente. Não precisa separar `auth.config.ts` (Edge-safe) como era no Next 15.

### 6. Server Actions com `useActionState`
Todas as ações de auth (login, registro) são server actions. Erros são retornados
como objeto `{ errors: { campo: [...mensagens], _form: [...] } }` para fácil
renderização de erros inline e gerais.

### 7. Tratamento do `signIn()` em try/catch
`signIn()` redireciona via `throw NEXT_REDIRECT`. Em server actions:
- Em catch, capturar `AuthError` (instanceof) para tratar erros de credenciais
- **Re-lançar outros erros** com `throw error` para não engolir o redirect

## Schema do Banco

### Tabela `user` (singular, exigido pelo Auth.js)
- `id` (text, PK, UUID)
- `name` (text, nullable)
- `email` (text, unique, not null)
- `email_verified` (timestamp, nullable)
- `image` (text, nullable)
- `password` (text, nullable) — **CUSTOMIZADO**, para Credentials provider

### Tabela `account`
Vincula usuário a provedor OAuth. Chave primária composta por
`(provider, provider_account_id)`. Cascade on delete.

### Tabela `session`
Não usada na prática (usamos JWT), mas existe porque o adapter exige.

### Tabela `verification_token`
Para magic links e verificação de email (não implementado ainda).

## Variáveis de Ambiente (`.env.local`)

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/meuapp_dev
AUTH_SECRET=<gerar com: openssl rand -base64 32>
AUTH_TRUST_HOST=true
AUTH_GOOGLE_ID=<do Google Cloud Console>
AUTH_GOOGLE_SECRET=<do Google Cloud Console>
```

## Scripts Disponíveis (`package.json`)

```bash
pnpm dev              # Inicia Next.js
pnpm db:generate      # Gera migration baseada em mudanças no schema
pnpm db:migrate       # Aplica migrations no banco
pnpm db:push          # Push direto sem gerar migration (só dev)
pnpm db:studio        # Abre Drizzle Studio (UI do banco)
```

Para rodar scripts standalone com env carregado:
```bash
npx tsx --env-file=.env.local db/test.ts
```

## Funcionalidades Implementadas ✅

- [x] Postgres em Docker com volume persistente
- [x] Drizzle ORM com schema completo do Auth.js
- [x] Auth.js v5 configurado com adapter Drizzle
- [x] Login com Google (OAuth, OIDC)
- [x] Registro com email/senha (bcrypt + Zod)
- [x] Login com email/senha (Credentials provider)
- [x] Validação client + server com mensagens de erro inline
- [x] UI integrada (página única com tabs Login/Registro)
- [x] Vinculação automática de contas pelo email (Google)
- [x] `proxy.ts` configurado para anexar sessão a requests

## Roadmap — Próximas Funcionalidades

### 🥇 Alta prioridade
- [ ] **Logout** — botão/server action que chama `signOut()`
- [ ] **Menu de usuário** no header (avatar + dropdown com nome, email, sair)
- [ ] **Proteção de rotas privadas** — redirecionar não-autenticados de `/dashboard`, `/perfil`, etc. para `/login`
- [ ] **Hook ou helper** `getSession()` server-side para usar em páginas/layouts

### 🥈 Média prioridade
- [ ] **Recuperação de senha** — fluxo "esqueci minha senha" com envio de email (Resend recomendado)
- [ ] **Verificação de email** — preencher `email_verified` e exigir antes de ações críticas
- [ ] **Atualização de perfil** — alterar nome, foto, senha
- [ ] **Vincular/desvincular contas OAuth** nas configurações

### 🥉 Baixa prioridade
- [ ] **Apple Sign-In** — requer conta Apple Developer ($99/ano)
- [ ] **Rate limiting** no endpoint de login (proteção brute force)
- [ ] **2FA** com TOTP (Google Authenticator, Authy)
- [ ] **Logs de sessão** — histórico de logins por usuário

## Convenções do Projeto

### Componentes
- Usar componentes existentes em `@/components/*` (Button, Input, Label, Divider)
- Manter classes Tailwind como estão (não introduzir styled-components)
- Suportar dark mode em tudo (`dark:` classes)
- Animações via componente `AnimatedElement` com `slideUpFade`

### Server Actions
- Sempre validar com Zod antes de qualquer operação
- Retornar erros estruturados: `{ errors: { campo?: string[], _form?: string[] } }`
- Para redirects pós-ação, usar `redirectTo` no `signIn()` ou `redirect()` do Next

### Banco de dados
- Sempre usar Drizzle queries (`db.select()`, `db.insert()`) — nunca SQL raw
- Imports de schema sempre de `@/db/schema`
- Para nova tabela: editar `schema.ts` → `pnpm db:generate` → `pnpm db:migrate`

### Segurança
- bcrypt com 10 rounds para hash de senha
- Nunca logar senhas, tokens ou hashes
- Usar `AUTH_SECRET` de pelo menos 32 bytes
- Cookies `httpOnly` e `Secure` (Auth.js já configura)

## Erros Comuns e Soluções

**`A Node.js API is used (process.cwd) which is not supported in the Edge Runtime`**
→ No Next 16 não acontece (usa `proxy.ts` em Node), mas se aparecer, garanta que
não há `dotenv/config` em arquivos importados pelo proxy/middleware.

**`OAuthAccountNotLinked`**
→ Email já cadastrado por outro provider. Solução: `allowDangerousEmailAccountLinking: true`
no provider, OU tratar como erro e sugerir login pelo método original.

**`CredentialsSignin` no login**
→ Email/senha errados. O `authorize` retornou `null`. Mensagem genérica para o
usuário ("Email ou senha inválidos") por segurança — não revelar qual está errado.

**`NEXT_REDIRECT` no console**
→ Não é erro. É como `signIn()` redireciona. Ignorar se o redirect funciona.