import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import styles from './shopping.module.css';

export default async function ShoppingListPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect('/login');

  const { data: meals } = await supabase
    .from('meal_plans')
    .select('*')
    .eq('user_id', user.id);

  // Agrupar ingredientes por categoria
  const inventory: Record<string, any[]> = {};
  
  meals?.forEach(meal => {
    meal.content.ingredients.forEach((ing: any) => {
      const cat = ing.category || 'Outros';
      if (!inventory[cat]) inventory[cat] = [];
      
      const existing = inventory[cat].find(i => i.item === ing.item);
      if (existing) {
        existing.qty += ing.qty;
      } else {
        inventory[cat].push({ ...ing });
      }
    });
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/dashboard">← Voltar</Link>
        <h1>Lista de Compras Inteligente</h1>
        <p className="text-muted">Itens agrupados para facilitar sua ida ao mercado.</p>
      </header>

      {Object.keys(inventory).length > 0 ? (
        <div className={styles.list}>
          {Object.entries(inventory).map(([category, items]) => (
            <div key={category} className={styles.categoryCard}>
              <h3>{category}</h3>
              <ul>
                {items.map((item, i) => (
                  <li key={i} className={styles.item}>
                    <input type="checkbox" />
                    <span>{item.qty}{item.unit} <strong>{item.item}</strong></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className={styles.printAction}>
             <Button variant="secondary" onClick={() => window.print()}>Imprimir / Salvar PDF</Button>
          </div>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center' }}>
          <p>Sua lista está vazia. Gere um plano alimentar no dashboard primeiro!</p>
          <Link href="/dashboard">
            <Button style={{ marginTop: '16px' }}>Ir para Dashboard</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
