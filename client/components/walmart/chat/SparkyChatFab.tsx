import React from 'react';
import styles from './SparkyChatFab.module.css';
import { SparkyAnimation } from '@/components/icons-custom/SparkyAnimation';

export interface SparkyChatFabProps {
  onClick: () => void;
}

/**
 * Floating action button that launches the "Ask Sparky" chat bottom sheet.
 * Uses the exact BottomNav Sparky button treatment, sized for desktop (64px).
 * Hidden on mobile where BottomNav already exposes Sparky.
 */
export function SparkyChatFab({ onClick }: SparkyChatFabProps) {
  return (
    <button
      type="button"
      className={styles.fab}
      onClick={onClick}
      aria-label="Ask Sparky"
    >
      <div className={styles.sparkyIcon}>
        <SparkyAnimation />
      </div>
    </button>
  );
}

export default SparkyChatFab;
