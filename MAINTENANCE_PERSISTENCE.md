# Persistência de Manutenções — Resumo da implementação

> Estado: **base funcional em DEV.** Cobre o ciclo formulário → banco → calendário/schedules da loja, incluindo assinatura por manager.

## O que foi feito

### 1. Schema do banco (`db/schema.ts`)

- **Enum `maintenance_type`** — `preventiva | corretiva | instalação`.
- **Tabela `maintenance_event`**
  | Coluna | Tipo | Notas |
  | --- | --- | --- |
  | `id` | `text` PK | UUID gerado pelo app (`crypto.randomUUID()`) |
  | `store_slug` | `text` not null | indexado; referência ao slug da loja (mock por enquanto) |
  | `type` | `maintenance_type` not null | |
  | `date` | `date` not null | indexado; formato `YYYY-MM-DD` |
  | `time` | `text` not null | formato `HH:MM` |
  | `description` | `text` not null | |
  | `location` | `text` not null | |
  | `technician_name` | `text` not null | nome do técnico — pessoas ainda em mock |
  | `attendees` | `jsonb` not null default `[]` | snapshot `{ name, initials, color }[]` no momento do agendamento |
  | `created_by` | `text` FK → `user.id` ON DELETE SET NULL | admin que criou |
  | `created_at` | `timestamp` not null default `now()` | |

- **Tabela `event_signature`** — many-to-many entre evento e usuário com PK composta `(event_id, user_id)`. Cascade ON DELETE em ambos lados. Garante que cada usuário só assina um mesmo evento uma vez.

Migration: `db/migrations/0003_opposite_iron_lad.sql`. Aplicada com `pnpm db:migrate` no postgres do `docker-compose.yml`.

### 2. Server Actions

- **`app/(dashboard)/manutencao/previsao/actions.ts` → `createMaintenanceEvent(input)`**
  - Protegido por `requirePermission('maintenance:manage')` (admin-only).
  - Valida com `lib/schemas/maintenance.ts` (Zod).
  - Insere no banco com `created_by = session.user.id`.
  - Chama `revalidatePath('/stores/<slug>')` para que a página da loja reflita o novo evento sem reload manual.

- **`app/(dashboard)/stores/[slug]/actions.ts` → `signMaintenanceEvent(eventId, storeSlug)`**
  - Protegido por `requirePermission('events:sign')` (manager-only).
  - Insere em `event_signature` com `onConflictDoNothing()` — idempotente; clicar "Assinar" duas vezes não falha.
  - `revalidatePath` da loja.

### 3. Form de Previsão (`PrevisaoForm.tsx`)

- `useTransition` para `isPending`, mostra "Salvando..." e desabilita os botões.
- Em sucesso: reseta o form e mostra banner verde.
- Em erro: extrai a primeira mensagem do shape `{ errors: { campo?: [...], _form?: [...] } }` e mostra banner vermelho.
- Preview lateral continua atualizando em tempo real conforme o usuário preenche.

### 4. Página da loja (`stores/[slug]/page.tsx`)

- Faz dois selects via Drizzle:
  1. `maintenance_event` filtrado por `store_slug`, ordenado por `date, time`.
  2. `event_signature` filtrado por `(user_id = session.user.id, event_id IN <ids buscados>)`.
- Mapeia rows do banco para o tipo `MaintenanceEvent` esperado pelo `StoreCalendar`.
- Passa `events`, `canSign`, `currentAttendee` e `initialSignedEventIds` ao calendário.

### 5. `StoreCalendar.tsx` — assinaturas reais

- Tipo `MaintenanceEvent` ganhou `id?: string` (opcional). DB events têm; mock events (caso ainda apareçam em outros lugares) não têm.
- `signed: Set<string>` agora é indexado por **id do evento** e inicializado com `initialSignedEventIds`.
- Botão "Assinar" só aparece se: `canSign` **e** `event.id` existe **e** `currentAttendee` está disponível.
- Ao clicar:
  - Atualização otimista (marca como assinado imediatamente).
  - Chama `signMaintenanceEvent` em uma `startTransition`.
  - Em caso de erro, reverte o state local.
- Marcação dos dias no calendário (pontinho colorido) continua funcionando — depende só de `events`, agora alimentado pelo banco.

## Como o ciclo se fecha hoje

```
admin abre /manutencao/previsao
  ↓ preenche e envia
createMaintenanceEvent (server action) — Zod, INSERT, revalidatePath
  ↓
loja /stores/<slug> renderiza com a nova manutenção no calendário
  ↓
manager clica "Assinar" no card
  ↓
signMaintenanceEvent — INSERT em event_signature, revalidatePath
  ↓
avatar do manager aparece na stack do card; estado sobrevive a refresh
```

## Permissões envolvidas (já existentes)

| Ação | Permissão | Roles |
| --- | --- | --- |
| Acessar `/manutencao/*` | `maintenance:manage` | admin |
| Criar evento via action | `maintenance:manage` | admin |
| Assinar evento | `events:sign` | manager |

A defesa fica em três camadas: proxy (`route-permissions.ts`), layout (`requirePermission`) e server action (`requirePermission` antes do INSERT).

## Próximos passos

### Curto prazo (continuidade direta)

1. **Listar/editar/deletar eventos no painel admin.** Hoje o admin só cria. Faltam:
   - Tabela em `/manutencao/previsao` (ou nova subrota) listando eventos futuros e passados por loja.
   - Action `updateMaintenanceEvent(id, input)` e `deleteMaintenanceEvent(id)` com mesma proteção.

2. **Tornar `Stores` uma tabela real.** `store_slug` hoje é texto livre; nada impede inserir um slug que não existe na lista mock. Quando virar tabela:
   - FK em `maintenance_event.store_id` (em vez de `store_slug`).
   - Selects no form preenchidos do banco.

3. **Tornar pessoas/técnicos uma tabela real (ou usar `user`).**
   - Hoje `technician_name` e `attendees` são texto/JSONB. Funciona porque o catálogo é mock e estável.
   - Quando virar real: `technician_id` FK e `event_attendee` (junção) — mantém histórico via snapshot ou via versão de pessoa.

4. **Indicar quem assinou no card.**
   - Hoje, ao assinar, o avatar do **usuário atual** aparece. Mas se outro manager já assinou antes, o avatar dele não é exibido (a query só traz assinaturas do usuário logado).
   - Fix: na page, fazer `LEFT JOIN` em `event_signature` para trazer todos os signers do evento e renderizar todos os avatares.

5. **Seed do mock antigo (opcional).** Hoje o calendário começa vazio até o admin criar eventos. Se quiser preservar a sensação do demo, criar um script `db/seed.ts` que insere os eventos mock antigos de cada loja.

### Médio prazo

6. **Validação de regras de negócio.** Hoje aceita qualquer data (passada, hoje, futura). Decidir:
   - É permitido criar agendamento com data passada?
   - Limite mínimo de antecedência?
   - Conflito de técnico no mesmo horário em lojas diferentes?

7. **Notificações.** Quando admin agenda, técnico/manager envolvidos recebem email/notif. Stack candidata: Resend (já planejado para reset de senha).

8. **Histórico de alterações.** Tabela `maintenance_event_history` para auditoria — quem mudou o quê, quando.

### Pendência técnica notada (fora do escopo deste passo)

- **PK composta legada em `account` e `verification_token`.** As tabelas foram declaradas no schema com `(t) => [{ compoundKey: primaryKey(...) }]` (wrapper de objeto), sintaxe que o drizzle-kit moderno **não reconhece** — resultado: nenhuma das duas tabelas tem PK composta no postgres. O auth flow não nota porque os inserts/selects do adapter Drizzle não dependem dela, mas é uma fragilidade real (permite linhas duplicadas em `account`). Correção: trocar para `(t) => [primaryKey({ columns: [...] })]` (sem wrapper, igual `event_signature`) e gerar uma migration de `ADD CONSTRAINT`. Não fiz aqui porque está fora do escopo desta tarefa e mexe em tabelas críticas do auth.
