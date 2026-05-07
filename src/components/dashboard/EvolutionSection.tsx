'use client';

import React from 'react';
import { EvolutionChart } from './EvolutionChart';
import { WeightModal } from './WeightModal';
import styles from './EvolutionSection.module.css';

interface EvolutionSectionProps {
  weightHistory: any[];
  adherenceData: any[];
  workoutDates: string[];
}

export function EvolutionSection({ weightHistory, adherenceData, workoutDates }: EvolutionSectionProps) {
  const currentWeight = weightHistory[weightHistory.length - 1]?.weight || 0;
  const startWeight = weightHistory[0]?.weight || 0;
  const diff = currentWeight - startWeight;

  // Processar dados para o heatmap (últimos 28 dias)
  const last28Days = Array.from({ length: 28 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    const dateStr = d.toISOString().split('T')[0];
    
    const hasDiet = adherenceData.some(a => a.date === dateStr && a.followed_plan);
    const hasWorkout = workoutDates.some(wd => wd.startsWith(dateStr));

    return { date: dateStr, active: hasDiet || hasWorkout };
  });

  const adherenceRate = (adherenceData.filter(a => a.followed_plan).length / 30 * 100).toFixed(0);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>Sua Evolução</h2>
        <WeightModal />
      </div>

      <div className={styles.grid}>
        {/* Card: Peso e Medidas */}
        <div className="card">
          <div className={styles.cardHeader}>
            <h3>Peso e Medidas</h3>
            <span className={`${styles.badge} ${diff <= 0 ? styles.positive : styles.negative}`}>
              {diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1)} kg
            </span>
          </div>
          <p className={styles.currentVal}>{currentWeight.toFixed(1)} <small>kg</small></p>
          
          <div className={styles.chartWrapper}>
            <EvolutionChart 
              data={weightHistory.map(d => ({ date: d.date, value: d.weight }))} 
              color="#10B981"
            />
          </div>
        </div>

        {/* Card: Aderência à Dieta */}
        <div className="card">
          <div className={styles.cardHeader}>
            <h3>Aderência à Dieta</h3>
            <span className={styles.badge}>Mês Atual</span>
          </div>
          <p className={styles.currentVal}>{adherenceRate}<small>%</small></p>
          
          <div className={styles.adherenceGrid}>
             {last28Days.map((day, i) => (
               <div 
                 key={i} 
                 className={`${styles.daySquare} ${day.active ? styles.activeDay : ''}`}
                 title={day.date}
               />
             ))}
          </div>
          <p className={styles.hint}>Frequência baseada nos seus registros diários.</p>
        </div>
      </div>
    </section>
  );
}
