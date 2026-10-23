import { useGameMode } from '../../hooks/useGameMode';
import { useGame } from '../../hooks/useGame';
import Board from '../Board/Board';
import GameToolbar from '../GameToolbar/GameToolbar';
import ModeSelect from '../ModeSelect/ModeSelect';
import styles from './Game.module.css';

/**
 * Container for the game feature.
 * Shows mode selection first, then the board once a mode is picked.
 */
function Game() {
  const { mode, hasSelectedMode, selectMode, clearMode } = useGameMode();

  if (!hasSelectedMode) {
    return <ModeSelect onSelect={selectMode} />;
  }

  // key={mode} remounts the session, so switching modes always starts a fresh board
  return <GameSession key={mode} mode={mode} onChangeMode={clearMode} />;
}

/** One game in a chosen mode: toolbar + board. */
function GameSession({ mode, onChangeMode }) {
  const { board } = useGame(mode);

  return (
    <div className={styles.session}>
      <GameToolbar mode={mode} onChangeMode={onChangeMode} />
      <Board squares={board} />
    </div>
  );
}

export default Game;
