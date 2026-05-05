# Phase 01: Foundation & Infrastructure - Context

**Gathered:** 2026-05-04
**Status:** Ready for planning

<domain>
## Phase Boundary
Esta fase estabelece a base técnica do projeto LifeRealFitness. O objetivo é ter um ambiente Next.js funcional, integrado ao Supabase com autenticação configurada, um design system inicial (CSS) e o deploy automático via Vercel.

</domain>

<decisions>
## Implementation Decisions

### Autenticação (Supabase Auth)
- **Providers:** Login via E-mail/Senha e Google Social Login.
- **Segurança:** Confirmação de e-mail obrigatória para ativação de conta.
- **Redirecionamento:** Após login, o usuário deve ser levado ao dashboard (ou onboarding se for novo).

### Banco de Dados (PostgreSQL)
- **Schema:**
  - `profiles`: Tabela para metadados do usuário (vinculada ao `auth.users`). Campos: `id`, `full_name`, `avatar_url`, `updated_at`.
  - `user_goals`: Tabela para configurações fitness. Campos: `id`, `user_id`, `goal_type` (enum), `monthly_budget`, `weekly_prep_time`, `equipment_available` (jsonb).

### Estilização e UI
- **Abordagem:** Híbrida.
  - `globals.css`: Variáveis de cor (Emerald, Slate), tipografia (Inter) e resets.
  - `*.module.css`: Estilização local para componentes.
- **Componentes Base:** Implementação responsiva de `Navbar`, `Button`, `Card` e `Input`.

### Infraestrutura
- **Deploy:** Configuração de CI/CD na Vercel conectada ao repositório GitHub.
- **Ambiente:** Uso de variáveis de ambiente (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) sincronizadas entre Supabase e Vercel.

</decisions>

<canonical_refs>
## Canonical References
**Downstream agents MUST read these before planning or implementing.**

- `01-UI-SPEC.md` — Contrato de design (Cores, Tipografia, Estética).
- `PROJECT.md` — Visão geral e stack.

</canonical_refs>

<specifics>
## Specific Ideas
- Usar a biblioteca `lucide-react` para ícones consistentes.
- Implementar Mobile-first na Navbar (menu hambúrguer ou bottom bar).

</specifics>

<deferred>
## Deferred Ideas
- Login via Apple ou outras redes sociais (Fase futura).
- Sistema de troca dinâmica de refeições (Fase 3).

</deferred>

---
*Phase: 01-foundation-infrastructure*
*Context gathered: 2026-05-04*
