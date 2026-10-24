import { WINNING_LINES } from '../constants';
import { getEmptySquares, getOpponent } from './board';

/*
 * Rule-based computer player.
 *
 * On each turn the computer goes down this list and plays the first rule that applies:
 *   1. Win    - if it can complete a row / column / diagonal, do it.
 *   2. Block  - if the opponent could complete one next turn, take that square.
 *   3. Center - take the center if it is free.
 *   4. Corner - take any free corner.
 *   5. Any    - take any free square.
 *
 * Every rule only ever returns an empty square, so the computer can never make an invalid move.
 */

const CENTER = 4;
const CORNERS = [0, 2, 6, 8];

/**
 * Finds the square that would complete a line for the player:
 * a line where the player already holds every square but one, and that one is empty.
 */
function findLineCompletingSquare(board, player) {
  for (const line of WINNING_LINES) {
    const playerMarks = line.filter((index) => board[index] === player);
    const emptySquares = line.filter((index) => board[index] === null);

    if (playerMarks.length === line.length - 1 && emptySquares.length === 1) {
      return emptySquares[0];
    }
  }
  return null;
}

/** Rule 1: complete our own line. */
function findWinningMove(board, player) {
  return findLineCompletingSquare(board, player);
}

/** Rule 2: take the square the opponent needs to complete a line. */
function findBlockingMove(board, player) {
  return findLineCompletingSquare(board, getOpponent(player));
}

/** Rule 3: take the center. */
function findCenterMove(board) {
  return board[CENTER] === null ? CENTER : null;
}

/** Rule 4: take a free corner. */
function findCornerMove(board) {
  return CORNERS.find((index) => board[index] === null) ?? null;
}

/** Rule 5: take any free square. */
function findAnyMove(board) {
  return getEmptySquares(board)[0] ?? null;
}

/** Rules in priority order. Each returns a square index, or null if it does not apply. */
const STRATEGY = [findWinningMove, findBlockingMove, findCenterMove, findCornerMove, findAnyMove];

/**
 * Picks the computer's next move.
 * @param {Array<string|null>} board current board
 * @param {string} player the computer's mark
 * @returns {number|null} square index, or null if the board is full
 */
export function getComputerMove(board, player) {
  for (const rule of STRATEGY) {
    const move = rule(board, player);
    if (move !== null) return move;
  }
  return null;
}
