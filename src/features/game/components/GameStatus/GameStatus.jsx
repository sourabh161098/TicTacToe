import styles from './GameStatus.module.css';

/**
 * Announces whose turn it is or the result.
 * aria-live lets screen readers hear updates without moving focus.
 */
function GameStatus({ message, isGameOver }) {
  return (
    <p
      className={`${styles.status} ${isGameOver ? styles.final : ''}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </p>
  );
}

export default GameStatus;
