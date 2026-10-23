import { Game } from '@/features/game';
import styles from './App.module.css';

/**
 * Root application component.
 * App-wide providers (theme, context, routing) will wrap the tree here.
 */
function App() {
  return (
    <main className={styles.app}>
      <h1 className={styles.title}>
        <span className={styles.tic}>TIC</span>{' '}
        <span className={styles.tac}>TAC</span>{' '}
        <span className={styles.toe}>TOE</span>
      </h1>
      <Game />
    </main>
  );
}

export default App;
