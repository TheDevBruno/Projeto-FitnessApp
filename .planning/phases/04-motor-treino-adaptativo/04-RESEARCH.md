# Phase 04: Motor de Treino Adaptativo - Research

## Overview
Desenvolvimento do motor de treinos dinâmicos com inventário de equipamentos e interface de execução (Modo Play).

## Equipment Taxonomy
Para que a IA gere treinos precisos, precisamos padronizar os equipamentos:
- **Bodyweight:** Peso do corpo apenas.
- **Básico:** Halteres (Dumbbells), Banco regulável, Tapete (Mat).
- **Intermediário:** Barra (Barbell), Anilhas (Plates), Barra de Fixa (Pull-up bar), Elásticos (Resistance bands).
- **Avançado:** Máquinas de academia (Pulley, Leg Press, Smith, etc.).

## Exercise Library (Visual Assets)
- **Schema:** 
  - `id (text, pk)`
  - `name (text)`
  - `muscle_group (text)`
  - `video_url (text)`
  - `gif_url (text)`
  - `equipment_required (text[])`
- **Source:** Utilizaremos nomes padronizados que a IA Gemini já reconhece, mapeando para nossos assets.

## Interactive Workout UI (Modo Play)
- **Timer de Descanso:** Componente que inicia automaticamente após marcar uma série como concluída.
- **Log de Carga:** O sistema deve sugerir o peso usado no treino anterior (Progressão de Carga).
- **Mobile First:** Botões de "Check" grandes e visualização limpa para uso em movimento.

## Database Schema
- **Table `user_equipment`:**
  - `user_id (ref profiles)`
  - `equipment_id (text)`
  - `is_available (boolean)`
- **Table `workout_logs`:**
  - `id (uuid, pk)`
  - `user_id (ref profiles)`
  - `exercise_id (text)`
  - `sets (jsonb: [{reps, weight, rpe}])`
  - `created_at (timestamptz)`

## IA Strategy (Gemini)
- **Prompt:** "Gere um treino de ${time} minutos focado em ${goal} usando apenas ${equipment_list}. Retorne JSON com exercícios da nossa biblioteca."
- **Fallback:** Se a IA sugerir algo fora da biblioteca, o sistema deve buscar o exercício mais próximo ou exibir apenas texto.

## Risks
- **Safety:** IA pode sugerir exercícios perigosos ou volume excessivo. Adicionar "Health Disclaimer" e limites de volume por grupo muscular.
- **Asset Links:** URLs de vídeos externos podem quebrar. Ideal ter uma camada de proxy ou fallback de imagem.
