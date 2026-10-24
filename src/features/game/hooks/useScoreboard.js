import { useCallback, useEffect, useState } from 'react';
import { EMPTY_SCORES, addResult, loadScores, saveScores } from '../utils/scoreboard';

/**
 * Session-level scoreboard: X wins, O wins, and draws.
 * Kept above the game session so Reset Game and mode changes don't clear it.
 */
export function useScoreboard() {
  const [scores, setScores] = useState(loadScores);

  useEffect(() => {
    saveScores(scores);
  }, [scores]);

  /** Records a finished game. winner is 'X', 'O', or null for a draw. */
  const recordResult = useCallback((winner) => {
    setScores((prev) => addResult(prev, winner));
  }, []);

  const resetScores = useCallback(() => setScores({ ...EMPTY_SCORES }), []);

  return { scores, recordResult, resetScores };
}
