import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services, ServicesFill, UserCircle, UserCircleFill } from '@/components/icons';
import {
  SparkyAnimation,
  GlassShop,
  GlassShopFill,
  WCPFavorites,
  WCPFavoritesFill,
  WCPSearchMenu,
  WCPSearchMenuFill,
  WCPShoppingBag,
  WCPShoppingBagFill,
} from '@/components/icons-custom';
import { useLayoutSettings, type PlatformMode } from '@/contexts/LayoutSettingsContext';
import { useCart } from '@/contexts/CartContext';
import styles from './BottomNav.module.css';

type TabId = 'shop' | 'heart' | 'user' | 'favorites' | 'search';

interface BottomNavProps {
  activeTab?: TabId;
  onTabChange?: (tab: TabId) => void;
  /** Renders in-flow (not fixed) for use inside a patterns/documentation page */
  contained?: boolean;
}

/* ── Original layout: 3 tabs ── */

const TAB_X: Record<string, string> = {
  shop: '-64px',
  heart: '0px',
  user: '64px',
};

const NAV_PATHS: Record<string, string | undefined> = {
  shop: '/walmart',
  heart: undefined,
  user: '/walmart/purchase-history',
};

/* ── Exploration 1 layout: 4 tabs ── */

const TAB_X_E1: Record<string, string> = {
  shop: '-56px',
  favorites: '0px',
  search: '56px',
};

const NAV_PATHS_E1: Record<string, string | undefined> = {
  shop: '/walmart',
  favorites: undefined,
  search: undefined,
};

export function BottomNav({ activeTab = 'shop', onTabChange, contained = false }: BottomNavProps) {
  const navigate = useNavigate();
  const { platform, navDesign, setBottomNavVisible } = useLayoutSettings();
  const { cartCount } = useCart();
  const isExploration1 = navDesign === 'exploration1';

  const [visualTab, setVisualTab] = useState<TabId>(activeTab);
  const [isMoving, setIsMoving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setVisualTab(activeTab);
  }, [activeTab]);

  // Nav always stays visible — no scroll-based hiding

  useEffect(() => {
    setBottomNavVisible(isVisible);
  }, [isVisible, setBottomNavVisible]);

  const handleTabClick = (tab: TabId) => {
    if (tab === visualTab) return;

    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    if (moveTimerRef.current) clearTimeout(moveTimerRef.current);

    setVisualTab(tab);
    setIsMoving(true);
    onTabChange?.(tab);

    moveTimerRef.current = setTimeout(() => setIsMoving(false), 400);

    const paths = isExploration1 ? NAV_PATHS_E1 : NAV_PATHS;
    const path = paths[tab];
    if (path) {
      navTimerRef.current = setTimeout(() => navigate(path), 320);
    }
  };

  const tabPositions = isExploration1 ? TAB_X_E1 : TAB_X;
  const indicatorX = tabPositions[visualTab] ?? tabPositions.shop;

  /* ── Exploration 1 nav ── */
  const exploration1Nav = (
    <div className={[
        styles.nav,
        !contained && !isVisible ? styles.navHidden : '',
        contained ? styles.navContained : '',
    ].filter(Boolean).join(' ')}>
      <div className={styles.navInner}>
        {/* Sparky button — LEFT */}
        <button className={styles.sparkyButtonE1} aria-label="Ask Sparky">
          <div className={styles.sparkyIcon}>
            <SparkyAnimation />
          </div>
        </button>

        {/* 3-tab pill */}
        <div className={styles.tabBarE1}>
          <div
            className={`${styles.indicatorE1} ${isMoving ? styles.indicatorMovingE1 : ''}`}
            style={{ transform: `translateX(${indicatorX})` }}
          />

          <button
            className={styles.tab}
            onClick={() => handleTabClick('shop')}
            aria-label="Shop"
          >
            {visualTab === 'shop'
              ? <GlassShopFill className={`${styles.tabIcon} ${styles.tabIconActive}`} />
              : <GlassShop className={`${styles.tabIcon} ${styles.tabIconInactive}`} />}
          </button>

          <button
            className={styles.tab}
            onClick={() => handleTabClick('favorites')}
            aria-label="Favorites"
          >
            {visualTab === 'favorites'
              ? <WCPFavoritesFill className={`${styles.tabIcon} ${styles.tabIconActive}`} />
              : <WCPFavorites className={`${styles.tabIcon} ${styles.tabIconInactive}`} />}
          </button>

          <button
            className={styles.tab}
            onClick={() => handleTabClick('search')}
            aria-label="Search"
          >
            {visualTab === 'search'
              ? <WCPSearchMenuFill className={`${styles.tabIcon} ${styles.tabIconActive}`} />
              : <WCPSearchMenu className={`${styles.tabIcon} ${styles.tabIconInactive}`} />}
          </button>
        </div>

        {/* Shopping bag button — RIGHT */}
        <button className={styles.sparkyButtonE1} aria-label="Cart" onClick={() => navigate('/cart')}>
          <div className={`${styles.bagIconWrap} ${cartCount > 0 ? styles.bagIconWrapActive : ''}`}>
            <WCPShoppingBag className={`${styles.bagIcon} ${styles.bagIconOutline}`} />
            <WCPShoppingBagFill className={`${styles.bagIcon} ${styles.bagIconSolid}`} />
            {cartCount > 0 && (
              <div className={styles.bagBadge}>
                {cartCount > 99 ? '99+' : cartCount}
              </div>
            )}
          </div>
        </button>
      </div>

      {platform === 'ios' && <div className={styles.homeIndicator} />}
      {platform === 'android' && <div className={styles.androidNavBar}>
        <div className={styles.androidGestureBar} />
      </div>}
    </div>
  );

  /* ── Original nav (3 tabs) ── */
  const originalNav = (
    <div className={[
        styles.nav,
        !contained && !isVisible ? styles.navHidden : '',
        contained ? styles.navContained : '',
    ].filter(Boolean).join(' ')}>
      <div className={styles.navInner}>
        <div className={styles.tabBar}>
            <div
              className={`${styles.indicator} ${isMoving ? styles.indicatorMoving : ''}`}
              style={{ transform: `translateX(${indicatorX})` }}
            />

            <button
              className={styles.tab}
              onClick={() => handleTabClick('shop')}
              aria-label="Shop"
            >
              {visualTab === 'shop'
                ? <GlassShopFill className={`${styles.tabIcon} ${styles.tabIconActive}`} />
                : <GlassShop className={`${styles.tabIcon} ${styles.tabIconInactive}`} />}
            </button>

            <button
              className={styles.tab}
              onClick={() => handleTabClick('heart')}
              aria-label="Services"
            >
              {visualTab === 'heart'
                ? <ServicesFill className={`${styles.tabIcon} ${styles.tabIconActive}`} />
                : <Services className={`${styles.tabIcon} ${styles.tabIconInactive}`} />}
            </button>

            <button
              className={styles.tab}
              onClick={() => handleTabClick('user')}
              aria-label="Account"
            >
              {visualTab === 'user'
                ? <UserCircleFill className={`${styles.tabIcon} ${styles.tabIconActive}`} />
                : <UserCircle className={`${styles.tabIcon} ${styles.tabIconInactive}`} />}
            </button>
          </div>

        <button className={styles.sparkyButton} aria-label="Ask Sparky">
            <div className={styles.sparkyIcon}>
              <SparkyAnimation />
            </div>
          </button>
      </div>

      {platform === 'ios' && <div className={styles.homeIndicator} />}
      {platform === 'android' && <div className={styles.androidNavBar}>
        <div className={styles.androidGestureBar} />
      </div>}
    </div>
  );

  const navEl = isExploration1 ? exploration1Nav : originalNav;

  if (contained) {
    return (
      <div className={styles.containedWrapper}>
        <div className={styles.fadeOverlayContained} />
        {navEl}
      </div>
    );
  }

  return (
    <>
      <div className={`${styles.fadeOverlay} ${!isVisible ? styles.fadeOverlayHidden : ''}`} />
      {navEl}
    </>
  );
}
