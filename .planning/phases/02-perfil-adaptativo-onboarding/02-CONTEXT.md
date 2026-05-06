# Phase 02: Perfil Adaptativo (Onboarding) - Context

**Gathered:** 2026-05-05
**Status:** Ready for planning

<domain>
## Phase Boundary
Esta fase foca na criação do fluxo de onboarding para novos usuários. O objetivo é capturar métricas físicas, restrições financeiras e de tempo, e definir o objetivo principal do usuário, fornecendo feedback imediato com cálculos de saúde.

</domain>

<decisions>
## Implementation Decisions

### UI/UX: Formulário de Onboarding
- **Estrutura:** Formulário único segmentado em seções lógicas (Dados Físicos, Logística, Objetivos).
- **Progressão:** Indicador visual de progresso persistente (ex: barra de progresso ou stepper).
- **Mobile:** Design responsivo e conciso, evitando rolagens excessivas ou campos desnecessários.

### Coleta de Dados (Input)
- **Dados Físicos:** Peso, Altura, Idade, Gênero.
- **Logística e Orçamento:**
  - **Tiers de Orçamento:** Econômico, Variado, Personalizado.
  - **Suplementação:** Opção para indicar uso de suplementos comprados (Checkbox/Toggle).
  - **Tempo de Preparo:** Definir faixas (Express, Meal Prep, Disponibilidade Total).
- **Objetivos:** Seleção de um objetivo principal (Emagrecimento, Massa, Manutenção). Possibilidade de alteração futura após período de progresso (a ser implementado na Fase 5).

### Feedback Imediato (Output)
O sistema deve calcular e exibir em tempo real (ou via transição suave após preenchimento):
- **IMC:** Índice de Massa Corporal.
- **Gasto Calórico:** Estimativa de gasto diário (TMB + Fator de Atividade).
- **Distribuição de Macros:** Sugestão de Proteína, Carboidrato e Gordura baseada no objetivo selecionado.

### Persistência
- Dados salvos na tabela `user_goals` e atualização de metadados em `profiles` (se necessário).

</decisions>

<canonical_refs>
## Canonical References
- `01-UI-SPEC.md` — Seguir design system de Vanilla CSS.
- `01-CONTEXT.md` — Referência sobre tabelas Supabase.

</canonical_refs>

<specifics>
## Specific Ideas
- Usar animações suaves (CSS Transitions) para transição entre os segmentos do formulário.
- Os cálculos de IMC/Macros devem ser feitos no client-side para feedback instantâneo antes do save final.

</specifics>

<deferred>
## Deferred Ideas
- Histórico de mudanças de objetivo (Fase 5).
- Integração com Apple Health/Google Fit (Futuro).

</deferred>

---
*Phase: 02-perfil-adaptativo-onboarding*
*Context gathered: 2026-05-05*
