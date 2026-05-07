import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import styles from './Navbar.module.css';

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          LifeReal<span>Fitness</span>
        </Link>
        
        <div className={styles.links}>
          {user ? (
            <>
              <Link href="/dashboard" className={styles.link}>Dashboard</Link>
              <Link href="/shopping-list" className={styles.link}>Compras</Link>
              <Link href="/settings/equipment" className={styles.link}>Equipamentos</Link>
              <form action="/auth/signout" method="post">
                <button className="btn btn-secondary">Sair</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-secondary">Entrar</Link>
              <Link href="/login" className="btn btn-primary">Começar</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
