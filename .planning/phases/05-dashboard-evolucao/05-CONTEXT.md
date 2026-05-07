# Phase 05: Dashboard de Evolução - Context

**Gathered:** 2026-05-06
**Status:** Ready for planning

<domain>
## Phase Boundary
Esta fase foca na visualização histórica do progresso do usuário e no sistema de feedback proativo. Transformaremos dados brutos de logs em cards de evolução visualmente premium e um calendário de constância.

</domain>

<decisions>
## Implementation Decisions

### Cards de Evolução (Métricas)
- **Peso e Medidas:** Card dedicado com gráfico de linha customizado (SVG).
- **Aderência à Dieta:** Card dedicado com gráfico circular ou de barras mostrando a constância alimentar.
- **Input de Dados:** Adicionar modal no Dashboard para registro rápido de novo peso.

### Calendário Mensal
- **Visualização:** Grade mensal clássica exibindo ícones de "Check" para treinos realizados e refeições seguidas.
- **Interatividade:** Tooltip ou clique para ver o resumo do que foi feito no dia.

### Sistema de Feedback & Sugestões
- **Sugestão de Carga:** Algoritmo que compara o último treino do mesmo grupo muscular e sugere aumento de 2-5% se o usuário marcou como "fácil" ou completou todas as reps.
- **Alerta de Inatividade:** Mensagem de incentivo ("Welcome Back") que aparece após 3+ dias sem logs, sugerindo um treino de retomada.

### Design Premium (Custom Charts)
- **Tecnologia:** Uso de CSS puro e SVG dinâmico para renderizar os gráficos, evitando dependências externas e garantindo harmonia com o design system do app.

</decisions>

<canonical_refs>
## Canonical References
- `04-CONTEXT.md` — Usar os logs de treino (`workout_logs`) como base para os gráficos.
- `src/app/dashboard/actions.ts` — Base para novas actions de registro de métricas.

</canonical_refs>

<specifics>
## Specific Ideas
- "Streak" de dias seguidos treinando exibido com ícone de fogo.
- Comparação visual entre o "Peso Inicial" (Onboarding) e o "Peso Atual".

</specifics>

<deferred>
## Deferred Ideas
- Fotos de evolução (antes/depois) com proteção de privacidade.
- Relatórios mensais em PDF/Compartilháveis.

</deferred>

---
*Phase: 05-dashboard-evolucao*
*Context gathered: 2026-05-06*
