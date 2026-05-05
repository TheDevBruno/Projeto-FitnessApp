import Link from 'next/link';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import styles from './login.module.css';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect('/dashboard');
  }

  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/dashboard');
  };

  const signUp = async (formData: FormData) => {
    'use server';

    const origin = (await headers()).get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/login?message=Check email to continue sign in process');
  };

  const signInWithGoogle = async () => {
    'use server';
    
    const origin = (await headers()).get('origin');
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    if (data.url) {
      return redirect(data.url);
    }
  };

  return (
    <div className={styles.container}>
      <div className="card">
        <h2 className={styles.title}>Bem-vindo ao LifeRealFitness</h2>
        <p className="text-muted">Entre na sua conta para continuar sua jornada.</p>

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input
              className="input"
              name="email"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Senha</label>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>
          
          {searchParams?.message && (
            <p className={styles.message}>{searchParams.message}</p>
          )}

          <button formAction={signIn} className="btn btn-primary">
            Entrar
          </button>
          <button formAction={signUp} className="btn btn-secondary">
            Criar Conta
          </button>
          
          <div className={styles.divider}>
            <span>ou continue com</span>
          </div>

          <button formAction={signInWithGoogle} className="btn btn-secondary">
             Google
          </button>
        </form>
      </div>
      
      <Link href="/" className={styles.back}>
        ← Voltar para a Home
      </Link>
    </div>
  );
}
