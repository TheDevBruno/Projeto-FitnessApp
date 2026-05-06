-- Seed: Equipment Types and Basic Exercise Library
-- Created: 2026-05-05

-- 1. Seed Equipment Types
INSERT INTO public.equipment_types (id, name, category) VALUES
('bodyweight', 'Apenas Peso do Corpo', 'basic'),
('dumbbells', 'Halteres', 'basic'),
('bench', 'Banco Regulável', 'basic'),
('resistance_bands', 'Elásticos', 'intermediate'),
('pullup_bar', 'Barra Fixa', 'intermediate'),
('barbell', 'Barra Longa e Anilhas', 'intermediate'),
('kettlebell', 'Kettlebell', 'intermediate'),
('pulley', 'Polia/Cabo', 'advanced'),
('leg_press', 'Leg Press', 'advanced');

-- 2. Seed Exercise Library (Fundamental Exercises)
INSERT INTO public.exercise_library (id, name, muscle_group, equipment_required, video_url) VALUES
('pushup', 'Flexão de Braços', 'Peito', ARRAY['bodyweight'], 'https://link.to/video'),
('diamond_pushup', 'Flexão Diamante', 'Tríceps', ARRAY['bodyweight'], 'https://link.to/video'),
('bench_press_db', 'Supino Reto com Halteres', 'Peito', ARRAY['dumbbells', 'bench'], 'https://link.to/video'),
('goblet_squat', 'Agachamento Goblet', 'Pernas', ARRAY['dumbbells'], 'https://link.to/video'),
('lunge_db', 'Afundo com Halteres', 'Pernas', ARRAY['dumbbells'], 'https://link.to/video'),
('pullup', 'Barra Fixa (Pronada)', 'Costas', ARRAY['pullup_bar'], 'https://link.to/video'),
('bent_over_row_db', 'Remada Curvada com Halteres', 'Costas', ARRAY['dumbbells'], 'https://link.to/video'),
('lateral_raise', 'Elevação Lateral', 'Ombros', ARRAY['dumbbells'], 'https://link.to/video'),
('bicep_curl_db', 'Rosca Direta com Halteres', 'Bíceps', ARRAY['dumbbells'], 'https://link.to/video'),
('tricep_ext_db', 'Extensão de Tríceps (Francês)', 'Tríceps', ARRAY['dumbbells'], 'https://link.to/video'),
('plank', 'Prancha Abdominal', 'Core', ARRAY['bodyweight'], 'https://link.to/video'),
('deadlift_bb', 'Levantamento Terra com Barra', 'Posterior/Costas', ARRAY['barbell'], 'https://link.to/video');
