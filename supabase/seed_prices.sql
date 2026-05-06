-- Seed: Initial Price Averages
-- Created: 2026-05-05

INSERT INTO public.price_averages (item_name, category, cost_per_unit, unit, tier) VALUES
-- Econômico
('Frango (Peito)', 'Proteínas', 22.00, 'kg', 'economico'),
('Ovo', 'Proteínas', 0.80, 'un', 'economico'),
('Arroz Branco', 'Despensa', 6.00, 'kg', 'economico'),
('Feijão Carioca', 'Despensa', 8.00, 'kg', 'economico'),
('Batata Doce', 'Hortifruti', 5.00, 'kg', 'economico'),
('Banana Nanica', 'Hortifruti', 4.00, 'kg', 'economico'),
('Aveia em Flocos', 'Despensa', 12.00, 'kg', 'economico'),

-- Variado
('Carne Moída (Patinho)', 'Proteínas', 38.00, 'kg', 'variado'),
('Tilápia', 'Proteínas', 45.00, 'kg', 'variado'),
('Arroz Integral', 'Despensa', 10.00, 'kg', 'variado'),
('Iogurte Natural', 'Laticínios', 3.50, 'un', 'variado'),
('Pasta de Amendoim', 'Despensa', 25.00, 'kg', 'variado'),
('Brócolis', 'Hortifruti', 8.00, 'un', 'variado'),

-- Personalizado
('Salmão', 'Proteínas', 120.00, 'kg', 'personalizado'),
('Filé Mignon', 'Proteínas', 85.00, 'kg', 'personalizado'),
('Whey Protein', 'Suplementos', 150.00, 'kg', 'personalizado'),
('Abacate (Hass)', 'Hortifruti', 15.00, 'kg', 'personalizado'),
('Quinoa', 'Despensa', 40.00, 'kg', 'personalizado');
