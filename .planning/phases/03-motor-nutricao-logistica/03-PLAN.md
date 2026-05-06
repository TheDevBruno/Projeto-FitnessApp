# Phase 03: Motor de Nutrição e Logística - Plan

## Goal
Implementar o motor de IA (Gemini) para geração de planos alimentares, sistema de custos e lista de compras inteligente.

## Wave 1: Data Infrastructure & IA Setup
Focus: Preparar o terreno para a inteligência.

- **Task 1.1: Database Schema for Meals**
  - Criar tabelas `meal_plans` e `price_averages` via migration.
- **Task 1.2: Gemini API Integration**
  - Instalar `@google/generative-ai`.
  - Configurar client da IA e utilitário `src/utils/ai-generator.ts`.
- **Task 1.3: Reference Price Table**
  - Popular `price_averages` com dados básicos (arroz, feijão, frango, ovos, vegetais comuns).

## Wave 2: AI Motor & Logic
Focus: Gerar as sugestões e calcular os custos.

- **Task 2.1: Meal Generation Server Action**
  - Implementar action que recebe o perfil do usuário e retorna um plano de 1 dia ou 1 semana via Gemini.
- **Task 2.2: Cost Estimation Engine**
  - Criar lógica que cruza os ingredientes sugeridos pela IA com a tabela de preços médios.
- **Task 2.3: Logistics Mode Toggle**
  - Implementar a lógica de filtragem/ajuste da IA baseada no modo (Semanal vs Diário).

## Wave 3: UI & Shopping List
Focus: Exibir os dados e facilitar a logística.

- **Task 3.1: Meal Card & Plan Display**
  - Criar componentes visuais para exibir as refeições, calorias e custos estimados.
- **Task 3.2: Shopping List Generator**
  - Implementar página que agrupa ingredientes do plano ativo por categoria de mercado.
- **Task 3.3: Regen Logic**
  - Botão de "Trocar Sugestão" que solicita uma nova opção à IA.

## Verification (UAT)
- [ ] **AI Response**: A IA gera planos que respeitam exatamente os Macros calculados na Fase 2.
- [ ] **Cost Accuracy**: O custo exibido reflete os preços médios cadastrados.
- [ ] **Logistics Sync**: Alternar para "Modo Semanal" gera uma lista de compras otimizada (menos itens, maior volume).
- [ ] **Shopping Categories**: Ingredientes estão agrupados corretamente (ex: Frango em "Carnes").
