# Phase 05: Dashboard de Evolução - Research

## Overview
Criação de visualizações de progresso premium, calendário de constância e lógica de feedback proativo.

## Custom Charts (SVG/CSS)
- **Line Chart (Peso):** 
  - Cálculo de coordenadas X,Y dinâmicas com base no array de dados.
  - Uso do elemento `<path>` com curvas `bezier` para um visual suave.
  - Gradiente de preenchimento abaixo da linha.
- **Progress Circle (Dieta):**
  - Uso de `stroke-dasharray` e `stroke-dashoffset` para animação de preenchimento.

## Database Schema (Metrics)
- **Table `weight_history`:**
  - `id (uuid, pk)`
  - `user_id (ref profiles)`
  - `weight (numeric)`
  - `body_fat (numeric, optional)`
  - `date (date)`
- **Adherence Logic:**
  - Baseada nos `workout_logs` e em uma nova tabela opcional `meal_adherence` (ou simplificar usando logs de refeições futuras).

## Progressive Overload Logic (Sugestão de Carga)
- **Algoritmo:**
  1. Buscar o log mais recente do `exercise_id` do usuário.
  2. Verificar se todas as séries foram marcadas como concluídas.
  3. Se RPE (esforço) for < 7 ou o usuário repetir o mesmo peso por 2 sessões, sugerir aumento de 2kg ou 5%.
  4. Exibir no "Modo Play" como uma dica: "Sugestão: Aumente +2kg hoje!".

## Calendar Component
- **Lógica:** Gerar grade de dias do mês atual.
- **Data Fetching:** Agrupar `workout_logs` e `meal_logs` por data para preencher os "Checks".

## Tech Stack Considerations
- **React Server Components:** Buscar os dados do histórico no servidor.
- **Client Components:** Para animações dos gráficos e interação do calendário.

## Risks
- **Data Density:** Poucos dados iniciais podem fazer os gráficos parecerem "vazios". Adicionar estados de "Empty State" motivadores.
- **Precision:** Cálculos de SVG precisam ser precisos para evitar distorções em telas diferentes.
