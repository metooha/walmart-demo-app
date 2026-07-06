import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ProductDetailPage.module.css';
// Uploaded headphone product images
const H1 = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ff6356932f27a49a6b0d0ce382408c812?format=webp&width=800';
const H2 = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Ffeca49c3ffa846e0a5a39e45820558e4?format=webp&width=800';
const H3 = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F670b81a8fc1d423886287738312378ed?format=webp&width=800';
const H4 = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F204809fad5a54400ae8be865e2a7fb3d?format=webp&width=800';
const H5 = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F2ec7413e82c24bdab83851cf6f7ec2e8?format=webp&width=800';
const H6 = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F940d253a921044afb8593568ee1fef3e?format=webp&width=800';
const H7 = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fd72f30e97f3b45b5b1063542991510ac?format=webp&width=800';
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
import { Headphones } from '@/components/icons/Headphones';
import { Flash } from '@/components/icons/Flash';
import { Bluetooth } from '@/components/icons/Bluetooth';
import { Sound } from '@/components/icons/Sound';
import { ThumbUp } from '@/components/icons/ThumbUp';
import { ThumbDown } from '@/components/icons/ThumbDown';
import { Cart } from '@/components/icons/Cart';
import { Truck } from '@/components/icons/Truck';
import { Store } from '@/components/icons/Store';
import { Returns } from '@/components/icons/Returns';
import { Check } from '@/components/icons/Check';
import { OrderCardSwitcher } from '@/components/walmart/purchase-history/OrderCardSwitcher';
import { IconButton } from '@/components/ui/IconButton';
import { ChevronLeft } from '@/components/icons/ChevronLeft';
import { ChevronRight } from '@/components/icons/ChevronRight';

// ── Product data ──────────────────────────────────────────────────────────────
const PRODUCT = {
  id: 'arc-pro-x1',
  brand: 'Sonance',
  name: 'Arc Pro X1 Wireless Noise-Cancelling Headphones',
  rating: 4.5,
  reviewCount: 2847,
  price: 249.99,
  originalPrice: 349.99,
  savings: 100,
  savingsPct: 29,
  inStock: true,
  stockCount: 8,
  images: [H3, H1, H5, H4],
  colors: [
    { name: 'Matte Black', hex: '#1a1a1a' },
    { name: 'Pearl White', hex: '#f0f0f0' },
    { name: 'Midnight Blue', hex: '#1e3a5f' },
    { name: 'Rose Gold', hex: '#c8966e' },
  ],
  features: [
    { Icon: Headphones, title: 'Active Noise Cancellation', desc: 'Industry-leading 3-mic ANC eliminates up to 99% of ambient sound.' },
    { Icon: Flash, title: '40-Hour Battery Life', desc: 'Full-day listening on a single charge with 10-min quick charge.' },
    { Icon: Bluetooth, title: 'Bluetooth 5.3', desc: 'Multi-point connection to 2 devices simultaneously.' },
    { Icon: Sound, title: 'Hi-Res Audio', desc: '40mm dynamic drivers with LDAC codec support up to 96kHz.' },
  ],
  specs: [
    ['Driver Size', '40mm Dynamic'],
    ['Frequency Response', '20Hz – 20kHz'],
    ['Impedance', '32 Ohm'],
    ['Max SPL', '102 dB'],
    ['Bluetooth Version', '5.3'],
    ['Codec Support', 'SBC, AAC, aptX, LDAC'],
    ['ANC Reduction', 'Up to 40 dB'],
    ['Battery Life (ANC On)', '30 hours'],
    ['Battery Life (ANC Off)', '40 hours'],
    ['Quick Charge', '10 min → 3 hours'],
    ['Charging Port', 'USB-C'],
    ['Weight', '253 g'],
    ['Foldable', 'Yes'],
    ['Microphones', '6 (3 ANC + 3 call)'],
  ],
};

const REVIEWS = [
  {
    id: 1, author: 'Marcus T.', initials: 'MT', color: '#0071dc', rating: 5,
    date: 'Jan 12, 2025', verified: true,
    title: 'Best headphones I\'ve ever owned — period.',
    body: 'I\'ve tried Sony, Bose, and Apple — nothing comes close to the X1. The ANC is extraordinary. On a busy train commute, it\'s like flipping a silence switch. Sound quality is warm with just enough clarity. The build feels premium without being heavy.',
    helpful: 142,
  },
  {
    id: 2, author: 'Priya S.', initials: 'PS', color: '#7b2d8b', rating: 4,
    date: 'Dec 28, 2024', verified: true,
    title: 'Incredible sound, minor comfort issue after 4+ hours',
    body: 'The audio quality is genuinely stunning — I\'m a classically trained musician and the detail in the mids is remarkable. ANC is top-tier. My only gripe is slight clamping force that makes extended sessions uncomfortable. Otherwise a 5-star product.',
    helpful: 89,
  },
  {
    id: 3, author: 'Jordan K.', initials: 'JK', color: '#1a7a34', rating: 5,
    date: 'Feb 3, 2025', verified: true,
    title: 'Worth every single penny',
    body: 'I was hesitant at the price but these replaced my $400 pair effortlessly. Call quality is the best I\'ve experienced — colleagues constantly compliment the clarity. Build quality feels durable. The case is gorgeous too.',
    helpful: 67,
  },
];

const RELATED = [
  { id: 1, brand: 'NAQEHNV', name: 'Wireless Bluetooth Over Ear Headphones', price: 18.68, original: 20.98, img: H2 },
  { id: 2, brand: 'Beats by Dr. Dre', name: 'Beats Solo Buds Bluetooth In-Ear Headphones', price: 69.95, original: 89.95, img: H6 },
  { id: 3, brand: 'Sony', name: 'WF-C510 Truly Wireless Earbud Headphones', price: 69.99, original: 0, img: H7 },
  { id: 4, brand: 'Sennheiser', name: 'Accentum Wireless Bluetooth Headphones', price: 99.95, original: 0, img: H3 },
  { id: 5, brand: 'JBL', name: 'Tune 760NC Wireless Noise Cancelling Headphones', price: 49.95, original: 79.95, img: H1 },
  { id: 6, brand: 'Skullcandy', name: 'Hesh ANC Over-Ear Noise Cancelling Headphones', price: 59.99, original: 0, img: H4 },
  { id: 7, brand: 'Audio-Technica', name: 'ATH-M50x Professional Studio Headphones', price: 129.00, original: 149.00, img: H5 },
];

// Rating bar distribution
const RATING_BARS = [
  { stars: 5, count: 2140, pct: 75 },
  { stars: 4, count: 512, pct: 18 },
  { stars: 3, count: 114, pct: 4 },
  { stars: 2, count: 57, pct: 2 },
  { stars: 1, count: 24, pct: 1 },
];


// ── Component ─────────────────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const { t } = useTranslation('walmart');
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = useCallback((dir: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollAmt = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === 'left' ? -scrollAmt : scrollAmt, behavior: 'smooth' });
  }, []);

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
          <BreadcrumbItem href="/headphones">{t('pdp.headphones')}</BreadcrumbItem>
          <BreadcrumbItem href="/noise-cancelling">{t('pdp.noiseCancelling')}</BreadcrumbItem>
          <BreadcrumbItem isCurrent>{PRODUCT.name.split(' ')[0]} {PRODUCT.name.split(' ')[1]} {PRODUCT.name.split(' ')[2]}</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* ── Main Content ─────────────────────────────────────── */}
      <main className={styles.main}>
        <div className={styles.productGrid}>

          {/* ── Gallery ─────────────────────────────────── */}
          <div className={styles.gallery}>
            {/* Thumbnails */}
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

            {/* Main Image */}
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
                  style={{ background: c.hex, border: c.hex === '#f0f0f0' ? '2px solid #ddd' : undefined }}
                  onClick={() => setSelectedColor(i)}
                  aria-label={c.name}
                  title={c.name}
                />
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
                    {t('pdp.arrivesBy')} <span className={styles.deliveryHighlight}>Thursday, Mar 6</span> {t('pdp.withSonancePrime')}
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
              {[t('pdp.warranty'), t('pdp.refurbished'), t('pdp.priceMatch')].map(tx => (
                <div key={tx} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ld-semantic-color-text-subtle, #74767c)' }}>
                  <Check width={14} height={14} />
                  {tx}
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
                    The Arc Pro X1 redefines wireless audio. Engineered over three years in Sonance's acoustic labs,
                    it combines reference-grade sound quality with industry-leading noise cancellation — all in a
                    lightweight, premium chassis that's built to last.
                  </p>
                  <p>
                    Powered by 40mm dynamic drivers with bio-cellulose diaphragms, the X1 reproduces everything from
                    the deepest sub-bass to the most delicate high-frequency overtones with stunning accuracy. Whether
                    you're streaming lossless audio or in a video call, every detail is crystal clear.
                  </p>
                  <p>
                    The adaptive ANC system continuously monitors ambient noise 700 times per second, applying the
                    perfect counterwave in real time. Even in the loudest environments — planes, trains, open offices —
                    you'll hear only your music.
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
          <div className={styles.relatedWrapper}>
            <IconButton variant="secondary" aria-label="Scroll left" onClick={() => scrollCarousel('left')} UNSAFE_className={`${styles.carouselBtn} ${styles.carouselBtnLeft}`}><ChevronLeft /></IconButton>
            <div className={styles.relatedGrid} ref={carouselRef}>
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
            <IconButton variant="secondary" aria-label="Scroll right" onClick={() => scrollCarousel('right')} UNSAFE_className={`${styles.carouselBtn} ${styles.carouselBtnRight}`}><ChevronRight /></IconButton>
          </div>
        </div>

        {/* ── Your Services (Order Card Switcher) ─────────────── */}
        <OrderCardSwitcher />

      </main>

      {/* ── Walmart Footer ────────────────────────────────────── */}
      <DesktopFooter />
      <MwebFooter />
    </div>
  );
}
