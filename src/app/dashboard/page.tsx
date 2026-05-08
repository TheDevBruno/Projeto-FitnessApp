import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { generateAndSavePlan, toggleMealAdherence } from './actions';
import { createWorkoutSession } from './workout-actions';
import { EvolutionSection } from '@/components/dashboard/EvolutionSection';
import styles from './dashboard.module.css';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) return redirect('/login');

  // ✅ All queries filtered by user_id to respect RLS
  const [mealsResult, goalsResult, weightResult, adherenceResult, workoutsResult] = await Promise.all([
    supabase.from('meal_plans').select('*').eq('user_id', user.id).order('created_at', { ascending: true }),
    supabase.from('user_goals').select('goal_type, monthly_budget').eq('user_id', user.id).single(),
    supabase.from('weight_history').select('*').eq('user_id', user.id).order('date', { ascending: true }),
    supabase.from('meal_adherence').select('*').eq('user_id', user.id)
      .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
    supabase.from('workout_logs').select('workout_date').eq('user_id', user.id),
  ]);

  const meals = mealsResult.data || [];
  const goals = goalsResult.data;
  const weightHistory = weightResult.data || [];
  const adherenceData = adherenceResult.data || [];
  const workoutDates = (workoutsResult.data || []).map((w: any) => w.workout_date);

  const todayStr = new Date().toISOString().split('T')[0];
  const followedToday = adherenceData.some((a: any) => a.date === todayStr && a.followed_plan);

  const handleRegen = async (formData: FormData) => {
    'use server';
    const mode = formData.get('mode') as 'semanal' | 'diario';
    await generateAndSavePlan(mode);
  };

  const handleWorkout = async (formData: FormData) => {
    'use server';
    await createWorkoutSession(formData);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1>Olá, {user.email?.split('@')[0]} 👋</h1>
          <p className="text-muted">
            {goals ? `Meta: ${goals.goal_type} · ${goals.monthly_budget}` : 'Complete seu perfil para começar'}
          </p>
        </div>
        <form action={async () => {
          'use server';
          await toggleMealAdherence(todayStr, !followedToday);
        }}>
          <Button variant={followedToday ? 'primary' : 'secondary'} type="submit">
            {followedToday ? '✅ Dieta Batida!' : '🔔 Marcar Dieta'}
          </Button>
        </form>
      </header>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <div className={`card ${styles.actionCard}`}>
          <div className={styles.actionIcon}>🏋️</div>
          <h3>Treino de Hoje</h3>
          <p className="text-muted">Gere baseado no tempo disponível</p>
          <form action={handleWorkout} style={{ marginTop: '16px' }}>
            <div className={styles.timeRow}>
              <input type="number" name="time" defaultValue="30" className="input" style={{ width: '80px' }} />
              <span className="text-muted">min</span>
            </div>
            <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '12px' }}>
              Gerar Treino
            </Button>
          </form>
        </div>

        <div className={`card ${styles.actionCard}`}>
          <div className={styles.actionIcon}>🥗</div>
          <h3>Plano Alimentar</h3>
          <p className="text-muted">IA adaptada ao seu orçamento</p>
          <form action={handleRegen} style={{ marginTop: '16px' }}>
            <select name="mode" className="input" defaultValue="diario" style={{ marginBottom: '12px' }}>
              <option value="diario">Diário</option>
              <option value="semanal">Semanal (Marmitas)</option>
            </select>
            <Button type="submit" style={{ width: '100%' }}>
              {meals.length > 0 ? 'Regerar Plano' : 'Gerar Meu Plano'}
            </Button>
          </form>
        </div>

        <Link href="/shopping-list" className={`card ${styles.actionCard} ${styles.linkCard}`}>
          <div className={styles.actionIcon}>🛒</div>
          <h3>Lista de Compras</h3>
          <p className="text-muted">{meals.length} itens do seu plano</p>
          <div className={styles.actionArrow}>→</div>
        </Link>
      </div>

      {/* Evolution */}
      <EvolutionSection
        weightHistory={weightHistory}
        adherenceData={adherenceData}
        workoutDates={workoutDates}
      />

      {/* Meals */}
      {meals.length > 0 ? (
        <section className={styles.mealsSection}>
          <h2 className={styles.sectionTitle}>Suas Refeições</h2>
          <div className={styles.grid}>
            {meals.map((meal: any) => (
              <div key={meal.id} className="card">
                <div className={styles.mealHeader}>
                  <span className={styles.mealType}>{meal.meal_type}</span>
                  <span className={styles.cost}>R$ {Number(meal.total_cost_est || 0).toFixed(2)}</span>
                </div>
                <h3 className={styles.mealName}>{meal.content?.name}</h3>
                <div className={styles.macros}>
                  <span>{meal.content?.calories} kcal</span>
                  <span>P: {meal.content?.macros?.p}g</span>
                  <span>C: {meal.content?.macros?.c}g</span>
                  <span>G: {meal.content?.macros?.f}g</span>
                </div>
                <ul className={styles.ingredients}>
                  {meal.content?.ingredients?.map((ing: any, i: number) => (
                    <li key={i}>{ing.qty}{ing.unit} {ing.item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className={styles.empty}>
          <p>🥗 Gere seu primeiro plano alimentar acima!</p>
        </div>
      )}
    </div>
  );
}
