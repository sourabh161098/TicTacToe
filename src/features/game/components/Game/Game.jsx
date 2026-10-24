import { useGameMode } from '../../hooks/useGameMode';
import { useGame } from '../../hooks/useGame';
import { useScoreboard } from '../../hooks/useScoreboard';
import Board from '../Board/Board';
import GameControls from '../GameControls/GameControls';
import GameStatus from '../GameStatus/GameStatus';
import GameToolbar from '../GameToolbar/GameToolbar';
import ModeSelect from '../ModeSelect/ModeSelect';
import MoveHistory from '../MoveHistory/MoveHistory';
import Scoreboard from '../Scoreboard/Scoreboard';
import styles from './Game.module.css';

/**
 * Container for the game feature.
 * Shows mode selection first, then the game once a mode is picked.
 * The scoreboard lives here, above the session, so it survives Reset Game and mode changes.
 */
function Game() {
  const { mode, hasSelectedMode, selectMode, clearMode } = useGameMode();
  const { scores, recordResult, resetScores } = useScoreboard();

  if (!hasSelectedMode) {
    return <ModeSelect onSelect={selectMode} />;
  }

  return (
    <div className={styles.session}>
      <GameToolbar mode={mode} onChangeMode={clearMode} />
      <Scoreboard scores={scores} mode={mode} onReset={resetScores} />
      {/* key={mode} remounts the session, so switching modes always starts a fresh game */}
      <GameSession key={mode} mode={mode} onGameEnd={recordResult} />
    </div>
  );
}

/** One game in a chosen mode: status, board, controls, and move history. */
function GameSession({ mode, onGameEnd }) {
  const {
    board,
    moves,
    winningLine,
    isGameOver,
    canPlay,
    canUndo,
    statusMessage,
    handleSquareClick,
    undo,
    resetGame,
  } = useGame(mode, onGameEnd);

  return (
    <>
      <GameStatus message={statusMessage} isGameOver={isGameOver} />
      <Board
        squares={board}
        winningLine={winningLine}
        canPlay={canPlay}
        onSquareClick={handleSquareClick}
      />
      <GameControls
        canUndo={canUndo}
        onUndo={undo}
        onReset={resetGame}
        isGameOver={isGameOver}
      />
      <MoveHistory moves={moves} />
    </>
  );
}

export default Game;
