# RESEARCH: Phase 01 - Foundation & Infrastructure

## Technical Overview
Esta fase foca na configuração do ecossistema LifeRealFitness, utilizando Next.js (App Router) e Supabase. A arquitetura será baseada em SSR (Server-Side Rendering) para garantir segurança e performance, utilizando o pacote `@supabase/ssr` para gestão de cookies.

## 1. Next.js & Supabase SSR
A integração seguirá o padrão oficial de 2024/2025 para garantir que a autenticação funcione corretamente em Server Components, Client Components, Route Handlers e Middleware.

### Dependências Core
```bash
npm install @supabase/supabase-js @supabase/ssr lucide-react
```

### Utilitários de Cliente
Serão criados dois utilitários principais:
- `utils/supabase/client.ts`: Para uso em Client Components.
- `utils/supabase/server.ts`: Para uso em Server Components e Server Actions.

### Middleware
Um `middleware.ts` na raiz será essencial para:
1. Atualizar a sessão do usuário antes da renderização.
2. Proteger rotas privadas (ex: `/dashboard`, `/onboarding`).

## 2. Autenticação (Auth)
O sistema suportará E-mail/Senha e Google Social Login.

### Fluxo Google OAuth
1. **Google Cloud Console:** Criar ID de cliente OAuth (Web Application).
2. **Supabase Dashboard:** Configurar o provider Google com Client ID e Secret.
3. **Redirecionamento:** Uso de Server Actions para iniciar o login e um Route Handler (`app/auth/callback/route.ts`) para trocar o código pela sessão.

## 3. Database Schema & RLS
A estrutura inicial focará na persistência de dados do usuário e seus objetivos iniciais.

### Tabelas
- **`profiles`**:
  - `id`: uuid (PK, references `auth.users`).
  - `full_name`: text.
  - `avatar_url`: text.
  - `updated_at`: timestamp with time zone.
- **`user_goals`**:
  - `id`: uuid (PK).
  - `user_id`: uuid (references `profiles.id`).
  - `goal_type`: text (ou enum: 'weight_loss', 'muscle_gain', 'maintenance').
  - `monthly_budget`: numeric.
  - `weekly_prep_time`: integer (minutos).
  - `equipment_available`: jsonb.

### Automação (Triggers)
Será implementada uma função PL/pgSQL e um trigger para criar automaticamente uma entrada na tabela `profiles` sempre que um novo usuário confirmar o cadastro via Auth.

### Row Level Security (RLS)
- Política: `Users can only see and update their own data`.
- Aplicado a ambas as tabelas `profiles` e `user_goals`.

## 4. Estilização (Vanilla CSS)
Conforme o `UI-SPEC.md`, utilizaremos CSS puro para máxima flexibilidade e performance.

- **`app/globals.css`**: Contém variáveis de cor (Honeydew, Emerald, Slate), reset e tipografia Inter (via Google Fonts).
- **CSS Modules**: Para componentes isolados, evitando colisão de classes.

## 5. Deployment (Vercel)
- Conectar repositório GitHub à Vercel.
- Sincronizar variáveis de ambiente:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (se necessário para admin tasks).

## 6. Validation Architecture
Para garantir a qualidade da fundação, seguiremos esta estratégia de testes:

### Unit Tests
- Testar utilitários de formatação e lógica de redirecionamento.
- Ferramenta: Vitest.

### Integration Tests
- Validar o fluxo de autenticação (Mocking Supabase client).
- Verificar se o middleware protege corretamente as rotas.

### E2E Tests (Opcional para Phase 1)
- Fluxo completo: Cadastro -> Login -> Redirecionamento para Onboarding.
- Ferramenta: Playwright.

### Manual Verification
- Testar login social em ambiente de preview (Vercel).
- Inspecionar cookies no navegador para confirmar persistência.

---
*Created: 2026-05-05*
*Status: COMPLETED*
