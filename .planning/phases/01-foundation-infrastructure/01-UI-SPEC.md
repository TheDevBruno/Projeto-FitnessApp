# UI-SPEC: Phase 01 - Foundation & Infrastructure

## 1. Visual Design (Branding & Identity)
**App Name:** LifeRealFitness
**Design Principle:** "Clean, Adaptive, Realistic"

### Color Palette
- **Primary (Accent):** `#10B981` (Emerald 500) - Represents health, vitality, and progress.
- **Background:** `#FFFFFF` (White) - Main workspace.
- **Surface:** `#F8FAFC` (Slate 50) - Secondary areas, cards.
- **Text (Main):** `#0F172A` (Slate 900) - High contrast for readability.
- **Text (Muted):** `#64748B` (Slate 500) - Secondary info, labels.
- **Border:** `#E2E8F0` (Slate 200) - Subtle separation.

### Typography
- **Primary Font:** `Inter` (Sans-serif)
- **Headings:** Bold (700), Slate 900.
- **Body:** Regular (400), Slate 900.
- **Metadata:** Medium (500), Slate 500, 12px/14px.

## 2. Design System (Tokens & Components)
**Style:** Flat Modern

- **Border Radius:** `8px` (Standard for containers, buttons, inputs).
- **Shadows:** `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` (Subtle elevation).
- **Buttons:**
  - *Primary:* Emerald 500 background, White text, 8px radius.
  - *Secondary:* White background, Slate 200 border, Slate 900 text.
- **Inputs:** White background, Slate 200 border, focus ring Emerald 500.

## 3. Layout & Composition
- **Max Width:** `1280px` (Center aligned).
- **Grid:** 12-column system for desktop, single column for mobile.
- **Spacing Scale:** Multiples of 4px (4, 8, 16, 24, 32, 48, 64).
- **Navigation:** Top bar (Desktop), Bottom bar (Mobile) - focusing on reachability.

## 4. Interactions & Motion
- **Transitions:** `150ms ease-in-out` for hover states and button presses.
- **Feedback:** Subtle scale down on button click (`scale(0.98)`).
- **Loading:** Shimmer effect (Skeleton) for content placeholders.

## 5. Content & Copywriting
- **Tone:** Encouraging, professional, objective.
- **Language:** Português (Brasil).
- **Terminology:** 
  - "Treino" em vez de "Exercício" para rotinas.
  - "Plano Alimentar" em vez de "Dieta".
  - "Evolução" para resultados.

## 6. Accessibility (A11y)
- **Contrast:** Minimum 4.5:1 for all text.
- **Focus:** Visible focus states for keyboard navigation (Emerald ring).
- **Icons:** Use `aria-hidden="true"` for decorative icons from Lucide.

---
*Created: 2026-05-04*
*Status: APPROVED*
