import { BOARD_SIZE } from '../../constants';
import Square from '../Square/Square';
import styles from './Board.module.css';

/** Renders the board as a responsive grid of squares. */
function Board({ squares, winningLine, canPlay, onSquareClick }) {
  return (
    <div
      className={styles.board}
      style={{ '--board-size': BOARD_SIZE }}
      role="group"
      aria-label="Tic Tac Toe board"
    >
      {squares.map((value, index) => (
        <Square
          key={index}
          index={index}
          value={value}
          isWinning={winningLine.includes(index)}
          isDisabled={!canPlay || value !== null}
          onClick={onSquareClick}
        />
      ))}
    </div>
  );
}

export default Board;
