import React, { useState, useRef } from 'react';
import { Camera, Microphone, ChevronLeft, Search, ChevronDown, Location, UserCircle } from '@/components/icons';
import { SearchTypeaheadModal } from '@/pages/walmart/index/SearchTypeaheadModal';
import { CameraModal } from '@/components/walmart/CameraModal';
import { SubNavButton } from '@/components/walmart/SubNavButton';
import { IconButton } from '@/components/ui/IconButton';
import { useNavigate } from 'react-router-dom';
import styles from './MobileTopNavExploration1.module.css';

export type MobileTopNavExploration1Variant = 'blue' | 'white';

interface MobileTopNavExploration1Props {
  variant?: MobileTopNavExploration1Variant;
  /** Title shown in the white/L1 variant header */
  pageTitle?: string;
}

const SUBNAV_CHIPS = [
  'Get it fast',
  'Rollbacks & More',
  '4th of July',
  'Electronics',
  'Grocery',
];

/**
 * Exploration 1 — iOS Top Nav
 *
 * Blue (home) variant:  solid blue bg, search pill with camera + mic icons,
 *                        account avatar, horizontally-scrollable subnav chips.
 * White (L1) variant:   gradient bg, back chevron, centered bold title, circular search button.
 */
export function MobileTopNavExploration1({
  variant = 'blue',
  pageTitle = 'Categories and Services',
}: MobileTopNavExploration1Props) {
  const navigate = useNavigate();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);

  // Drag-to-scroll for the subnav row
  const subNavRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

  function onSubNavMouseDown(e: React.MouseEvent) {
    const el = subNavRef.current;
    if (!el) return;
    dragState.current = { dragging: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
    el.style.cursor = 'grabbing';
  }

  function onSubNavMouseMove(e: React.MouseEvent) {
    if (!dragState.current.dragging) return;
    const el = subNavRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.2;
    el.scrollLeft = dragState.current.scrollLeft - walk;
  }

  function onSubNavMouseUp() {
    dragState.current.dragging = false;
    if (subNavRef.current) subNavRef.current.style.cursor = '';
  }

  const rootClass = variant === 'white'
    ? `${styles.root} ${styles.rootWhite}`
    : styles.root;

  return (
    <>
      <div className={rootClass}>
        {variant === 'blue' ? (
          /* ── Blue / Home variant ── */
          <>
            <div className={styles.searchRow}>
              {/* Search pill */}
              <div
                className={styles.searchPill}
                onClick={() => setShowSearchModal(true)}
                role="button"
                tabIndex={0}
                aria-label="Search Walmart"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowSearchModal(true); } }}
              >
                <span className={styles.searchPillText}>Search Walmart</span>
                <div className={styles.pillIcons}>
                  <button
                    className={styles.pillIconBtn}
                    aria-label="Camera search"
                    onClick={(e) => { e.stopPropagation(); setShowCameraModal(true); }}
                  >
                    <Camera className={styles.pillIcon} />
                  </button>
                  <button
                    className={styles.pillIconBtn}
                    aria-label="Voice search"
                    onClick={(e) => { e.stopPropagation(); setShowSearchModal(true); }}
                  >
                    <Microphone className={styles.pillIcon} />
                  </button>
                </div>
              </div>

              {/* Account icon button */}
              <IconButton
                aria-label="Account"
                variant="white"
                size="large"
                UNSAFE_className={styles.accountBtn}
              >
                <UserCircle />
              </IconButton>
            </div>

            {/* Subnav row */}
            <div
              ref={subNavRef}
              className={styles.subNavRow}
              onMouseDown={onSubNavMouseDown}
              onMouseMove={onSubNavMouseMove}
              onMouseUp={onSubNavMouseUp}
              onMouseLeave={onSubNavMouseUp}
            >
              {/* Location chip */}
              <SubNavButton
                variant="inverse"
                label="95829"
                leadingIcon={<Location width={16} height={16} />}
                trailingIcon={<ChevronDown width={16} height={16} />}
              />

              {/* Scrollable filter chips */}
              {SUBNAV_CHIPS.map((label) => (
                <SubNavButton
                  key={label}
                  variant="inverse"
                  label={label}
                />
              ))}
            </div>
          </>
        ) : (
          /* ── White / L1 variant ── */
          <div className={styles.titleRow}>
            {/* Back button */}
            <button
              className={styles.backButton}
              aria-label="Go back"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className={styles.backIcon} />
            </button>

            {/* Centered title */}
            <h1 className={styles.pageTitle}>{pageTitle}</h1>

            {/* Circular search button */}
            <button
              className={styles.searchCircleBtn}
              aria-label="Search"
              onClick={() => setShowSearchModal(true)}
            >
              <Search className={styles.searchCircleIcon} />
            </button>
          </div>
        )}
      </div>

      {showSearchModal && (
        <SearchTypeaheadModal
          onClose={() => setShowSearchModal(false)}
          onCameraClick={() => { setShowSearchModal(false); setShowCameraModal(true); }}
        />
      )}

      <CameraModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
      />
    </>
  );
}
