import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { generateAndSavePlan } from './actions';
import { createWorkoutSession } from './workout-actions';
import styles from './dashboard.module.css';
import { Button } from '@/components/ui/Button';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect('/login');

  const { data: meals } = await supabase
    .from('meal_plans')
    .select('*')
    .order('created_at', { ascending: true });

  const { data: goals } = await supabase
    .from('user_goals')
    .select('goal_type, monthly_budget')
    .eq('user_id', user.id)
    .single();

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
      <header className={styles.header}>
        <div>
          <h1>Seu Plano Alimentar</h1>
          <p className="text-muted">Personalizado para: {goals?.goal_type} • {goals?.monthly_budget}</p>
        </div>
        
        <form action={handleRegen} className={styles.actions}>
          <select name="mode" className="input" defaultValue="diario">
            <option value="diario">Modo Diário</option>
            <option value="semanal">Modo Semanal (Marmitas)</option>
          </select>
          <Button type="submit">Regerar Dieta com IA</Button>
        </form>
      </header>

      <section className={styles.workoutHero}>
        <div className="card">
          <h2>Treino de Hoje</h2>
          <p className="text-muted">Gere um treino dinâmico baseado no seu tempo agora.</p>
          <form action={handleWorkout} className={styles.workoutForm}>
             <div className={styles.timeInput}>
                <input type="number" name="time" defaultValue="30" className="input" />
                <span>minutos</span>
             </div>
             <Button type="submit" variant="primary">Gerar Treino Agora</Button>
          </form>
        </div>
      </section>

      {meals && meals.length > 0 ? (
        <div className={styles.grid}>
          {meals.map((meal) => (
            <div key={meal.id} className="card">
              <div className={styles.mealHeader}>
                <span className={styles.mealType}>{meal.meal_type}</span>
                <span className={styles.cost}>R$ {meal.total_cost_est.toFixed(2)}</span>
              </div>
              <h3 className={styles.mealName}>{meal.content.name}</h3>
              
              <div className={styles.macros}>
                <span>{meal.content.calories} kcal</span>
                <span>P: {meal.content.macros.p}g</span>
                <span>C: {meal.content.macros.c}g</span>
                <span>G: {meal.content.macros.f}g</span>
              </div>

              <ul className={styles.ingredients}>
                {meal.content.ingredients.map((ing: any, i: number) => (
                  <li key={i}>
                    {ing.qty}{ing.unit} {ing.item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>Você ainda não tem um plano gerado.</p>
          <form action={handleRegen}>
            <input type="hidden" name="mode" value="diario" />
            <Button type="submit">Gerar Meu Primeiro Plano</Button>
          </form>
        </div>
      )}
    </div>
  );
}
