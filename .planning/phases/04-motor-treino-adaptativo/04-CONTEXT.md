# Phase 04: Motor de Treino Adaptativo - Context

**Gathered:** 2026-05-05
**Status:** Ready for planning

<domain>
## Phase Boundary
Esta fase foca na criação de treinos personalizados e dinâmicos baseados no tempo disponível do usuário no dia e no inventário de equipamentos que ele possui. Inclui uma interface interativa para a execução do treino.

</domain>

<decisions>
## Implementation Decisions

### Inventário de Equipamentos
- **Estrutura:** Lista detalhada de itens (ex: Halteres, Barra, Banco, Elásticos, Pull-up bar).
- **Persistência:** Salvo no perfil do usuário para que a IA saiba o que está disponível.

### Algoritmo de Treino (IA)
- **Modo:** IA Criativa (Gemini) gerando séries, repetições e seleção de exercícios.
- **Biblioteca Base:** O sistema possuirá uma lista fixa de exercícios padronizados com URLs de vídeos/GIFs demonstrativos. A IA deve referenciar esses IDs para garantir a exibição visual.
- **Dinâmica:** O treino é gerado "sob demanda" para o tempo que o usuário tem hoje, sem necessariamente seguir um split rígido (ABC).

### Modo Play (Interface de Execução)
- **Funcionalidades:** 
  - Visualização clara do exercício atual.
  - Timer de descanso interativo.
  - Input para anotar carga (peso) e repetições reais.
  - Demonstração visual (Vídeo/GIF).

</decisions>

<canonical_refs>
## Canonical References
- `02-CONTEXT.md` — Seguir objetivo (Emagrecimento/Massa) para definir intensidade/volume.
- `src/app/dashboard/actions.ts` — Padrão de integração com Gemini.

</canonical_refs>

<specifics>
## Specific Ideas
- "Fator de tédio": IA deve variar exercícios se o usuário treinar muitos dias seguidos com o mesmo equipamento.
- Feedback de esforço (RPE) ao final do treino para ajustar a próxima sessão.

</specifics>

<deferred>
## Deferred Ideas
- Histórico gráfico de evolução de cargas (Fase 5).
- Desafios da comunidade/gamificação.

</deferred>

---
*Phase: 04-motor-treino-adaptativo*
*Context gathered: 2026-05-05*
