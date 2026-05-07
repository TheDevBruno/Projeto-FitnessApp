'use client';

import React from 'react';
import { EvolutionChart } from './EvolutionChart';
import { WeightModal } from './WeightModal';
import styles from './EvolutionSection.module.css';

interface EvolutionSectionProps {
  weightHistory: any[];
  adherenceData: any[];
}

export function EvolutionSection({ weightHistory, adherenceData }: EvolutionSectionProps) {
  const currentWeight = weightHistory[weightHistory.length - 1]?.weight || 0;
  const startWeight = weightHistory[0]?.weight || 0;
  const diff = currentWeight - startWeight;

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
          <p className={styles.currentVal}>85<small>%</small></p>
          
          <div className={styles.adherenceGrid}>
             {/* Mock de calendário estilo heatmap */}
             {Array.from({ length: 28 }).map((_, i) => (
               <div 
                 key={i} 
                 className={`${styles.daySquare} ${i % 3 !== 0 ? styles.activeDay : ''}`}
                 title={`Dia ${i + 1}`}
               />
             ))}
          </div>
          <p className={styles.hint}>Você treinou 18 dias este mês. Continue assim!</p>
        </div>
      </div>
    </section>
  );
}
