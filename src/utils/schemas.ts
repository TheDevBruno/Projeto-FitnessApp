import { z } from 'zod';

export const onboardingSchema = z.object({
  // Section 1: Physical
  age: z.number().min(13, 'Mínimo 13 anos').max(120),
  gender: z.enum(['male', 'female', 'other']),
  height: z.number().min(100, 'Mínimo 100cm').max(250),
  weight: z.number().min(30, 'Mínimo 30kg').max(300),
  activity_level: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
  
  // Section 2: Goals
  goal_type: z.enum(['weight_loss', 'muscle_gain', 'maintenance']),
  
  // Section 3: Logistics
  monthly_budget: z.enum(['economico', 'variado', 'personalizado']),
  weekly_prep_time: z.enum(['express', 'meal_prep', 'total']),
  uses_supplements: z.boolean().default(false),
});

export type OnboardingData = z.infer<typeof onboardingSchema>;
