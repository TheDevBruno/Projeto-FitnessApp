import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import styles from './Sidebar.module.css';
import { 
  FiHome, 
  FiShoppingCart, 
  FiSettings, 
  FiActivity, 
  FiLogOut 
} from 'react-icons/fi';

export default async function Sidebar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          Minhavida<span>Fitness</span>
        </div>

        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navItem}>
            <FiHome /> <span>Dashboard</span>
          </Link>
          <Link href="/shopping-list" className={styles.navItem}>
            <FiShoppingCart /> <span>Lista de Compras</span>
          </Link>
          <Link href="/workout/history" className={styles.navItem}>
            <FiActivity /> <span>Histórico</span>
          </Link>
          <Link href="/settings/equipment" className={styles.navItem}>
            <FiSettings /> <span>Equipamentos</span>
          </Link>
        </nav>

        <div className={styles.footer}>
          <form action="/auth/signout" method="post">
            <button className={styles.logoutBtn}>
              <FiLogOut /> <span>Sair</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className={styles.bottomNav}>
        <Link href="/dashboard" className={styles.bottomItem}>
          <FiHome />
        </Link>
        <Link href="/shopping-list" className={styles.bottomItem}>
          <FiShoppingCart />
        </Link>
        <Link href="/settings/equipment" className={styles.bottomItem}>
          <FiSettings />
        </Link>
      </nav>
    </>
  );
}
