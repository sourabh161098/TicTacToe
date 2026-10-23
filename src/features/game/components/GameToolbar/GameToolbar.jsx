import { getModeTitle } from '../../constants';
import styles from './GameToolbar.module.css';

/** Bar above the board: shows the current mode and a way back to mode selection. */
function GameToolbar({ mode, onChangeMode }) {
  return (
    <div className={styles.toolbar}>
      <span className={styles.mode}>{getModeTitle(mode)}</span>
      <button type="button" className={styles.button} onClick={onChangeMode}>
        Change mode
      </button>
    </div>
  );
}

export default GameToolbar;
