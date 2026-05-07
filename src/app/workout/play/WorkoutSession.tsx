'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './play.module.css';

interface WorkoutSessionProps {
  initialLogs: any[];
}

export function WorkoutSession({ initialLogs }: WorkoutSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [logs, setLogs] = useState(initialLogs);
  const [timer, setTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);

  const currentExercise = logs[currentIndex];
  const libraryData = currentExercise.exercise_library;

  useEffect(() => {
    let interval: any;
    if (isResting && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setIsResting(false);
    }
    return () => clearInterval(interval);
  }, [isResting, timer]);

  const toggleSet = (setIndex: number) => {
    const newLogs = [...logs];
    const currentSets = [...newLogs[currentIndex].sets];
    currentSets[setIndex].completed = !currentSets[setIndex].completed;
    newLogs[currentIndex].sets = currentSets;
    setLogs(newLogs);

    if (currentSets[setIndex].completed) {
      setTimer(60); // Default 60s rest
      setIsResting(true);
    }
  };

  const nextExercise = () => setCurrentIndex((prev) => Math.min(prev + 1, logs.length - 1));
  const prevExercise = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  // Sugestão de carga simples (Mockada para MVP, mas pronta para receber dados reais)
  const loadSuggestion = currentIndex % 2 === 0 ? "Sugestão: Tente +2kg hoje!" : null;

  return (
    <div className={styles.sessionCard} key={currentIndex}>
      {loadSuggestion && (
        <div className={styles.suggestionBanner}>
          ✨ <strong>Progressão:</strong> {loadSuggestion}
        </div>
      )}

      <div className={styles.mediaContainer}>
        {libraryData.video_url && libraryData.video_url !== 'https://link.to/video' ? (
          <video src={libraryData.video_url} autoPlay loop muted playsInline />
        ) : (
          <div className={styles.videoPlaceholder}>
            <span>Visualização de {libraryData.name}</span>
          </div>
        )}
      </div>

      <div className={styles.exerciseInfo}>
        <header className={styles.header}>
          <span className={styles.progress}>Exercício {currentIndex + 1} de {logs.length}</span>
          <h2 className={styles.exerciseName}>{libraryData.name}</h2>
          <span className={styles.muscle}>{libraryData.muscle_group}</span>
        </header>
      </div>

      <div className={styles.setsList}>
        {currentExercise.sets.map((set: any, i: number) => (
          <div key={i} className={`${styles.setRow} ${set.completed ? styles.completed : ''}`}>
            <span className={styles.setNum}>Série {i + 1}</span>
            <div className={styles.setInput}>
              <input type="number" defaultValue={set.weight} className="input" placeholder="kg" />
              <span>kg</span>
            </div>
            <span className={styles.reps}>{set.reps} reps</span>
            <Button 
              variant={set.completed ? 'secondary' : 'primary'} 
              size="sm"
              onClick={() => toggleSet(i)}
            >
              {set.completed ? 'Desfazer' : 'Check'}
            </Button>
          </div>
        ))}
      </div>

      {isResting && (
        <div className={styles.timerOverlay}>
          <div className={styles.timerCircle}>
            <span className={styles.timerValue}>{timer}s</span>
            <span className={styles.timerLabel}>Descanso</span>
          </div>
          <Button variant="secondary" onClick={() => setTimer(0)}>Pular</Button>
        </div>
      )}

      <footer className={styles.footer}>
        <Button variant="secondary" onClick={prevExercise} disabled={currentIndex === 0}>Anterior</Button>
        <Button onClick={nextExercise} disabled={currentIndex === logs.length - 1}>Próximo</Button>
      </footer>
    </div>
  );
}
