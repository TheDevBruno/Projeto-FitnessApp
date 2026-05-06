# Phase 03: Motor de Nutrição e Logística - Research

## Overview
Desenvolvimento do motor de inteligência artificial para geração de planos alimentares adaptativos e logística de compras.

## IA Integration (Gemini)
- **SDK:** `@google/generative-ai`.
- **Modo:** Server Actions para manter a API Key segura.
- **Prompting:** Necessário solicitar output em JSON estruturado para facilitar o parsing e armazenamento no banco.
- **Contexto da IA:** Passar as métricas de saúde (TMB, Macros) e o perfil logístico (Orçamento, Tempo).

## Database Schema (Meals)
- **Table `meal_plans`:**
  - `id (uuid, pk)`
  - `user_id (ref profiles)`
  - `day_of_week (int)`
  - `meal_type (text: café, almoço, janta, lanche)`
  - `content (jsonb: {name, ingredients: [{item, qty, unit, cost_est}], total_cost_est, calories, macros})`
  - `logistics_mode (text: semanal/diário)`
- **Table `price_averages`:**
  - `item_name (text, pk)`
  - `cost_per_unit (numeric)`
  - `unit (text: kg, g, un)`
  - `tier (text: economico/variado/personalizado)`

## Logistics Logic
- **Weekly Mode:** IA deve sugerir ingredientes repetidos em diferentes preparos para otimizar compras e tempo.
- **Daily Mode:** IA prioriza variedade e ingredientes frescos.

## Tech Stack Considerations
- **React Server Components:** Exibir os planos gerados de forma otimizada.
- **Optimistic UI:** Mostrar "Gerando sugestão..." enquanto a IA processa.

## Risks
- **Hallucination:** IA pode sugerir quantidades irreais ou custos absurdos. Necessário validação ou pós-processamento leve.
- **Rate Limiting:** Controlar o número de "regens" por usuário para evitar custos altos de API.
