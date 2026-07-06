import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ProductDetailPage.module.css';

// Shoe product images (Pexels — replace with Builder CDN assets when available)
const S1 = 'https://images.pexels.com/photos/1461048/pexels-photo-1461048.jpeg?auto=compress&cs=tinysrgb&w=800';
const S2 = 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800';
const S3 = 'https://images.pexels.com/photos/30755567/pexels-photo-30755567.jpeg?auto=compress&cs=tinysrgb&w=800';
const S4 = 'https://images.pexels.com/photos/11292946/pexels-photo-11292946.jpeg?auto=compress&cs=tinysrgb&w=800';

import { Button } from '@/components/ui/Button';
import { Rating } from '@/components/ui/Rating';
import { Tag } from '@/components/ui/Tag';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tab';
import { DesktopHeader } from '@/components/walmart/DesktopHeader';
import { SubNav } from '@/components/walmart/SubNav';
import { MobileTopNav } from '@/components/walmart/MobileTopNav';
import { DesktopFooter } from '@/components/walmart/DesktopFooter';
import { MwebFooter } from '@/components/walmart/MwebFooter';
import { WCPHeartView } from '@/components/walmart/WCPHeartView';
import { WCPItemTile } from '@/components/walmart/WCPItemTile';
import { Chip } from '@/components/ui/Chip';
import { Shirt } from '@/components/icons/Shirt';
import { RulerArrow } from '@/components/icons/RulerArrow';
import { ShieldCheck } from '@/components/icons/ShieldCheck';
import { Spark } from '@/components/icons/Spark';
import { ThumbUp } from '@/components/icons/ThumbUp';
import { ThumbDown } from '@/components/icons/ThumbDown';
import { Cart } from '@/components/icons/Cart';
import { Truck } from '@/components/icons/Truck';
import { Store } from '@/components/icons/Store';
import { Returns } from '@/components/icons/Returns';
import { Check } from '@/components/icons/Check';

// ── Product data ──────────────────────────────────────────────────────────────
const PRODUCT = {
  id: 'stride-pro-x9',
  brand: 'Stride Athletics',
  name: 'Stride Pro X9 Lightweight Running Shoes',
  rating: 4.7,
  reviewCount: 3412,
  price: 89.99,
  originalPrice: 129.99,
  savings: 40,
  savingsPct: 31,
  inStock: true,
  stockCount: 14,
  images: [S1, S2, S3, S4],
  sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
  colors: [
    { name: 'Cloud White', hex: '#f5f5f5' },
    { name: 'Midnight Black', hex: '#1a1a1a' },
    { name: 'Ocean Blue', hex: '#1e4d8c' },
    { name: 'Coral Red', hex: '#d94f3d' },
  ],
  features: [
    { Icon: Spark, title: 'AeroFoam Cushioning', desc: 'Responsive foam midsole absorbs impact and returns energy with every stride.' },
    { Icon: RulerArrow, title: 'True-to-Size Fit', desc: 'Engineered mesh upper wraps your foot for a secure, sock-like fit.' },
    { Icon: Shirt, title: 'Breathable Mesh Upper', desc: '360° airflow technology keeps feet cool during long runs and workouts.' },
    { Icon: ShieldCheck, title: 'Durable Rubber Outsole', desc: 'High-abrasion rubber pods for superior grip on road and track surfaces.' },
  ],
  specs: [
    ['Category', 'Road Running'],
    ['Upper Material', 'Engineered Mesh'],
    ['Midsole', 'AeroFoam EVA'],
    ['Outsole', 'High-Abrasion Rubber'],
    ['Drop', '8mm'],
    ['Stack Height (Heel)', '28mm'],
    ['Stack Height (Forefoot)', '20mm'],
    ['Weight (Men\'s 9)', '8.2 oz / 232g'],
    ['Closure', 'Lace-Up'],
    ['Widths Available', 'Regular, Wide'],
    ['Recommended For', 'Neutral Runners'],
    ['Country of Origin', 'Vietnam'],
  ],
};

const REVIEWS = [
  {
    id: 1, author: 'Tyler M.', initials: 'TM', color: '#0071dc', rating: 5,
    date: 'Feb 8, 2025', verified: true,
    title: 'The most comfortable running shoe I\'ve ever worn.',
    body: 'I\'ve put 200 miles on these and they still feel great. The AeroFoam cushioning is genuinely impressive — my knees have been happier than ever on long runs. True to size, breathable, and the grip is solid even on wet pavement.',
    helpful: 218,
  },
  {
    id: 2, author: 'Keisha L.', initials: 'KL', color: '#7b2d8b', rating: 5,
    date: 'Jan 22, 2025', verified: true,
    title: 'Finally a running shoe that fits wide feet properly',
    body: 'I ordered the wide width and it\'s perfect. No pinching at the toe box, no slipping at the heel. I ran a half marathon in these two weeks after buying them and had zero blisters. Highly recommend for anyone with wider feet.',
    helpful: 134,
  },
  {
    id: 3, author: 'Marcus R.', initials: 'MR', color: '#1a7a34', rating: 4,
    date: 'Mar 1, 2025', verified: true,
    title: 'Great shoe, runs slightly narrow',
    body: 'Love the cushioning and the look. Only reason for 4 stars is that they run slightly narrow compared to my previous pair. If you\'re between sizes or have wide feet, size up. Otherwise an excellent shoe for daily training.',
    helpful: 89,
  },
];

const RELATED = [
  { id: 1, brand: 'Nike', name: 'Air Zoom Pegasus 41 Road Running Shoes', price: 119.99, original: 0, img: S2 },
  { id: 2, brand: 'Adidas', name: 'Ultraboost 22 Running Shoes', price: 99.95, original: 139.95, img: S3 },
  { id: 3, brand: 'New Balance', name: 'Fresh Foam X 1080v13 Running Shoes', price: 84.99, original: 109.99, img: S4 },
  { id: 4, brand: 'ASICS', name: 'Gel-Kayano 31 Stability Running Shoes', price: 109.95, original: 0, img: S1 },
];

const RATING_BARS = [
  { stars: 5, count: 2730, pct: 80 },
  { stars: 4, count: 512, pct: 15 },
  { stars: 3, count: 102, pct: 3 },
  { stars: 2, count: 41, pct: 1 },
  { stars: 1, count: 27, pct: 1 },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ShoesProductDetailPage() {
  const { t } = useTranslation('walmart');
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className={styles.page}>
      {/* ── Walmart Header (desktop) ───────────────────────── */}
      <DesktopHeader />
      <SubNav />

      {/* ── Walmart Header (mobile) ───────────────────────── */}
      <MobileTopNav variant="white" />

      {/* ── Breadcrumb ───────────────────────────────────────── */}
      <div className={styles.breadcrumbWrap}>
        <Breadcrumb>
          <BreadcrumbItem href="/">{t('pdp.home')}</BreadcrumbItem>
          <BreadcrumbItem href="/shoes">Shoes</BreadcrumbItem>
          <BreadcrumbItem href="/shoes/running">Running Shoes</BreadcrumbItem>
          <BreadcrumbItem isCurrent>{PRODUCT.name.split(' ').slice(0, 3).join(' ')}</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* ── Main Content ─────────────────────────────────────── */}
      <main className={styles.main}>
        <div className={styles.productGrid}>

          {/* ── Gallery ─────────────────────────────────── */}
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {PRODUCT.images.map((img, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${activeImage === i ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt={`Product view ${i + 1}`} />
                </button>
              ))}
            </div>

            <div className={styles.mainImageWrap}>
              <img
                src={PRODUCT.images[activeImage]}
                alt={PRODUCT.name}
              />
              <div className={styles.imageTag}>
                <Tag variant="primary" color="negative">
                  -{PRODUCT.savingsPct}% {t('pdp.off')}
                </Tag>
              </div>
              <div className={styles.wishlistBtnWrap}>
                <WCPHeartView
                  defaultActivated={false}
                  calloutPosition="left"
                  size="small"
                />
              </div>
            </div>
          </div>

          {/* ── Info Panel ───────────────────────────────── */}
          <div className={styles.info}>
            <div className={styles.infoBrand}>{PRODUCT.brand}</div>
            <h1 className={styles.infoTitle}>{PRODUCT.name}</h1>

            {/* Rating row */}
            <div className={styles.ratingRow}>
              <Rating value={PRODUCT.rating} size="large" />
              <span className={styles.ratingValue}>{PRODUCT.rating}</span>
              <button className={styles.ratingCount} onClick={() => setActiveTab('reviews')}>
                {PRODUCT.reviewCount.toLocaleString()} {t('pdp.reviews')}
              </button>
            </div>

            <div className={styles.divider} />

            {/* Price */}
            <div className={styles.priceRow}>
              <span className={styles.priceCurrent}>${PRODUCT.price.toFixed(2)}</span>
              <span className={styles.priceOriginal}>${PRODUCT.originalPrice.toFixed(2)}</span>
            </div>
            <div className={styles.savingsRow}>
              <Tag variant="success">{t('pdp.youSave')} ${PRODUCT.savings} ({PRODUCT.savingsPct}%)</Tag>
            </div>
            <div className={styles.stockBadge}>
              <span className={styles.stockDot} />
              {t('pdp.only')} {PRODUCT.stockCount} {t('pdp.leftInStock')}
            </div>

            <div className={styles.divider} />

            {/* Color Selector */}
            <div className={styles.selectorLabel}>
              {t('pdp.color')}: <span className={styles.selectorLabelValue}>{PRODUCT.colors[selectedColor].name}</span>
            </div>
            <div className={styles.colorOptions}>
              {PRODUCT.colors.map((c, i) => (
                <button
                  key={i}
                  className={`${styles.colorSwatch} ${selectedColor === i ? styles.colorSwatchActive : ''}`}
                  style={{ background: c.hex, border: c.hex === '#f5f5f5' ? '2px solid #ddd' : undefined }}
                  onClick={() => setSelectedColor(i)}
                  aria-label={c.name}
                  title={c.name}
                />
              ))}
            </div>

            {/* Size Selector */}
            <div className={styles.divider} />
            <div className={styles.selectorLabel}>
              Size (US): {selectedSize && <span className={styles.selectorLabelValue}>{selectedSize}</span>}
            </div>
            <div style={shoesStyles.sizeGrid}>
              {PRODUCT.sizes.map(size => (
                <Chip
                  key={size}
                  size="small"
                  selected={selectedSize === size}
                  onSelectedChange={() => setSelectedSize(size)}
                  aria-label={`Size ${size}`}
                >
                  {size}
                </Chip>
              ))}
            </div>

            <div className={styles.divider} />

            {/* Quantity */}
            <div className={styles.quantityRow}>
              <span className={styles.quantityLabel}>{t('pdp.qty')}:</span>
              <QuantityStepper
                variant="secondary"
                size="medium"
                defaultCount={1}
                maxQuantity={PRODUCT.stockCount}
                showTrashOnRemove={false}
                onChange={(n) => setQuantity(n)}
              />
            </div>

            {/* Action Buttons */}
            <div className={styles.actionsRow}>
              <div className={styles.btnAddToCart}>
                <Button
                  variant="primary"
                  size="large"
                  isFullWidth
                  onClick={handleAddToCart}
                  leading={<Cart width={18} height={18} />}
                >
                  {addedToCart ? t('pdp.added') : t('pdp.addToCart')}
                </Button>
              </div>
              <div className={styles.btnBuyNow}>
                <Button variant="secondary" size="large" isFullWidth>
                  {t('pdp.buyNow')}
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className={styles.deliveryCard}>
              <div className={styles.deliveryRow}>
                <div className={styles.deliveryIcon}>
                  <Truck width={18} height={18} />
                </div>
                <div className={styles.deliveryInfo}>
                  <div className={styles.deliveryTitle}>{t('pdp.free2DayDelivery')}</div>
                  <div className={styles.deliveryDetail}>
                    {t('pdp.arrivesBy')} <span className={styles.deliveryHighlight}>Thursday, Mar 13</span> with Walmart+
                  </div>
                </div>
              </div>
              <div className={styles.deliveryRow}>
                <div className={styles.deliveryIcon}>
                  <Store width={18} height={18} />
                </div>
                <div className={styles.deliveryInfo}>
                  <div className={styles.deliveryTitle}>{t('pdp.freeStorePickup')}</div>
                  <div className={styles.deliveryDetail}>{t('pdp.readyIn2Hours')}</div>
                </div>
              </div>
              <div className={styles.deliveryRow}>
                <div className={styles.deliveryIcon}>
                  <Returns width={18} height={18} />
                </div>
                <div className={styles.deliveryInfo}>
                  <div className={styles.deliveryTitle}>{t('pdp.free30DayReturns')}</div>
                  <div className={styles.deliveryDetail}>{t('pdp.noQuestionsAsked')}</div>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {['1-Year Warranty', 'Wide Sizes Available', 'Price-Match Guarantee'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ld-semantic-color-text-subtle, #74767c)' }}>
                  <Check width={14} height={14} />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ─────────────────────────────────────────────── */}
        <div className={styles.tabsSection}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabList>
              <Tab value="description">{t('pdp.overview')}</Tab>
              <Tab value="specs">{t('pdp.specifications')}</Tab>
              <Tab value="reviews">{t('pdp.reviews')} ({PRODUCT.reviewCount.toLocaleString()})</Tab>
            </TabList>

            {/* Description */}
            <TabPanel value="description" UNSAFE_className={styles.tabPanelContent}>
              <div className={styles.descSection}>
                <div className={styles.descText}>
                  <p>
                    The Stride Pro X9 is engineered for runners who demand more — more cushioning, more breathability,
                    and more miles without compromise. Whether you're training for your first 5K or chasing a marathon
                    PR, the X9 delivers the performance you need at every pace.
                  </p>
                  <p>
                    Our proprietary AeroFoam midsole technology provides responsive energy return with every footstrike,
                    while the engineered mesh upper keeps your foot cool and locked in from mile one to the finish line.
                    The high-abrasion rubber outsole offers reliable grip across all road conditions.
                  </p>
                  <p>
                    Available in regular and wide widths to accommodate all foot shapes. Designed for neutral runners
                    with moderate pronation, the X9 is your go-to shoe for everyday training and race day alike.
                  </p>
                </div>

                <div className={styles.featureList}>
                  {PRODUCT.features.map((f, i) => (
                    <div key={i} className={styles.featureItem}>
                      <div className={styles.featureIcon}>
                        <f.Icon width={16} height={16} />
                      </div>
                      <div className={styles.featureText}>
                        <strong>{f.title}</strong>
                        <span>{f.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>

            {/* Specs */}
            <TabPanel value="specs" UNSAFE_className={styles.tabPanelContent}>
              <div className={styles.specsGrid}>
                {PRODUCT.specs.map(([key, val]) => (
                  <React.Fragment key={key}>
                    <div className={styles.specKey}>{key}</div>
                    <div className={styles.specVal}>{val}</div>
                  </React.Fragment>
                ))}
              </div>
            </TabPanel>

            {/* Reviews */}
            <TabPanel value="reviews" UNSAFE_className={styles.tabPanelContent}>
              <div className={styles.reviewsHeader}>
                <div className={styles.reviewsSummary}>
                  <div className={styles.reviewsBigRating}>{PRODUCT.rating}</div>
                  <Rating value={PRODUCT.rating} size="large" />
                  <div className={styles.reviewsOutOf}>{t('pdp.outOf5')} · {PRODUCT.reviewCount.toLocaleString()} {t('pdp.reviews')}</div>
                </div>

                <div className={styles.reviewsBars}>
                  {RATING_BARS.map(r => (
                    <div key={r.stars} className={styles.reviewBarRow}>
                      <span className={styles.reviewBarLabel}>{r.stars} {t('pdp.stars')}</span>
                      <div className={styles.reviewBarTrack}>
                        <div className={styles.reviewBarFill} style={{ width: `${r.pct}%` }} />
                      </div>
                      <span className={styles.reviewBarCount}>{r.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.reviewList}>
                {REVIEWS.map(r => (
                  <div key={r.id} className={styles.reviewCard}>
                    <div className={styles.reviewCardHeader}>
                      <div className={styles.reviewAuthorRow}>
                        <div className={styles.reviewAvatar} style={{ background: r.color }}>
                          {r.initials}
                        </div>
                        <div>
                          <div className={styles.reviewAuthorName}>{r.author}</div>
                          <div className={styles.reviewDate}>{r.date}</div>
                        </div>
                      </div>
                      {r.verified && (
                        <Tag variant="success" color="positive">{t('pdp.verifiedPurchase')}</Tag>
                      )}
                    </div>

                    <Rating value={r.rating} size="small" />
                    <div className={styles.reviewTitle}>{r.title}</div>
                    <p className={styles.reviewBody}>{r.body}</p>

                    <div className={styles.reviewHelpful}>
                      <span>{t('pdp.helpful')}</span>
                      <Button
                        variant="tertiary"
                        size="small"
                        leading={<ThumbUp width={14} height={14} />}
                      >
                        {t('pdp.yes')} ({r.helpful})
                      </Button>
                      <Button
                        variant="tertiary"
                        size="small"
                        leading={<ThumbDown width={14} height={14} />}
                      >
                        {t('pdp.no')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
          </Tabs>
        </div>

        {/* ── Related Products ─────────────────────────────────── */}
        <div className={styles.relatedSection}>
          <h2 className={styles.sectionTitle}>{t('pdp.youMightAlsoLike')}</h2>
          <div className={styles.relatedGrid}>
            {RELATED.map(p => {
              const dollars = String(Math.floor(p.price));
              const cents = String(Math.round((p.price % 1) * 100)).padStart(2, '0');
              const isOnSale = p.original > 0;
              return (
                <WCPItemTile
                  key={p.id}
                  image={p.img}
                  name={p.name}
                  price={dollars}
                  cents={cents}
                  pricePrefix={isOnSale ? 'Now' : undefined}
                  originalPrice={isOnSale ? `$${p.original.toFixed(2)}` : undefined}
                  onAddToCart={() => {}}
                  addToCartShowLabel
                />
              );
            })}
          </div>
        </div>
      </main>

      {/* ── Walmart Footer ────────────────────────────────────── */}
      <DesktopFooter />
      <MwebFooter />
    </div>
  );
}

// ── Size grid layout ─────────────────────────────────────────────────────────
const shoesStyles = {
  sizeGrid: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
    marginTop: '8px',
  } as React.CSSProperties,
};
