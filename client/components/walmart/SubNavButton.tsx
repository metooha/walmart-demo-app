import type React from 'react';
import styles from './SubNavButton.module.css';

interface SubNavButtonProps {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  disabled?: boolean;
  variant?: 'default' | 'inverse';
}

export function SubNavButton({ label, href, onClick, leadingIcon, trailingIcon, disabled, variant = 'default' }: SubNavButtonProps) {
  const className = variant === 'inverse' ? `${styles.subNavButton} ${styles.subNavButtonInverse}` : styles.subNavButton;

  if (href && !disabled) {
    return (
      <a href={href} onClick={onClick} className={className}>
        {leadingIcon && <span className={styles.leadingIcon}>{leadingIcon}</span>}
        {label}
        {trailingIcon && <span className={styles.trailingIcon}>{trailingIcon}</span>}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {leadingIcon && <span className={styles.leadingIcon}>{leadingIcon}</span>}
      {label}
      {trailingIcon && <span className={styles.trailingIcon}>{trailingIcon}</span>}
    </button>
  );
}
