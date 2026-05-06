import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div 
          className={styles.fill} 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={styles.labels}>
        <span>Passo {currentStep} de {totalSteps}</span>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  );
}
