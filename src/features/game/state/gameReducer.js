import { GAME_STATUS } from '../constants';
import { buildBoard } from '../utils/board';
import { getGameResult } from '../utils/gameResult';

/*
 * Game state is the ordered move history plus two small flags.
 * The board, whose turn it is, and the result are all derived from `moves`,
 * which keeps Undo simple: drop moves from the end and everything else follows.
 */

export const GAME_ACTIONS = Object.freeze({
  MOVE: 'move',
  UNDO: 'undo',
  RESET: 'reset',
});

export function createInitialGameState() {
  return {
    /** Square indexes in the order they were played. */
    moves: [],
    /**
     * Undo is single-step: it takes back only the most recent move (or move pair).
     * Set when a move is played, cleared once Undo is used, so Undo can't be
     * pressed repeatedly to rewind the whole game.
     */
    canUndoLastMove: false,
    /** Increases on every reset so each game can be told apart (used for scoring once). */
    gameNumber: 1,
  };
}

/** A move is valid only while the game is in progress and the square is empty. */
function isValidMove(moves, square) {
  const board = buildBoard(moves);
  return getGameResult(board).status === GAME_STATUS.PLAYING && board[square] === null;
}

export function gameReducer(state, action) {
  switch (action.type) {
    case GAME_ACTIONS.MOVE: {
      // Invalid moves leave state untouched, so the turn does not change.
      if (!isValidMove(state.moves, action.square)) return state;
      return { ...state, moves: [...state.moves, action.square], canUndoLastMove: true };
    }

    case GAME_ACTIONS.UNDO: {
      const count = Math.min(action.count, state.moves.length);
      if (!state.canUndoLastMove || count === 0) return state;
      return { ...state, moves: state.moves.slice(0, -count), canUndoLastMove: false };
    }

    case GAME_ACTIONS.RESET:
      return { ...createInitialGameState(), gameNumber: state.gameNumber + 1 };

    default:
      return state;
  }
}
