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
('pushup', 'Flexão de Braços', 'Peito', ARRAY['bodyweight'], 'https://assets.mixkit.io/videos/preview/mixkit-man-doing-push-ups-in-a-park-23450-large.mp4'),
('diamond_pushup', 'Flexão Diamante', 'Tríceps', ARRAY['bodyweight'], 'https://assets.mixkit.io/videos/preview/mixkit-man-doing-push-ups-in-a-park-23450-large.mp4'),
('bench_press_db', 'Supino Reto com Halteres', 'Peito', ARRAY['dumbbells', 'bench'], 'https://assets.mixkit.io/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-23451-large.mp4'),
('goblet_squat', 'Agachamento Goblet', 'Pernas', ARRAY['dumbbells'], 'https://assets.mixkit.io/videos/preview/mixkit-man-doing-squats-with-a-kettlebell-23452-large.mp4'),
('lunge_db', 'Afundo com Halteres', 'Pernas', ARRAY['dumbbells'], 'https://assets.mixkit.io/videos/preview/mixkit-man-doing-lunges-in-a-gym-23453-large.mp4'),
('pullup', 'Barra Fixa (Pronada)', 'Costas', ARRAY['pullup_bar'], 'https://assets.mixkit.io/videos/preview/mixkit-man-doing-pull-ups-in-a-gym-23454-large.mp4'),
('bent_over_row_db', 'Remada Curvada com Halteres', 'Costas', ARRAY['dumbbells'], 'https://assets.mixkit.io/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-23451-large.mp4'),
('lateral_raise', 'Elevação Lateral', 'Ombros', ARRAY['dumbbells'], 'https://assets.mixkit.io/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-23451-large.mp4'),
('bicep_curl_db', 'Rosca Direta com Halteres', 'Bíceps', ARRAY['dumbbells'], 'https://assets.mixkit.io/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-23451-large.mp4'),
('tricep_ext_db', 'Extensão de Tríceps (Francês)', 'Tríceps', ARRAY['dumbbells'], 'https://assets.mixkit.io/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-23451-large.mp4'),
('plank', 'Prancha Abdominal', 'Core', ARRAY['bodyweight'], 'https://assets.mixkit.io/videos/preview/mixkit-man-doing-plank-in-a-gym-23455-large.mp4'),
('deadlift_bb', 'Levantamento Terra com Barra', 'Posterior/Costas', ARRAY['barbell'], 'https://assets.mixkit.io/videos/preview/mixkit-man-doing-deadlifts-in-a-gym-23456-large.mp4');
