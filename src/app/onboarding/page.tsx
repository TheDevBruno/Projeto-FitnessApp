'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema, OnboardingData } from '@/utils/schemas';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { FeedbackCards } from '@/components/onboarding/FeedbackCards';
import { saveOnboarding } from './actions';
import styles from './onboarding.module.css';

const STEPS = [
  { id: 1, title: 'Dados Físicos' },
  { id: 2, title: 'Objetivo' },
  { id: 3, title: 'Logística' },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema) as any,
    defaultValues: {
      gender: 'male',
      activity_level: 'moderate',
      goal_type: 'maintenance',
      monthly_budget: 'variado',
      weekly_prep_time: 'meal_prep',
      uses_supplements: false,
    },
  });

  const formValues = watch();

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data: OnboardingData) => {
    setError(null);
    const result = await saveOnboarding(data);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} />
        
        <h1 className={styles.title}>{STEPS[currentStep - 1].title}</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {currentStep === 1 && (
            <div className={styles.section}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Idade</label>
                  <input className="input" type="number" {...register('age', { valueAsNumber: true })} />
                  {errors.age && <span className={styles.error}>{errors.age.message}</span>}
                </div>
                <div className={styles.field}>
                  <label>Gênero</label>
                  <select className="input" {...register('gender')}>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                    <option value="other">Outro</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Peso (kg)</label>
                  <input className="input" type="number" step="0.1" {...register('weight', { valueAsNumber: true })} />
                  {errors.weight && <span className={styles.error}>{errors.weight.message}</span>}
                </div>
                <div className={styles.field}>
                  <label>Altura (cm)</label>
                  <input className="input" type="number" {...register('height', { valueAsNumber: true })} />
                  {errors.height && <span className={styles.error}>{errors.height.message}</span>}
                </div>
              </div>

              <div className={styles.field}>
                <label>Nível de Atividade</label>
                <select className="input" {...register('activity_level')}>
                  <option value="sedentary">Sedentário (Pouco ou nenhum exercício)</option>
                  <option value="light">Leve (Exercício 1-3 dias/semana)</option>
                  <option value="moderate">Moderado (Exercício 3-5 dias/semana)</option>
                  <option value="active">Ativo (Exercício 6-7 dias/semana)</option>
                  <option value="very_active">Muito Ativo (Trabalho físico pesado)</option>
                </select>
              </div>

              <FeedbackCards 
                weight={formValues.weight} 
                height={formValues.height}
                age={formValues.age}
                gender={formValues.gender}
                activityLevel={formValues.activity_level}
                goal={formValues.goal_type}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className={styles.section}>
              <div className={styles.field}>
                <label>Qual seu objetivo principal?</label>
                <div className={styles.options}>
                  <label className={styles.radioOption}>
                    <input type="radio" value="weight_loss" {...register('goal_type')} />
                    <span>Emagrecimento</span>
                  </label>
                  <label className={styles.radioOption}>
                    <input type="radio" value="muscle_gain" {...register('goal_type')} />
                    <span>Ganho de Massa</span>
                  </label>
                  <label className={styles.radioOption}>
                    <input type="radio" value="maintenance" {...register('goal_type')} />
                    <span>Manutenção</span>
                  </label>
                </div>
              </div>
              
              <div className={styles.preview}>
                <p>Com esse objetivo, sua distribuição de macros será ajustada automaticamente.</p>
                <FeedbackCards 
                  weight={formValues.weight} 
                  height={formValues.height}
                  age={formValues.age}
                  gender={formValues.gender}
                  activityLevel={formValues.activity_level}
                  goal={formValues.goal_type}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className={styles.section}>
              <div className={styles.field}>
                <label>Orçamento Mensal para Alimentação</label>
                <select className="input" {...register('monthly_budget')}>
                  <option value="economico">Econômico (Foco em custo-benefício)</option>
                  <option value="variado">Variado (Equilíbrio entre custo e variedade)</option>
                  <option value="personalizado">Personalizado (Ingredientes premium)</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>Tempo disponível para preparo</label>
                <select className="input" {...register('weekly_prep_time')}>
                  <option value="express">Express (Até 30min/dia)</option>
                  <option value="meal_prep">Meal Prep (Preparo semanal)</option>
                  <option value="total">Disponibilidade Total (Cozinho na hora)</option>
                </select>
              </div>

              <div className={styles.checkboxField}>
                <input type="checkbox" id="supplements" {...register('uses_supplements')} />
                <label htmlFor="supplements">Utilizo suplementos (Whey, Creatina, etc.)</label>
              </div>
            </div>
          )}

          {error && <div className={styles.errorBanner}>{error}</div>}

          <div className={styles.actions}>
            {currentStep > 1 && (
              <Button type="button" variant="secondary" onClick={prevStep} disabled={isSubmitting}>
                Voltar
              </Button>
            )}
            
            {currentStep < STEPS.length ? (
              <Button type="button" onClick={nextStep} disabled={isSubmitting}>
                Próximo
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Finalizar Perfil'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
