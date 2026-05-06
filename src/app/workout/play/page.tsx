import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { WorkoutSession } from './WorkoutSession';
import styles from './play.module.css';

export default async function PlayWorkoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect('/login');

  // Fetch current day's workout
  const { data: logs } = await supabase
    .from('workout_logs')
    .select('*, exercise_library(*)')
    .eq('user_id', user.id)
    .eq('workout_date', new Date().toISOString().split('T')[0]);

  if (!logs || logs.length === 0) {
    return redirect('/dashboard');
  }

  return (
    <div className={styles.container}>
      <WorkoutSession initialLogs={logs} />
    </div>
  );
}
