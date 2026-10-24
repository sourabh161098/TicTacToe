import { getPlayerForMove, getPosition } from '../../utils/board';
import styles from './MoveHistory.module.css';

/** Collapsible list of every move in the current game, in order. */
function MoveHistory({ moves }) {
  return (
    <details className={styles.history}>
      <summary className={styles.summary}>Move history ({moves.length})</summary>

      {moves.length === 0 ? (
        <p className={styles.empty}>No moves yet.</p>
      ) : (
        <ol className={styles.list}>
          {moves.map((square, moveNumber) => {
            const player = getPlayerForMove(moveNumber);
            const { row, col } = getPosition(square);
            const position = `Row ${row + 1}, Column ${col + 1}`;
            return (
              <li key={moveNumber} className={styles.item}>
                <span className={styles[player.toLowerCase()]}>{player}</span> → {position}
              </li>
            );
          })}
        </ol>
      )}
    </details>
  );
}

export default MoveHistory;
