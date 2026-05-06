import React from 'react';
import { calculateBMI, calculateBMR, calculateTDEE, calculateMacros, Gender, ActivityLevel, GoalType } from '@/utils/health';
import styles from './FeedbackCards.module.css';

interface FeedbackCardsProps {
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  goal: GoalType;
}

export function FeedbackCards({ weight, height, age, gender, activityLevel, goal }: FeedbackCardsProps) {
  const bmi = calculateBMI(weight, height);
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const macros = calculateMacros(tdee, goal);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Abaixo do peso', color: '#3B82F6' };
    if (bmi < 24.9) return { label: 'Normal', color: '#10B981' };
    if (bmi < 29.9) return { label: 'Sobrepeso', color: '#F59E0B' };
    return { label: 'Obesidade', color: '#EF4444' };
  };

  const bmiCat = getBMICategory(bmi);

  return (
    <div className={styles.grid}>
      <div className="card">
        <span className={styles.label}>Seu IMC</span>
        <div className={styles.value}>{bmi || '--'}</div>
        <span className={styles.sublabel} style={{ color: bmiCat.color }}>{bmi ? bmiCat.label : ''}</span>
      </div>
      
      <div className="card">
        <span className={styles.label}>Gasto Diário (GET)</span>
        <div className={styles.value}>{tdee || '--'}</div>
        <span className={styles.sublabel}>kcal/dia recomendadas</span>
      </div>

      <div className={`${styles.fullWidth} card`}>
        <span className={styles.label}>Distribuição de Macros</span>
        <div className={styles.macrosGrid}>
          <div className={styles.macro}>
            <span className={styles.macroValue}>{macros.protein}g</span>
            <span className={styles.macroLabel}>Proteína</span>
          </div>
          <div className={styles.macro}>
            <span className={styles.macroValue}>{macros.carbs}g</span>
            <span className={styles.macroLabel}>Carbos</span>
          </div>
          <div className={styles.macro}>
            <span className={styles.macroValue}>{macros.fat}g</span>
            <span className={styles.macroLabel}>Gordura</span>
          </div>
        </div>
      </div>
    </div>
  );
}
