import { GAME_MODES, PLAYERS } from '../../constants';
import { hasAnyScore } from '../../utils/scoreboard';
import styles from './Scoreboard.module.css';

/** Labels change with the mode so it is clear who X and O are. */
function getLabels(mode) {
  if (mode === GAME_MODES.VS_COMPUTER) {
    return { [PLAYERS.X]: 'You (X)', [PLAYERS.O]: 'Computer (O)', draws: 'Draws' };
  }
  return { [PLAYERS.X]: 'Player X', [PLAYERS.O]: 'Player O', draws: 'Draws' };
}

/** Session scoreboard: X wins, O wins, draws, plus a Reset Scoreboard button. */
function Scoreboard({ scores, mode, onReset }) {
  const labels = getLabels(mode);
  const items = [
    { key: PLAYERS.X, className: styles.x },
    { key: 'draws', className: styles.draws },
    { key: PLAYERS.O, className: styles.o },
  ];

  return (
    <section className={styles.scoreboard} aria-labelledby="scoreboard-heading">
      <div className={styles.header}>
        <h2 id="scoreboard-heading" className={styles.heading}>
          Scoreboard
        </h2>
        <button
          type="button"
          className={styles.reset}
          onClick={onReset}
          disabled={!hasAnyScore(scores)}
        >
          Reset Scoreboard
        </button>
      </div>

      <dl className={styles.scores}>
        {items.map(({ key, className }) => (
          <div key={key} className={`${styles.score} ${className}`}>
            <dt className={styles.label}>{labels[key]}</dt>
            <dd className={styles.value}>{scores[key]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default Scoreboard;
