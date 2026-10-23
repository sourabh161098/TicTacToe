import { getPosition } from '../../utils/board';
import styles from './Square.module.css';

/**
 * A single cell on the board.
 * Rendered as a button so it is keyboard and screen-reader accessible.
 */
function Square({ index, value }) {
  const { row, col } = getPosition(index);
  const label = `Row ${row + 1}, column ${col + 1}, ${value ?? 'empty'}`;

  return (
    <button type="button" className={styles.square} aria-label={label}>
      {value}
    </button>
  );
}

export default Square;
