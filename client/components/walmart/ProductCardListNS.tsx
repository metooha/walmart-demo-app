import React from 'react';
import { WCPFlag } from './WCPFlag';
import { WCPRating } from './WCPRating';
import { Button } from '@/components/ui/Button';
import { MagicFill } from '@/components/icons/MagicFill';
import { FlashFill } from '@/components/icons/FlashFill';
import styles from './ProductCardListNS.module.css';

export interface ProductCardListNSProps {
  image: string;
  name: string;
  price: string;
  cents: string;
  cue?: string;
  rating?: number;
  ratingCount?: string;
  sponsored?: boolean;
  badge?: string;
  fulfillment?: string;
  deliveryLabel?: string;
  deliveryDay?: string;
  onGetItWith?: () => void;
  onAddToDelivery?: () => void;
}

export function ProductCardListNS({
  image,
  name,
  price,
  cents,
  cue,
  rating = 4,
  ratingCount = '2,415',
  sponsored,
  badge,
  fulfillment,
  deliveryLabel,
  deliveryDay,
  onGetItWith,
  onAddToDelivery,
}: ProductCardListNSProps) {
  // Split brand name (first word bold) from the rest of the name
  const spaceIdx = name.indexOf(' ');
  const brand = spaceIdx > 0 ? name.slice(0, spaceIdx) : name;
  const rest = spaceIdx > 0 ? name.slice(spaceIdx) : '';

  return (
    <div className={styles.card}>
      <div className={styles.productRow}>
        {/* Left column — image + optional sponsored label */}
        <div className={styles.leftCol}>
          {sponsored && <span className={styles.sponsored}>Sponsored</span>}
          <img src={image} className={styles.image} alt={name} />
        </div>

        {/* Right column — product details */}
        <div className={styles.rightCol}>
          {badge && (
            <div className={styles.badgeZone}>
              <WCPFlag variant="brand-subtle" label={badge} />
            </div>
          )}

          {/* Price */}
          <div className={styles.price}>
            <span className={styles.priceDollarSign}>$</span>
            <span className={styles.priceDollars}>{price}</span>
            <span className={styles.priceCents}>{cents}</span>
          </div>

          {/* Product name */}
          <p className={styles.name}>
            <span className={styles.nameBrand}>{brand}</span>
            {rest}
          </p>

          {/* Cue tip */}
          {cue && (
            <div className={styles.cue}>
              <MagicFill width={12} height={12} />
              {cue}
            </div>
          )}

          {/* Rating */}
          <div className={styles.ratingZone}>
            <WCPRating value={rating} size="small" count={ratingCount} />
          </div>

          {/* Fulfillment */}
          {fulfillment && (
            <p className={styles.fulfillment}>
              {fulfillment.includes('today') ? (
                <>
                  {fulfillment.replace('today', '')}
                  <span className={styles.fulfillmentBold}>today</span>
                </>
              ) : (
                fulfillment
              )}
            </p>
          )}
        </div>
      </div>

      {/* CTA buttons */}
      <div className={styles.ctaRow}>
        <Button
          variant="secondary"
          size="medium"
          isFullWidth
          leading={<FlashFill width={16} height={16} style={{ color: '#0053E2' }} />}
          subLabel={deliveryLabel}
          onClick={onGetItWith}
        >
          Get it with
        </Button>
        <Button
          variant="primary"
          size="medium"
          isFullWidth
          subLabel={deliveryDay}
          onClick={onAddToDelivery}
        >
          Add to delivery
        </Button>
      </div>
    </div>
  );
}
