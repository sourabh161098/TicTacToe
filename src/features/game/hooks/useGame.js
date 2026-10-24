import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { COMPUTER_PLAYER, GAME_MODES, GAME_STATUS, UNDO_MOVE_COUNT } from '../constants';
import { GAME_ACTIONS, createInitialGameState, gameReducer } from '../state/gameReducer';
import { buildBoard, getCurrentPlayer } from '../utils/board';
import { getGameResult } from '../utils/gameResult';
import { getStatusMessage } from '../utils/statusMessage';
import { useComputerOpponent } from './useComputerOpponent';

/**
 * Owns one game session: moves, turns, result, undo, and reset.
 *
 * State is the move history plus two small flags (see gameReducer). The board,
 * current player, and win/draw status are derived from the moves, so they can
 * never drift apart.
 *
 * @param {string} mode one of GAME_MODES
 * @param {(winner: string|null) => void} onGameEnd called once per finished game
 *   with the winner ('X' / 'O') or null for a draw
 */
export function useGame(mode, onGameEnd) {
  const [{ moves, canUndoLastMove, gameNumber }, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialGameState,
  );

  // --- Derived state ---
  const board = useMemo(() => buildBoard(moves), [moves]);
  const { status, winner, winningLine } = useMemo(() => getGameResult(board), [board]);
  const currentPlayer = getCurrentPlayer(moves);
  const isGameOver = status !== GAME_STATUS.PLAYING;
  const isComputerTurn =
    mode === GAME_MODES.VS_COMPUTER && !isGameOver && currentPlayer === COMPUTER_PLAYER;

  // Humans can act only during play, and not while the computer is moving.
  const canPlay = !isGameOver && !isComputerTurn;
  const undoCount = UNDO_MOVE_COUNT[mode];
  // Single-step undo: only the most recent move (pair) can be taken back.
  const canUndo = canPlay && canUndoLastMove && moves.length >= undoCount;

  // --- Actions ---
  const playMove = useCallback((square) => {
    dispatch({ type: GAME_ACTIONS.MOVE, square });
  }, []);

  const handleSquareClick = useCallback(
    (square) => {
      if (canPlay) playMove(square);
    },
    [canPlay, playMove],
  );

  const undo = useCallback(() => {
    if (canUndo) dispatch({ type: GAME_ACTIONS.UNDO, count: undoCount });
  }, [canUndo, undoCount]);

  const resetGame = useCallback(() => dispatch({ type: GAME_ACTIONS.RESET }), []);

  // --- Side effects ---
  useComputerOpponent({
    isComputerTurn,
    board,
    computerPlayer: COMPUTER_PLAYER,
    onMove: playMove,
  });

  // Report each finished game exactly once, keyed by its game number.
  const reportedGameRef = useRef(null);
  useEffect(() => {
    if (!isGameOver || reportedGameRef.current === gameNumber) return;
    reportedGameRef.current = gameNumber;
    onGameEnd?.(winner);
  }, [isGameOver, gameNumber, winner, onGameEnd]);

  return {
    board,
    moves,
    winningLine,
    isGameOver,
    canPlay,
    canUndo,
    statusMessage: getStatusMessage({ mode, status, winner, currentPlayer }),
    handleSquareClick,
    undo,
    resetGame,
  };
}
