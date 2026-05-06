import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import styles from './shopping-list.module.css';

export default async function ShoppingListPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return redirect('/login');

  const { data: meals } = await supabase
    .from('meal_plans')
    .select('content');

  // Logic to aggregate ingredients by category
  const aggregated: Record<string, any[]> = {};

  meals?.forEach(meal => {
    meal.content.ingredients.forEach((ing: any) => {
      const cat = ing.category || 'Outros';
      if (!aggregated[cat]) aggregated[cat] = [];
      
      const existing = aggregated[cat].find(i => i.item === ing.item);
      if (existing) {
        existing.qty += ing.qty;
      } else {
        aggregated[cat].push({ ...ing });
      }
    });
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sua Lista de Compras Inteligente</h1>
      <p className={styles.subtitle}>Agrupada por categoria para facilitar sua vida no mercado.</p>

      {Object.keys(aggregated).length > 0 ? (
        <div className={styles.list}>
          {Object.entries(aggregated).map(([category, items]) => (
            <section key={category} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>{category}</h2>
              <ul className={styles.itemList}>
                {items.map((item, i) => (
                  <li key={i} className={styles.item}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>{item.qty}{item.unit} <strong>{item.item}</strong></span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>Gere um plano alimentar no dashboard para ver sua lista de compras.</p>
        </div>
      )}
    </div>
  );
}
