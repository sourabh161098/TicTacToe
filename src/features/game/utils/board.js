import { BOARD_SIZE, TOTAL_SQUARES } from '../constants';

/**
 * Creates an empty board.
 * The board is a flat array of TOTAL_SQUARES cells, read left-to-right,
 * top-to-bottom. Each cell is null (empty) or a player mark.
 */
export function createEmptyBoard() {
  return Array(TOTAL_SQUARES).fill(null);
}

/** Converts a flat board index into its { row, col } position (0-based). */
export function getPosition(index) {
  return {
    row: Math.floor(index / BOARD_SIZE),
    col: index % BOARD_SIZE,
  };
}
