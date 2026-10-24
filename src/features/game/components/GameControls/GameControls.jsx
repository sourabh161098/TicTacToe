import styles from './GameControls.module.css';

/** Undo Last Move and Reset Game buttons shown under the board. */
function GameControls({ canUndo, onUndo, onReset, isGameOver }) {
  return (
    <div className={styles.controls}>
      <button type="button" className={styles.button} onClick={onUndo} disabled={!canUndo}>
        Undo Last Move
      </button>
      <button
        type="button"
        className={`${styles.button} ${isGameOver ? styles.highlight : ''}`}
        onClick={onReset}
      >
        Reset Game
      </button>
    </div>
  );
}

export default GameControls;
