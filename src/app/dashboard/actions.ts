'use server';

import { createClient } from '@/utils/supabase/server';
import { generateMealPlan, GeneratedMeal } from '@/utils/ai-generator';
import { calculateMacros, calculateTDEE, calculateBMR, Gender, ActivityLevel, GoalType } from '@/utils/health';
import { revalidatePath } from 'next/cache';

export async function generateAndSavePlan(mode: 'semanal' | 'diario') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Não autorizado');

  // 1. Fetch User Goals
  const { data: goals, error: goalsError } = await supabase
    .from('user_goals')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (goalsError || !goals) throw new Error('Perfil incompleto. Faça o onboarding primeiro.');

  // 2. Recalculate Targets (Safe side)
  const bmr = calculateBMR(goals.weight, goals.height, goals.age, goals.gender as Gender);
  const tdee = calculateTDEE(bmr, goals.activity_level as ActivityLevel);
  const targets = calculateMacros(tdee, goals.goal_type as GoalType);

  // 3. Call AI
  const mealPlan = await generateMealPlan({
    calories: targets.calories,
    macros: { p: targets.protein, c: targets.carbs, f: targets.fat },
    goal: goals.goal_type,
    budget: goals.monthly_budget,
    prepTime: goals.weekly_prep_time,
    mode
  });

  // 4. Fetch Prices for Cost Estimation
  const { data: prices } = await supabase
    .from('price_averages')
    .select('item_name, cost_per_unit, unit')
    .eq('tier', goals.monthly_budget);

  const priceMap = new Map(prices?.map(p => [p.item_name.toLowerCase(), p]));

  // 5. Calculate Costs and Save
  const mealsWithCost = mealPlan.map(meal => {
    let mealCost = 0;
    const ingredientsWithCost = meal.ingredients.map(ing => {
      const price = priceMap.get(ing.item.toLowerCase());
      const cost_est = price ? (ing.qty * price.cost_per_unit) / (price.unit === 'kg' ? 1000 : 1) : 0;
      mealCost += cost_est;
      return { ...ing, cost_est };
    });

    return {
      ...meal,
      ingredients: ingredientsWithCost,
      total_cost_est: mealCost
    };
  });

  // 6. Delete old plans for the day (or just clear and insert new)
  // For simplicity, we just insert for day 1 (today)
  await supabase.from('meal_plans').delete().eq('user_id', user.id);
  
  const { error: insertError } = await supabase.from('meal_plans').insert(
    mealsWithCost.map((meal, index) => ({
      user_id: user.id,
      day_of_week: 1, // Assume today for MVP
      meal_type: ['café', 'almoço', 'janta', 'lanche'][index] || 'outro',
      logistics_mode: mode,
      content: {
        name: meal.name,
        calories: meal.calories,
        macros: meal.macros,
        ingredients: meal.ingredients
      },
      total_cost_est: meal.total_cost_est
    }))
  );

  if (insertError) {
    console.error('Insert error:', insertError);
    throw new Error('Erro ao salvar plano alimentar.');
  }

  revalidatePath('/dashboard');
}

export async function saveWeight(formData: FormData) {
  const weight = parseFloat(formData.get('weight') as string);
  const date = formData.get('date') as string || new Date().toISOString().split('T')[0];

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Não autorizado');

  const { error } = await supabase
    .from('weight_history')
    .insert({
      user_id: user.id,
      weight,
      date
    });

  if (error) throw new Error('Erro ao salvar peso.');

  // Also update current weight in user_goals
  await supabase
    .from('user_goals')
    .update({ weight })
    .eq('user_id', user.id);

  revalidatePath('/dashboard');
}

export async function toggleMealAdherence(date: string, followed: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Não autorizado');

  const { error } = await supabase
    .from('meal_adherence')
    .upsert({
      user_id: user.id,
      date,
      followed_plan: followed
    }, { onConflict: 'user_id, date' });

  if (error) throw new Error('Erro ao salvar aderência.');

  revalidatePath('/dashboard');
}
