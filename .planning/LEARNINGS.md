# LEARNINGS: LifeRealFitness

## 🛠️ Technical Discoveries & Patterns

### Next.js 16 & Server Actions
- **Async Params:** A migração para Next.js 16 exige que `params` e `searchParams` sejam tratados como Promises, o que impactou o design das páginas de Dashboard.
- **Action Resilience:** Server Actions disparadas via formulário precisam de `try/catch` explícito para evitar que falhas de APIs externas (como Gemini) resultem em páginas de erro 500 para o usuário.

### Supabase & Postgres
- **Schema Cache:** Erros `PGRST204` ocorrem quando o cache do PostgREST está dessincronizado. Alterações de schema via SQL Editor devem ser seguidas de uma verificação de colunas via código.
- **Type Casting:** Colunas que armazenam categorias (ex: "Variado", "Econômico") devem ser sempre `TEXT`. O uso acidental de `NUMERIC` é um erro comum que bloqueia o fluxo de onboarding.

### AI Integration
- **Structured JSON:** O Gemini 2.0 Flash performa excepcionalmente bem com prompts que pedem JSON, mas a inclusão de um "exemplo de fallback" no prompt reduz a taxa de erro de parsing a quase zero.

## 🎨 UI/UX & Aesthetics
- **SVG for Dashboards:** Gráficos de linha feitos com `<path>` de SVG são mais fáceis de estilizar e muito mais leves que bibliotecas de terceiros, permitindo micro-animações suaves em mobile.
- **Step-by-Step Onboarding:** Dividir o onboarding em 3 passos curtos com "Feedback Cards" visuais aumentou a percepção de progresso do usuário.

## 🚀 Surprises & Gotchas
- **Webpack requirement:** Em certos ambientes da Vercel, o Next.js 16 precisou do sinalizador `--webpack` no build para resolver dependências de pacotes de IA.
- **Mobile Rest Timers:** O timer de descanso no "Modo Play" é a funcionalidade mais valorizada, pois remove a necessidade do usuário alternar entre o app e o cronômetro do celular.

---
*Last Updated: 2026-05-06*
