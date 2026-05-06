# Phase 02: Perfil Adaptativo (Onboarding) - Research

## Overview
Esta fase foca no desenvolvimento do fluxo de onboarding para coleta de dados antropométricos e logísticos.

## Domain Analysis
### Health Calculations
1. **IMC (Índice de Massa Corporal):**
   - Fórmula: `Peso (kg) / (Altura (m) * Altura (m))`
   - Classificações: < 18.5 (Abaixo), 18.5-24.9 (Normal), 25-29.9 (Sobrepeso), > 30 (Obeso).
2. **Taxa Metabólica Basal (TMB):**
   - Usaremos a Equação de **Mifflin-St Jeor** (mais precisa):
     - Homens: `(10 * peso) + (6.25 * altura_cm) - (5 * idade) + 5`
     - Mulheres: `(10 * peso) + (6.25 * altura_cm) - (5 * idade) - 161`
3. **Gasto Calórico Total (GET):**
   - TMB * Fator de Atividade:
     - Sedentário: 1.2
     - Leve: 1.375
     - Moderado: 1.55
     - Ativo: 1.725
     - Muito Ativo: 1.9
4. **Distribuição de Macros (Sugestão):**
   - **Perda de Peso:** 40% Carb, 40% Prot, 20% Gord.
   - **Ganho de Massa:** 50% Carb, 30% Prot, 20% Gord.
   - **Manutenção:** 45% Carb, 30% Prot, 25% Gord.

## Technical Research
### Next.js 16 Forms & Server Actions
- **Zod + React Hook Form:** Recomendado para validação robusta no client-side antes de enviar para Server Actions.
- **Progress Bar Component:** Implementar usando CSS Transitions/Variables para refletir o preenchimento dos segmentos.
- **Real-time Updates:** Use `useEffect` ou `watch` do React Hook Form para disparar cálculos conforme o usuário digita peso/altura.

### Supabase Integration
- Upsert na tabela `user_goals` vinculado ao `auth.uid()`.

## Codebase Patterns
- **Design System:** Usar os tokens de `globals.css` e o componente `Button.tsx`.
- **Auth:** Middleware `proxy.ts` já protege rotas.

## Constraints & Risks
- **WASM Performance:** O feedback imediato deve ser leve para evitar lags no ambiente local (Next.js 16 em WASM).
- **Mobile UX:** Garantir que o teclado numérico abra para campos de peso/altura.
