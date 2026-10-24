import { getPosition } from '../../utils/board';
import Mark from '../Mark/Mark';
import styles from './Square.module.css';

/**
 * A single cell on the board.
 * Uses aria-disabled rather than disabled so squares stay focusable while
 * the computer is moving; clicks are ignored by the game logic instead.
 */
function Square({ index, value, isWinning, isDisabled, onClick }) {
  const { row, col } = getPosition(index);
  const label = `Row ${row + 1}, column ${col + 1}, ${value ?? 'empty'}`;

  const className = [
    styles.square,
    value && styles[value.toLowerCase()],
    isWinning && styles.winning,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      aria-disabled={isDisabled}
      onClick={() => onClick(index)}
    >
      <Mark player={value} />
    </button>
  );
}

export default Square;
