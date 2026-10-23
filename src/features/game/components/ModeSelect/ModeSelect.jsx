import { MODE_OPTIONS } from '../../constants';
import styles from './ModeSelect.module.css';

/** First screen: lets the player choose how to play. */
function ModeSelect({ onSelect }) {
  return (
    <section className={styles.container} aria-labelledby="mode-select-heading">
      <h2 id="mode-select-heading" className={styles.heading}>
        Choose a mode
      </h2>

      <div className={styles.options}>
        {MODE_OPTIONS.map(({ mode, title, description }) => (
          <button
            key={mode}
            type="button"
            className={styles.option}
            onClick={() => onSelect(mode)}
          >
            <span className={styles.title}>{title}</span>
            <span className={styles.description}>{description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default ModeSelect;
