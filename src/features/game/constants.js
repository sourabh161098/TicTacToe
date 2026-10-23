/** Number of rows and columns on the board. */
export const BOARD_SIZE = 3;

/** Total number of squares on the board. */
export const TOTAL_SQUARES = BOARD_SIZE * BOARD_SIZE;

/** Supported ways to play. */
export const GAME_MODES = Object.freeze({
  VS_COMPUTER: 'vs-computer',
  TWO_PLAYER: 'two-player',
});

/** Display details for each mode, in the order shown on the selection screen. */
export const MODE_OPTIONS = Object.freeze([
  {
    mode: GAME_MODES.VS_COMPUTER,
    title: 'vs Computer',
    description: 'Play solo against the computer.',
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
