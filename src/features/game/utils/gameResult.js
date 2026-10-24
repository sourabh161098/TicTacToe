import { GAME_STATUS, WINNING_LINES } from '../constants';

/** Finds a completed line. Returns { winner, line } or null if nobody has won. */
function findWinningLine(board) {
  for (const line of WINNING_LINES) {
    const [first, ...rest] = line;
    const mark = board[first];

    if (mark && rest.every((index) => board[index] === mark)) {
      return { winner: mark, line };
    }
  }
  return null;
}

/**
 * Works out where the game stands.
 * @returns {{ status: string, winner: string|null, winningLine: number[] }}
 */
export function getGameResult(board) {
  const win = findWinningLine(board);
  if (win) {
    return { status: GAME_STATUS.WON, winner: win.winner, winningLine: win.line };
  }

  const isBoardFull = board.every((cell) => cell !== null);
  if (isBoardFull) {
    return { status: GAME_STATUS.DRAW, winner: null, winningLine: [] };
  }

  return { status: GAME_STATUS.PLAYING, winner: null, winningLine: [] };
}
