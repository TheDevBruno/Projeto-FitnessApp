# Phase 04: Motor de Treino Adaptativo - Plan

## Goal
Implementar o sistema de inventário de equipamentos, gerador de treinos dinâmicos com IA e a interface interativa de execução (Modo Play).

## User Review Required
> [!IMPORTANT]
> A biblioteca de exercícios inicial será limitada a ~50 exercícios fundamentais para garantir que todos tenham vídeos/GIFs de qualidade. A IA poderá sugerir outros, mas sem o suporte visual imediato.

## Wave 1: Equipment & Library Data
Focus: Infraestrutura de dados para os treinos.

- **Task 1.1: Database Migration (Equipment & Logs)**
  - Criar tabelas `user_equipment`, `exercise_library` e `workout_logs`.
- **Task 1.2: Exercise Library Seeding**
  - Popular a biblioteca com exercícios base (Supino, Agachamento, Flexão, etc.) e seus respectivos assets visuais.
- **Task 1.3: Equipment Inventory UI**
  - Criar página de configuração de equipamentos no perfil do usuário.

## Wave 2: Training Engine (IA)
Focus: Gerar os treinos baseados no contexto.

- **Task 2.1: Workout Generation Logic**
  - Implementar utilitário `src/utils/workout-generator.ts` usando Gemini API.
  - Integrar a lista de equipamentos do usuário no prompt da IA.
- **Task 2.2: Adaptive Scaling**
  - Lógica para ajustar o número de exercícios e séries baseado no tempo disponível informado pelo usuário.

## Wave 3: Interactive Workout (Modo Play)
Focus: A experiência de treino em tempo real.

- **Task 3.1: Workout Session UI**
  - Criar a interface "Modo Play" com carrossel de exercícios e visualização de vídeo.
- **Task 3.2: Rest Timer & Set Logging**
  - Implementar o cronômetro de descanso e os campos de input para Carga/Reps.
- **Task 3.3: Post-Workout Summary**
  - Tela de conclusão com resumo do volume total levantado e feedback de esforço.

## Verification (UAT)
- [ ] **Equipment Filter**: A IA nunca sugere um exercício que exija um equipamento que o usuário desmarcou no inventário.
- [ ] **Interactive Timer**: O timer de descanso dispara automaticamente ao concluir uma série.
- [ ] **Data Persistence**: Os pesos e repetições anotados são salvos corretamente no `workout_logs`.
- [ ] **Time Constraint**: O treino gerado para 15 min é significativamente menor que o de 60 min.
