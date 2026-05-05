import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="container">
        <section className={styles.hero}>
          <h1 className={styles.title}>
            LifeReal<span className={styles.accent}>Fitness</span>
          </h1>
          <p className="text-muted">
            Seu Personal Digital Adaptativo: Fitness e Nutrição que cabem na sua rotina e no seu bolso.
          </p>
          <div className={styles.actions}>
            <button className="btn btn-primary">Começar Agora</button>
            <button className="btn btn-secondary">Saiba Mais</button>
          </div>
        </section>
      </div>
    </main>
  );
}
