'use server';

import { createClient } from '@/utils/supabase/server';
import { generateWorkout } from '@/utils/workout-generator';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createWorkoutSession(formData: FormData) {
  const time = parseInt(formData.get('time') as string) || 30;
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Não autorizado');

  // 1. Fetch User Data & Equipment
  const { data: goals } = await supabase
    .from('user_goals')
    .select('goal_type')
    .eq('user_id', user.id)
    .single();

  const { data: equip } = await supabase
    .from('user_equipment')
    .select('equipment_id')
    .eq('user_id', user.id);

  const equipmentIds = equip?.map(e => e.equipment_id) || ['bodyweight'];

  // 2. Generate Workout with IA
  const workout = await generateWorkout({
    timeInMinutes: time,
    goal: goals?.goal_type || 'maintenance',
    equipmentIds: equipmentIds,
    level: 'intermediário' // Default for MVP
  });

  // 3. Save as current session (in a real app, we'd have a 'current_session' or similar)
  // For now, we clear previous logs of the day and insert as the planned workout
  await supabase.from('workout_logs').delete().eq('user_id', user.id).eq('workout_date', new Date().toISOString().split('T')[0]);

  const { error: insertError } = await supabase.from('workout_logs').insert(
    workout.map(ex => ({
      user_id: user.id,
      exercise_id: ex.id,
      sets: Array.from({ length: ex.sets }).map(() => ({
        reps: ex.reps,
        weight: 0,
        completed: false
      })),
      notes: ex.notes
    }))
  );

  if (insertError) {
    console.error('Error saving workout:', insertError);
    throw new Error('Erro ao salvar o treino.');
  }

  revalidatePath('/dashboard');
  return redirect('/workout/play');
}
