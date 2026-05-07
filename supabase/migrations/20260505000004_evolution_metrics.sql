-- Migration: Evolution Metrics Tables
-- Created: 2026-05-06

-- Table to store historical weight data
CREATE TABLE IF NOT EXISTS public.weight_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    weight NUMERIC NOT NULL,
    body_fat NUMERIC, -- Optional
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Table for meal adherence logs (Simple binary check per day)
CREATE TABLE IF NOT EXISTS public.meal_adherence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    followed_plan BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, date)
);

-- Enable RLS
ALTER TABLE public.weight_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_adherence ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage their weight history" ON public.weight_history
    FOR ALL TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their meal adherence" ON public.meal_adherence
    FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Initial seeding: Insert starting weight from user_goals if available
INSERT INTO public.weight_history (user_id, weight, date)
SELECT user_id, weight, (created_at::date) 
FROM public.user_goals
ON CONFLICT DO NOTHING;
