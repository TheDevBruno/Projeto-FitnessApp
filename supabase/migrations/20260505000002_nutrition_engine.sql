-- Migration: Nutrition Engine Tables
-- Created: 2026-05-05

-- Table to store average prices for cost estimation
CREATE TABLE IF NOT EXISTS public.price_averages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Proteínas', 'Hortifruti', 'Despensa', etc.
    cost_per_unit NUMERIC NOT NULL,
    unit TEXT NOT NULL, -- 'kg', 'g', 'un', 'litro'
    tier TEXT NOT NULL CHECK (tier IN ('economico', 'variado', 'personalizado')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Table to store generated meal plans
CREATE TABLE IF NOT EXISTS public.meal_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    meal_type TEXT NOT NULL, -- 'café', 'almoço', 'janta', 'lanche'
    logistics_mode TEXT NOT NULL CHECK (logistics_mode IN ('semanal', 'diario')),
    content JSONB NOT NULL, -- { name, calories, macros: {p, c, f}, ingredients: [{item, qty, unit, cost_est}] }
    total_cost_est NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.price_averages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;

-- Policies for price_averages (Readable by all authenticated users)
CREATE POLICY "Allow authenticated read price_averages" ON public.price_averages
    FOR SELECT TO authenticated USING (true);

-- Policies for meal_plans (Only owners can see/edit)
CREATE POLICY "Users can view their own meal plans" ON public.meal_plans
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own meal plans" ON public.meal_plans
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own meal plans" ON public.meal_plans
    FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meal plans" ON public.meal_plans
    FOR DELETE TO authenticated USING (auth.uid() = user_id);
