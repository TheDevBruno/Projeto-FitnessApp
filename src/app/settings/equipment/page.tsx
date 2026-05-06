import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import styles from './equipment.module.css';
import { revalidatePath } from 'next/cache';

export default async function EquipmentSettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect('/login');

  const { data: types } = await supabase
    .from('equipment_types')
    .select('*')
    .order('category', { ascending: true });

  const { data: userEquip } = await supabase
    .from('user_equipment')
    .select('equipment_id')
    .eq('user_id', user.id);

  const userEquipIds = new Set(userEquip?.map(e => e.equipment_id));

  async function updateEquipment(formData: FormData) {
    'use server';
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const selected = formData.getAll('equipment') as string[];
    
    // Simplest way: Delete and insert
    await supabase.from('user_equipment').delete().eq('user_id', user.id);
    
    if (selected.length > 0) {
      await supabase.from('user_equipment').insert(
        selected.map(id => ({ user_id: user.id, equipment_id: id }))
      );
    }

    revalidatePath('/settings/equipment');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Seu Inventário de Equipamentos</h1>
      <p className={styles.subtitle}>Selecione o que você tem disponível para treinar.</p>

      <form action={updateEquipment} className={styles.form}>
        <div className={styles.grid}>
          {types?.map((type) => (
            <label key={type.id} className={styles.card}>
              <div className={styles.checkboxWrapper}>
                <input 
                  type="checkbox" 
                  name="equipment" 
                  value={type.id} 
                  defaultChecked={userEquipIds.has(type.id)}
                />
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{type.name}</span>
                <span className={styles.category}>{type.category}</span>
              </div>
            </label>
          ))}
        </div>

        <div className={styles.actions}>
          <Button type="submit">Salvar Inventário</Button>
        </div>
      </form>
    </div>
  );
}
