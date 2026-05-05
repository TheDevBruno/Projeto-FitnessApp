# REQUIREMENTS: FitnessApp

## User Stories

### Persona: Atleta Urbano (Foco em Praticidade)
"Como um usuário com rotina agitada e orçamento limitado, quero que o app me diga exatamente o que comprar e quando preparar minhas marmitas, para que eu não saia da dieta por falta de tempo ou dinheiro."

### Persona: Iniciante (Foco em Orientação)
"Como alguém que não sabe treinar, quero uma rotina que se adapte aos halteres que tenho em casa, para que eu possa começar a ter resultados sem precisar de uma academia cara."

## Functional Requirements

### 1. Autenticação e Perfil
- [ ] Cadastro/Login via Supabase (E-mail/Senha e Social).
- [ ] Onboarding: Coleta de dados (Peso, Altura, Idade, Objetivo, Orçamento Mensal para Comida, Disponibilidade de tempo para cozinhar).

### 2. Módulo de Nutrição (Logística de Marmitas)
- [ ] **Gerador de Cardápio:** Sugestões baseadas no orçamento (ex: busca de alimentos de baixo custo com alta densidade nutricional).
- [ ] **Assistente de Marmitas:** Cálculo de porções para a semana.
- [ ] **Calendário de Preparo:** Notificações de quando cozinhar e o que descongelar.
- [ ] **Lista de Compras:** Gerada automaticamente a partir do cardápio semanal.

### 3. Módulo de Treino Adaptativo
- [ ] **Seletor de Equipamento:** Checkbox do que o usuário tem (Halteres, Barra, Elástico, Só o corpo).
- [ ] **Gerador de Rotina:** Treinos baseados na disponibilidade (ex: "tenho 30 min hoje").
- [ ] **Demonstração:** Instruções claras de execução dos exercícios.

### 4. Dashboard e Evolução
- [ ] **Gráficos de Progresso:** Peso, medidas e volume de treino ao longo do tempo.
- [ ] **Histórico:** Timeline de treinos concluídos e refeições seguidas.
- [ ] **Feedback Loop:** O usuário marca se conseguiu seguir a dieta/treino, e o sistema se ajusta se houver muitas falhas.

## Technical Requirements
- **Frontend:** Next.js (App Router) com TypeScript.
- **Backend/Database:** Supabase (PostgreSQL).
- **Estilização:** Vanilla CSS ou CSS Modules (conforme diretrizes de alta estética).
- **Deploy:** Vercel.

## Constraints
- O sistema deve ser responsivo (mobile-first), pois o usuário usará na cozinha e na academia.
- A lógica de adaptação nutricional deve ser dinâmica (não apenas estática).

---
*Last updated: 2026-05-04*
