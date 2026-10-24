/** Number of rows and columns on the board. */
export const BOARD_SIZE = 3;

/** Total number of squares on the board. */
export const TOTAL_SQUARES = BOARD_SIZE * BOARD_SIZE;

/** Player marks. X always moves first. */
export const PLAYERS = Object.freeze({
  X: 'X',
  O: 'O',
});

export const FIRST_PLAYER = PLAYERS.X;

/** In vs-computer mode the human plays X and the computer plays O. */
export const HUMAN_PLAYER = PLAYERS.X;
export const COMPUTER_PLAYER = PLAYERS.O;

/** Short pause before the computer moves so it feels like it is "thinking". */
export const COMPUTER_MOVE_DELAY_MS = 500;

/**
 * Every line that wins the game, as board indexes:
 *
 *   0 | 1 | 2
 *   3 | 4 | 5
 *   6 | 7 | 8
 */
export const WINNING_LINES = Object.freeze([
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
]);

/** Possible states of a game. */
export const GAME_STATUS = Object.freeze({
  PLAYING: 'playing',
  WON: 'won',
  DRAW: 'draw',
});

/** Supported ways to play. */
export const GAME_MODES = Object.freeze({
  VS_COMPUTER: 'vs-computer',
  TWO_PLAYER: 'two-player',
});

/**
 * How many moves one Undo removes.
 * - Two players: just the latest move.
 * - vs Computer: the computer's reply and the human move before it,
 *   so it is the human's turn again.
 */
export const UNDO_MOVE_COUNT = Object.freeze({
  [GAME_MODES.TWO_PLAYER]: 1,
  [GAME_MODES.VS_COMPUTER]: 2,
});

/** Display details for each mode, in the order shown on the selection screen. */
export const MODE_OPTIONS = Object.freeze([
  {
    mode: GAME_MODES.VS_COMPUTER,
    title: 'vs Computer',
    description: 'You play X, the computer plays O.',
  },
  {
    mode: GAME_MODES.TWO_PLAYER,
    title: '2 Players',
    description: 'Take turns with a friend on this device.',
  },
]);

/** Looks up the display title for a mode. */
export function getModeTitle(mode) {
  return MODE_OPTIONS.find((option) => option.mode === mode)?.title ?? '';
}

/** sessionStorage key for the scoreboard. */
export const SCOREBOARD_STORAGE_KEY = 'tic-tac-toe:scoreboard';
