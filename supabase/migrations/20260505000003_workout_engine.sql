-- Migration: Workout Engine Tables
-- Created: 2026-05-05

-- Table for available equipment types
CREATE TABLE IF NOT EXISTS public.equipment_types (
    id TEXT PRIMARY KEY, -- 'dumbbells', 'barbell', 'bench', etc.
    name TEXT NOT NULL,
    category TEXT NOT NULL -- 'basic', 'intermediate', 'advanced'
);

-- Table for exercise library (static assets)
CREATE TABLE IF NOT EXISTS public.exercise_library (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    muscle_group TEXT NOT NULL,
    equipment_required TEXT[] DEFAULT '{}',
    video_url TEXT,
    gif_url TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Table for user's inventory
CREATE TABLE IF NOT EXISTS public.user_equipment (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    equipment_id TEXT REFERENCES public.equipment_types(id),
    PRIMARY KEY (user_id, equipment_id)
);

-- Table for workout sessions and logs
CREATE TABLE IF NOT EXISTS public.workout_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    exercise_id TEXT REFERENCES public.exercise_library(id),
    workout_date DATE DEFAULT CURRENT_DATE,
    sets JSONB NOT NULL DEFAULT '[]', -- [{reps: 0, weight: 0, rpe: 0, completed: false}]
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.equipment_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow read equipment_types" ON public.equipment_types FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow read exercise_library" ON public.exercise_library FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their equipment" ON public.user_equipment
    FOR ALL TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their workout logs" ON public.workout_logs
    FOR ALL TO authenticated USING (auth.uid() = user_id);
