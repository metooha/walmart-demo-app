import styles from './MobilePhoneMockup.module.css';

interface MobilePhoneMockupProps {
  /** Route to load inside the phone (e.g. "/pdp") */
  src: string;
  label?: string;
  hint?: string;
}

/**
 * Wraps a mobile route in a realistic iPhone-style frame.
 * Uses an iframe so viewport media queries render as true mobile width.
 */
export function MobilePhoneMockup({
  src,
  label = 'Mobile preview',
  hint = 'Press 0–9 to copy order card prompts to clipboard',
}: MobilePhoneMockupProps) {
  return (
    <div className={styles.canvas}>
      <p className={styles.label}>{label}</p>

      <div className={styles.phone} role="img" aria-label="iPhone mockup">
        <div className={`${styles.sideButton} ${styles.sideButtonSilent}`} aria-hidden />
        <div className={`${styles.sideButton} ${styles.sideButtonVolumeUp}`} aria-hidden />
        <div className={`${styles.sideButton} ${styles.sideButtonVolumeDown}`} aria-hidden />
        <div className={`${styles.sideButton} ${styles.sideButtonPower}`} aria-hidden />

        <div className={styles.screen}>
          <div className={styles.dynamicIsland} aria-hidden />
          <iframe
            className={styles.iframe}
            src={src}
            title={label}
            loading="eager"
          />
          <div className={styles.homeIndicator} aria-hidden />
        </div>
      </div>

      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
