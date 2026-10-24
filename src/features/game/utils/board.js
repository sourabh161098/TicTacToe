import { BOARD_SIZE, FIRST_PLAYER, PLAYERS, TOTAL_SQUARES } from '../constants';

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

/** Returns the indexes of all empty squares. */
export function getEmptySquares(board) {
  return board.flatMap((cell, index) => (cell === null ? [index] : []));
}

/** Returns a new board with the player's mark placed. Never mutates the input. */
export function placeMark(board, index, player) {
  const next = [...board];
  next[index] = player;
  return next;
}

export function getOpponent(player) {
  return player === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
}

/** Players alternate, starting with X: move 0 is X, move 1 is O, and so on. */
export function getPlayerForMove(moveNumber) {
  return moveNumber % 2 === 0 ? FIRST_PLAYER : getOpponent(FIRST_PLAYER);
}

/** Whose turn it is: the player who makes the next move. */
export function getCurrentPlayer(moves) {
  return getPlayerForMove(moves.length);
}

/**
 * Rebuilds the board by replaying the move history.
 * @param {number[]} moves square indexes in the order they were played
 */
export function buildBoard(moves) {
  return moves.reduce(
    (board, square, moveNumber) => placeMark(board, square, getPlayerForMove(moveNumber)),
    createEmptyBoard(),
  );
}
