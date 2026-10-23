import { useCallback, useState } from 'react';

/**
 * Tracks which mode the player picked.
 * mode is null until a choice is made, which means "show the mode selection".
 */
export function useGameMode() {
  const [mode, setMode] = useState(null);

  const selectMode = useCallback((nextMode) => setMode(nextMode), []);
  const clearMode = useCallback(() => setMode(null), []);

  return {
    mode,
    hasSelectedMode: mode !== null,
    selectMode,
    clearMode,
  };
}
