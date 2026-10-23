import { BOARD_SIZE } from '../../constants';
import Square from '../Square/Square';
import styles from './Board.module.css';

/** Renders the board as a responsive grid of squares. */
function Board({ squares }) {
  return (
    <div
      className={styles.board}
      style={{ '--board-size': BOARD_SIZE }}
      role="group"
      aria-label="Tic Tac Toe board"
    >
      {squares.map((value, index) => (
        <Square key={index} index={index} value={value} />
      ))}
    </div>
  );
}

export default Board;
