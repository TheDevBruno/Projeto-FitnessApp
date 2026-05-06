'use server';

import { createClient } from '@/utils/supabase/server';
import { onboardingSchema, OnboardingData } from '@/utils/schemas';
import { redirect } from 'next/navigation';

export async function saveOnboarding(data: OnboardingData) {
  const validatedFields = onboardingSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: 'Dados inválidos. Por favor, verifique os campos.',
    };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const { error } = await supabase
    .from('user_goals')
    .upsert({
      user_id: user.id,
      ...validatedFields.data,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error saving onboarding:', error);
    return {
      error: 'Erro ao salvar o perfil. Tente novamente.',
    };
  }

  return redirect('/dashboard');
}
