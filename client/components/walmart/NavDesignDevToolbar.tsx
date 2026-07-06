/**
 * NavDesignDevToolbar
 *
 * A floating dev-only toolbar triggered by pressing Escape twice within 400ms.
 * Lets you swap between nav designs (Original / Exploration 1) and platforms
 * without navigating to Project Settings.
 *
 * Press Esc+Esc to toggle open/closed.
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { useLayoutSettings, type NavDesignMode, type PlatformMode } from '@/contexts/LayoutSettingsContext';
import { useCart } from '@/contexts/CartContext';
import styles from './NavDesignDevToolbar.module.css';

const NAV_DESIGNS: { value: NavDesignMode; label: string }[] = [
  { value: 'original', label: 'Original' },
  { value: 'exploration1', label: 'Exploration 1' },
];

const PLATFORMS: { value: PlatformMode; label: string }[] = [
  { value: 'web', label: 'Web' },
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
];

export function NavDesignDevToolbar() {
  const { navDesign, setNavDesign, platform, setPlatform, showLocationCallout, setShowLocationCallout } = useLayoutSettings();
  const { cartCount, setItemQuantity } = useCart();
  const [open, setOpen] = useState(false);
  const lastEscTime = useRef<number>(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    const now = Date.now();
    if (now - lastEscTime.current < 400) {
      // Double-Esc — toggle toolbar
      e.preventDefault();
      setOpen((prev) => !prev);
      lastEscTime.current = 0;
    } else {
      lastEscTime.current = now;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-label="Nav Design Dev Toolbar">
      <div className={styles.toolbar}>
        <div className={styles.header}>
          <span className={styles.title}>Dev Toolbar</span>
          <span className={styles.hint}>Esc+Esc to close</span>
          <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close toolbar">
            ×
          </button>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Platform</span>
          <div className={styles.buttonRow}>
            {PLATFORMS.map((p) => (
              <button
                key={p.value}
                className={[styles.chip, platform === p.value ? styles.chipActive : ''].filter(Boolean).join(' ')}
                onClick={() => setPlatform(p.value)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Top Nav Design</span>
          <div className={styles.buttonRow}>
            {NAV_DESIGNS.map((d) => (
              <button
                key={d.value}
                className={[styles.chip, navDesign === d.value ? styles.chipActive : ''].filter(Boolean).join(' ')}
                onClick={() => setNavDesign(d.value)}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Callouts</span>
          <div className={styles.buttonRow}>
            <button
              className={[styles.chip, showLocationCallout ? styles.chipActive : ''].filter(Boolean).join(' ')}
              onClick={() => setShowLocationCallout(!showLocationCallout)}
            >
              Location Callout
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Cart Demo</span>
          <div className={styles.buttonRow}>
            <button
              className={styles.chip}
              onClick={() => setItemQuantity(9999, 1)}
            >
              Add Item
            </button>
            <button
              className={styles.chip}
              onClick={() => setItemQuantity(9999, 0)}
            >
              Clear Cart
            </button>
            <span className={styles.sectionLabel}>Badge: {cartCount}</span>
          </div>
        </div>

        <p className={styles.footer}>
          Active: <strong>{platform}</strong> · <strong>{navDesign === 'exploration1' ? 'Exploration 1' : 'Original'}</strong>
        </p>
      </div>
    </div>
  );
}
