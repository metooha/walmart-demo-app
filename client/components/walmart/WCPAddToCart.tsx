import React from 'react';
import { QuantityStepper, QuantityStepperSize } from '@/components/ui/QuantityStepper';
import styles from './WCPAddToCart.module.css';

export interface WCPAddToCartProps {
  /** Visual variant — primary (solid blue) or tertiary (bordered, transparent) */
  variant?: 'primary' | 'tertiary';
  /** Size of the stepper pill. Defaults to 'xsmall'. */
  size?: QuantityStepperSize;
  /** Current quantity count. 0 = show icon-only add button. */
  defaultCount?: number;
  /** Maximum allowed quantity */
  maxQuantity?: number;
  /** Disables the entire component */
  disabled?: boolean;
  /** Called whenever the quantity changes */
  onChange?: (count: number) => void;
  /** When true, shows the "Add" text label next to the + icon. Default false (icon-only). */
  showAddLabel?: boolean;
}

export function WCPAddToCart({
  variant = 'tertiary',
  size = 'xsmall',
  defaultCount = 0,
  maxQuantity,
  disabled = false,
  onChange,
  showAddLabel = false,
}: WCPAddToCartProps) {
  return (
    <div className={styles.hitArea}>
      <QuantityStepper
        variant={variant}
        size={size}
        showAddLabel={showAddLabel}
        showTrashOnRemove
        defaultCount={defaultCount}
        maxQuantity={maxQuantity}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}
