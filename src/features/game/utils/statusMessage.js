import { COMPUTER_PLAYER, GAME_MODES, GAME_STATUS, HUMAN_PLAYER } from '../constants';

/** Text shown above the board describing whose turn it is or how the game ended. */
export function getStatusMessage({ mode, status, winner, currentPlayer }) {
  const isVsComputer = mode === GAME_MODES.VS_COMPUTER;

  if (status === GAME_STATUS.DRAW) {
    return "It's a draw";
  }

  if (status === GAME_STATUS.WON) {
    if (!isVsComputer) return `Player ${winner} wins!`;
    return winner === HUMAN_PLAYER ? 'You win!' : 'Computer wins';
  }

  if (!isVsComputer) return `Player ${currentPlayer}'s turn`;
  return currentPlayer === COMPUTER_PLAYER
    ? `Computer (${COMPUTER_PLAYER}) is thinking…`
    : `Your turn (${HUMAN_PLAYER})`;
}
