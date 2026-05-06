# Phase 03: Motor de Nutrição e Logística - Context

**Gathered:** 2026-05-05
**Status:** Ready for planning

<domain>
## Phase Boundary
Esta fase foca no "cérebro" nutricional do app. Implementaremos um motor que gera sugestões de refeições usando IA, calcula custos estimados e organiza a logística de preparo (marmitas vs. diário) e compras.

</domain>

<decisions>
## Implementation Decisions

### Motor de Sugestão (IA)
- **Tecnologia:** Integração com Gemini API (Google AI).
- **Lógica:** O prompt enviará: Gasto Calórico, Meta de Macros, Objetivo, Tier de Orçamento e Restrições de Tempo.
- **Output:** Combinação de ingredientes, quantidades e (opcionalmente) modo de preparo.

### Lógica de Custos
- **Estimativa:** Uso de tabelas de preços médios por Tier (Econômico/Variado/Personalizado).
- **Exibição:** Custo por refeição exibido no Dashboard e custo total da semana na lista de compras.

### Gestão de Logística (Marmitas)
- **Modos:** Alternância entre "Semanal" (preparo em lote) e "Diário" (preparo imediato).
- **Impacto:** O modo Semanal prioriza ingredientes que duram mais na geladeira e receitas que podem ser congeladas.

### Lista de Compras
- **Organização:** Agrupamento por categorias de mercado (ex: Proteínas, Hortifruti, Despensa).
- **Sincronização:** Atualizada automaticamente conforme o plano de refeições é gerado/alterado.

</decisions>

<canonical_refs>
## Canonical References
- `02-CONTEXT.md` — Seguir as metas e tiers de orçamento capturados no onboarding.
- `src/utils/health.ts` — Usar o motor de cálculo de macros já implementado.

</canonical_refs>

<specifics>
## Specific Ideas
- Criar um componente de "Card de Refeição" que exibe o custo no canto superior.
- Botão "Regerar com IA" para quando o usuário não gostar da sugestão ou não tiver o ingrediente.

</specifics>

<deferred>
## Deferred Ideas
- Escaneamento de notas fiscais para preços reais (Futuro).
- Compartilhamento de lista de compras via WhatsApp.

</deferred>

---
*Phase: 03-motor-nutricao-logistica*
*Context gathered: 2026-05-05*
