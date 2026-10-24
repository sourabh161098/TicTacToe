import { useEffect } from 'react';
import { COMPUTER_MOVE_DELAY_MS } from '../constants';
import { getComputerMove } from '../utils/computerStrategy';

/**
 * Plays the computer's move when it is the computer's turn.
 * Waits COMPUTER_MOVE_DELAY_MS first; the pending move is cancelled if the
 * board changes or the game restarts in the meantime.
 *
 * @param {object} params
 * @param {boolean} params.isComputerTurn whether the computer should move now
 * @param {Array<string|null>} params.board current board
 * @param {string} params.computerPlayer the computer's mark
 * @param {(index: number) => void} params.onMove called with the chosen square
 */
export function useComputerOpponent({ isComputerTurn, board, computerPlayer, onMove }) {
  useEffect(() => {
    if (!isComputerTurn) return undefined;

    const timeoutId = setTimeout(() => {
      const move = getComputerMove(board, computerPlayer);
      if (move !== null) onMove(move);
    }, COMPUTER_MOVE_DELAY_MS);

    return () => clearTimeout(timeoutId);
  }, [isComputerTurn, board, computerPlayer, onMove]);
}
