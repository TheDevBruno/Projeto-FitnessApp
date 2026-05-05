# Phase 1: Foundation & Infrastructure - Execution Plan

## Context
This phase establishes the core technical stack for LifeRealFitness. We are using Next.js 14+ (App Router), Supabase for Auth/DB, and Vercel for deployment. This foundation ensures secure user management and a scalable database schema.

## Goals
1. Initialize Next.js project with App Router and TypeScript.
2. Setup Supabase SSR integration (@supabase/ssr).
3. Implement Authentication (Email/Password & Google).
4. Create initial database schema (profiles, user_goals) and triggers.
5. Setup base layout and global CSS (Vanilla CSS/CSS Modules).
6. Configure Vercel deployment.

## Wave 1: Setup & Project Initialization
Focus: Setting up the developer environment and core utilities.

- [x] **Task 1.1: Initialize Next.js Project** [BLOCKING]
  - [x] Run `npx create-next-app@latest . --typescript --no-tailwind --eslint --app --src-dir`.
  - [x] Clean up default boilerplate in `app/page.tsx` and `app/globals.css`.
- [x] **Task 1.2: Supabase Infrastructure Setup** [BLOCKING]
  - [x] Install dependencies: `npm install @supabase/supabase-js @supabase/ssr`.
  - [x] Create `src/utils/supabase/` directory and implement `client.ts`, `server.ts`, and `middleware.ts`.
- [x] **Task 1.3: Environment Configuration**
  - [x] Setup `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
  - [x] Update `middleware.ts` to handle session refreshing.

## Wave 2: Database Schema & Authentication
Focus: Identity management and data persistence.

- [x] **Task 2.1: Core Database Migration** [BLOCKING]
  - [x] Table `profiles`: `id (uuid, pk, ref auth.users)`, `full_name`, `avatar_url`, `updated_at`.
  - [x] Table `user_goals`:
    ```sql
    create table public.user_goals (
      id uuid default gen_random_uuid() primary key,
      user_id uuid references public.profiles(id) on delete cascade not null,
      goal_type text not null, -- enum logic: 'weight_loss', 'muscle_gain', 'maintenance'
      monthly_budget numeric,
      weekly_prep_time integer, -- in minutes
      equipment_available jsonb,
      created_at timestamptz default now()
    );
    ```
  - [x] Enable RLS on both tables and add "Owner-only" access policies.
- [x] **Task 2.2: Automated Profile Creation**
  - [x] Implement SQL function `handle_new_user()` to populate `profiles` from `auth.users`.
  - [x] Create trigger `on_auth_user_created` on `auth.users`.
- [x] **Task 2.3: Social Auth Integration (Google)**
  - [x] Configure Google Cloud Platform OAuth credentials.
  - [x] Enable and configure Google provider in Supabase Dashboard.
  - [x] Implement `app/auth/callback/route.ts` for OAuth redirect handling.
- [x] **Task 2.4: Auth Flow UI & Logic**
  - [x] Implement Server Actions for Email/Password Signup and Login.
  - [x] Create `app/(auth)/login` and `app/(auth)/signup` pages.

## Wave 3: UI Foundation & Deployment
Focus: Look & feel and production readiness.

- [x] **Task 3.1: Global Styles & Layout**
  - [x] Implement `app/globals.css` with the color palette and typography from `UI-SPEC.md`.
  - [x] Create base components (`Button`, `Card`, `Input`) using CSS Modules.
  - [x] Implement Root Layout with Navbar (with Auth state).
- [x] **Task 3.2: Protected Routes**
  - [x] Configure middleware to protect `/dashboard` and `/profile` routes.
- [ ] **Task 3.3: Vercel Deployment** [BLOCKING]
  - [ ] Create new project on Vercel.
  - [ ] Add Supabase environment variables to Vercel dashboard.
  - [ ] Perform initial deployment and verify production auth flows.

## Verification (UAT)
- [ ] **Project Boot**: `npm run dev` starts without errors.
- [ ] **Email Auth**: New user can sign up; verify record in `auth.users` and `public.profiles`.
- [ ] **Google Auth**: User can log in via Google; verify redirect and session persistence.
- [ ] **Security**: Accessing `/dashboard` while logged out redirects to `/login`.
- [ ] **Data Integrity**: Profile `updated_at` changes when profile metadata is updated.

## Security Threat Model (threat_model)
- **Auth**: Use SSR (cookies) instead of LocalStorage to prevent XSS-based token theft.
- **RLS**: Ensure ALL tables have RLS enabled. Policy: `(auth.uid() = user_id)` or `(auth.uid() = id)`.
- **Secrets**: Confirm `SUPABASE_SERVICE_ROLE_KEY` is only used in server-side code and never exposed via `NEXT_PUBLIC_`.
- **Validation**: Use Zod or similar for schema validation in all Server Actions.
