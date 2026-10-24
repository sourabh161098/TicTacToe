import { PLAYERS, SCOREBOARD_STORAGE_KEY } from '../constants';

/*
 * Scoreboard data and persistence.
 * Scores live in sessionStorage, so they survive a page refresh but are cleared
 * when the browser tab is closed (a "session-level" scoreboard).
 * All storage access is in this file; swapping in a backend later only touches here.
 */

export const EMPTY_SCORES = Object.freeze({
  [PLAYERS.X]: 0,
  [PLAYERS.O]: 0,
  draws: 0,
});

/** Returns new scores with one result added. winner is 'X', 'O', or null for a draw. */
export function addResult(scores, winner) {
  const key = winner ?? 'draws';
  return { ...scores, [key]: scores[key] + 1 };
}

export function hasAnyScore(scores) {
  return Object.values(scores).some((count) => count > 0);
}

function isValidCount(value) {
  return Number.isInteger(value) && value >= 0;
}

/** Reads saved scores, falling back to zeros if missing, corrupted, or storage is unavailable. */
export function loadScores() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(SCOREBOARD_STORAGE_KEY));
    const isValid = saved && Object.keys(EMPTY_SCORES).every((key) => isValidCount(saved[key]));
    return isValid ? { ...EMPTY_SCORES, ...saved } : { ...EMPTY_SCORES };
  } catch {
    return { ...EMPTY_SCORES };
  }
}

export function saveScores(scores) {
  try {
    sessionStorage.setItem(SCOREBOARD_STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // Storage can be unavailable (e.g. some private browsing modes); scores still work in memory.
  }
}
