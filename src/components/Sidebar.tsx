import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import styles from './Sidebar.module.css';

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
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Dashboard</span>
          </Link>
          <Link href="/shopping-list" className={styles.navItem}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6"/></svg>
            <span>Lista de Compras</span>
          </Link>
          <Link href="/workout/play" className={styles.navItem}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span>Treino</span>
          </Link>
          <Link href="/settings/equipment" className={styles.navItem}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>
            <span>Equipamentos</span>
          </Link>
        </nav>

        <div className={styles.footer}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {user.email?.[0].toUpperCase() ?? 'U'}
            </div>
            <div>
              <p className={styles.userName}>{user.email?.split('@')[0]}</p>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
          </div>
          <form action="/auth/signout" method="post" style={{ marginTop: '16px' }}>
            <button className={styles.logoutBtn}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              <span>Sair</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className={styles.bottomNav}>
        <Link href="/dashboard" className={styles.bottomItem}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Home</span>
        </Link>
        <Link href="/shopping-list" className={styles.bottomItem}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61h9.72a2 2 0 001.98-1.61L23 6H6"/></svg>
          <span>Compras</span>
        </Link>
        <Link href="/workout/play" className={styles.bottomItem}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          <span>Treino</span>
        </Link>
        <Link href="/settings/equipment" className={styles.bottomItem}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>
          <span>Config</span>
        </Link>
      </nav>
    </>
  );
}
