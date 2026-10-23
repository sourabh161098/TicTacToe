import { useState } from 'react';
import { createEmptyBoard } from '../utils/board';

/**
 * Owns all board state so UI components stay presentational.
 * mode is accepted now so vs-computer behavior can be added here later.
 */
export function useGame(mode) {
  const [board] = useState(createEmptyBoard);

  return { mode, board };
}
