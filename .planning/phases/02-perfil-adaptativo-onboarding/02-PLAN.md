# Phase 02: Perfil Adaptativo (Onboarding) - Plan

## Goal
Implementar o fluxo de onboarding segmentado para coletar dados físicos, objetivos e restrições financeiras/tempo, fornecendo feedback de saúde em tempo real.

## User Review Required
> [!IMPORTANT]
> As fórmulas de cálculo (Mifflin-St Jeor) serão implementadas no client-side para feedback imediato. Confirme se as proporções de macros sugeridas no RESEARCH.md (ex: 40/40/20 para perda de peso) atendem sua visão inicial.

## Wave 1: Schema Updates & Form Logic
Focus: Garantir que os dados possam ser salvos e que a lógica de cálculo funcione.

- **Task 1.1: Database Schema Finalization**
  - Adicionar campos faltantes em `user_goals` (ex: `activity_level`, `age`, `gender`, `height`, `weight`).
  - *Nota: Já temos `goal_type`, `monthly_budget`, `weekly_prep_time`.*
- **Task 1.2: Onboarding Form Store/State**
  - Implementar hook de formulário (React Hook Form + Zod) para gerenciar o estado segmentado.
- **Task 1.3: Calculation Engine**
  - Criar utilitário `src/utils/health-calculations.ts` com funções para IMC, TMB, GET e Macros.

## Wave 2: UI Implementation
Focus: Construir a experiência do usuário responsiva e visual.

- **Task 2.1: ProgressBar Component**
  - Criar componente visual para indicar progresso entre as seções do formulário.
- **Task 2.2: Onboarding Page Layout**
  - Implementar `app/onboarding/page.tsx` com as seções:
    1. Dados Pessoais (Idade/Gênero/Peso/Altura/Atividade).
    2. Objetivos (Tipo de meta).
    3. Logística (Orçamento/Tempo/Suplementos).
- **Task 2.3: Feedback Cards**
  - Criar cards que exibem os resultados calculados (IMC, Calorias, Macros) dinamicamente conforme preenchimento.

## Wave 3: Integration & Persistence
Focus: Salvar os dados e redirecionar o usuário.

- **Task 3.1: Server Actions for Onboarding**
  - Criar action para salvar os dados no Supabase e redirecionar para `/dashboard`.
- **Task 3.2: Middleware & Routing**
  - Garantir que usuários sem onboarding completo sejam redirecionados para `/onboarding`.

## Verification (UAT)
- [ ] **Real-time Feedback**: Alterar o peso atualiza o IMC e calorias instantaneamente na tela.
- [ ] **Persistence**: Após concluir, os dados estão corretos no Supabase.
- [ ] **Responsive UI**: O formulário é fácil de usar no mobile (seções claras).
- [ ] **Redirect**: Usuário logado e sem perfil vai para `/onboarding` ao tentar acessar `/dashboard`.
