import { PLAYERS } from '../../constants';
import styles from './Mark.module.css';

/*
 * X and O drawn as SVG so they stay sharp at any size.
 * pathLength="1" normalizes each stroke's length, which lets the CSS
 * "draw-in" animation work the same for lines and the circle.
 */

function XMark() {
  return (
    <svg className={`${styles.mark} ${styles.x}`} viewBox="0 0 100 100" aria-hidden="true">
      <line className={styles.stroke} x1="20" y1="20" x2="80" y2="80" pathLength="1" />
      <line
        className={`${styles.stroke} ${styles.second}`}
        x1="80"
        y1="20"
        x2="20"
        y2="80"
        pathLength="1"
      />
    </svg>
  );
}

function OMark() {
  return (
    <svg className={`${styles.mark} ${styles.o}`} viewBox="0 0 100 100" aria-hidden="true">
      <circle className={styles.stroke} cx="50" cy="50" r="31" pathLength="1" />
    </svg>
  );
}

/** Renders the icon for a player's mark, or nothing for an empty square. */
function Mark({ player }) {
  if (player === PLAYERS.X) return <XMark />;
  if (player === PLAYERS.O) return <OMark />;
  return null;
}

export default Mark;
