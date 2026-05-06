-- Migration: Add physical metrics and extra logistics to user_goals
-- Created: 2026-05-05

ALTER TABLE public.user_goals 
ADD COLUMN IF NOT EXISTS age INTEGER,
ADD COLUMN IF NOT EXISTS gender TEXT, -- 'male', 'female', 'other'
ADD COLUMN IF NOT EXISTS height NUMERIC, -- in cm
ADD COLUMN IF NOT EXISTS weight NUMERIC, -- in kg
ADD COLUMN IF NOT EXISTS activity_level TEXT, -- 'sedentary', 'light', 'moderate', 'active', 'very_active'
ADD COLUMN IF NOT EXISTS uses_supplements BOOLEAN DEFAULT FALSE;

-- Add check constraints to ensure data integrity
ALTER TABLE public.user_goals
ADD CONSTRAINT check_gender CHECK (gender IN ('male', 'female', 'other')),
ADD CONSTRAINT check_activity_level CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'active', 'very_active'));
