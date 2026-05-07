# Phase 05: Dashboard de Evolução - Plan

## Goal
Implementar visualizações de progresso premium, calendário mensal e sistema de sugestão de carga para aumentar a retenção e motivação do usuário.

## Wave 1: Metrics Infrastructure
Focus: Coleta e armazenamento de dados históricos.

- **Task 1.1: Database Migration (weight_history)**
  - Criar tabela `weight_history` e RLS.
- **Task 1.2: Metrics Input UI**
  - Modal/Formulário para registrar novo peso e medidas no Dashboard.
- **Task 1.3: Data Aggregation Logic**
  - Criar utilitários para processar logs de treino e nutrição em formatos prontos para gráficos.

## Wave 2: Custom Visualizations
Focus: Criar a experiência visual "Premium".

- **Task 2.1: SVG Line Chart Component**
  - Componente reutilizável para gráficos de evolução (Peso).
- **Task 2.2: Progress Cards**
  - Implementar o card de "Peso e Medidas" e o de "Aderência à Dieta".
- **Task 2.3: Monthly Calendar View**
  - Componente de calendário que exibe a constância mensal.

## Wave 3: Intelligent Feedback
Focus: Tornar o app proativo.

- **Task 3.1: Load Suggestion Algorithm**
  - Lógica que injeta dicas de aumento de carga no "Modo Play".
- **Task 3.2: Welcome Back / Inactivity Alert**
  - Banner motivacional após períodos de ausência.
- **Task 3.3: Dashboard Integration**
  - Montagem final da nova seção de "Evolução" no Dashboard principal.

## Verification (UAT)
- [ ] **Chart Rendering**: O gráfico de peso reflete corretamente os pontos inseridos no histórico.
- [ ] **Adherence Logic**: O calendário marca "Check" apenas nos dias com treinos salvos.
- [ ] **Weight Entry**: Inserir um novo peso atualiza o gráfico e o card de métricas instantaneamente.
- [ ] **Mobile Performance**: Gráficos SVG rendem suavemente e são responsivos.
