'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { saveWeight } from '@/app/dashboard/actions';
import styles from './WeightModal.module.css';

export function WeightModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await saveWeight(formData);
    setLoading(false);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        + Registrar Peso
      </Button>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Registrar Novo Peso</h3>
        <p>Acompanhe sua evolução periodicamente.</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Peso Atual (kg)</label>
            <input type="number" name="weight" step="0.1" required className="input" autoFocus />
          </div>
          
          <div className={styles.field}>
            <label>Data</label>
            <input type="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} className="input" />
          </div>

          <div className={styles.actions}>
            <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>Cancelar</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
