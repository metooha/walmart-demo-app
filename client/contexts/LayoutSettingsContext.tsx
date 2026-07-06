/**
 * LayoutSettingsContext
 *
 * Stores project-level layout preferences that persist across sessions.
 * Currently tracks `mobileFooter` — which component to render at mobile
 * breakpoints: the native-style BottomNav or the mobile-web MwebFooter.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type MobileFooterMode = 'native' | 'mweb';
export type MobileTopNavMode = 'native' | 'mweb';
export type PlatformMode = 'web' | 'ios' | 'android';
export type NavDesignMode = 'original' | 'exploration1';
export type MagicThemeMode = 'customer' | 'partner' | 'associate';

interface LayoutSettingsContextValue {
  /** Which footer/nav renders on mobile breakpoints in the Walmart app */
  mobileFooter: MobileFooterMode;
  setMobileFooter: (mode: MobileFooterMode) => void;
  /** Which top nav renders on mobile breakpoints in the Walmart app */
  mobileTopNav: MobileTopNavMode;
  setMobileTopNav: (mode: MobileTopNavMode) => void;
  /** Platform experience mode: web, iOS native, or Android native */
  platform: PlatformMode;
  setPlatform: (mode: PlatformMode) => void;
  /** Which top nav design variant to render (original or exploration1) */
  navDesign: NavDesignMode;
  setNavDesign: (mode: NavDesignMode) => void;
  /** Magic color palette persona */
  magicTheme: MagicThemeMode;
  setMagicTheme: (mode: MagicThemeMode) => void;
  /** Whether the bottom nav is currently visible (not hidden by scroll) */
  bottomNavVisible: boolean;
  setBottomNavVisible: (visible: boolean) => void;
  /** Whether the location callout is visible in DesktopHeader */
  showLocationCallout: boolean;
  setShowLocationCallout: (show: boolean) => void;
}

const LayoutSettingsContext = createContext<LayoutSettingsContextValue | undefined>(undefined);

const STORAGE_KEY = 'wcp-mobile-footer-mode';
const TOP_NAV_STORAGE_KEY = 'wcp-mobile-top-nav-mode';
const PLATFORM_STORAGE_KEY = 'wcp-platform-mode';
const NAV_DESIGN_STORAGE_KEY = 'wcp-nav-design';
const MAGIC_THEME_STORAGE_KEY = 'wcp-magic-theme';
const LOCATION_CALLOUT_STORAGE_KEY = 'wcp-location-callout';

export const MAGIC_THEME_TOKENS: Record<MagicThemeMode, { start: string; middle: string; stop: string; subtle: string }> = {
  customer: { start: '#0053E2', middle: '#3D90EC', stop: '#79CDF6', subtle: '#E9F1FE' },
  partner:  { start: '#0053E2', middle: '#A4FB6C', stop: '#79CDF6', subtle: '#F0FDE4' },
  associate: { start: '#FF6B00', middle: '#FFC220', stop: '#FFE066', subtle: '#FFF8E7' },
};

function applyMagicTheme(mode: MagicThemeMode) {
  const tokens = MAGIC_THEME_TOKENS[mode];
  const root = document.documentElement;
  root.style.setProperty('--ld-semantic-color-border-magic-start', tokens.start);
  root.style.setProperty('--ld-semantic-color-border-magic-middle', tokens.middle);
  root.style.setProperty('--ld-semantic-color-border-magic-stop', tokens.stop);
  root.style.setProperty('--ld-semantic-color-text-magic-start', tokens.start);
  root.style.setProperty('--ld-semantic-color-text-magic-middle', tokens.middle);
  root.style.setProperty('--ld-semantic-color-text-magic-stop', tokens.stop);
  root.style.setProperty('--ld-semantic-color-loading-magic', tokens.middle);
  root.style.setProperty('--ld-semantic-color-loading-magic-subtle', tokens.subtle);
}

function readStoredMagicTheme(): MagicThemeMode {
  try {
    const stored = localStorage.getItem(MAGIC_THEME_STORAGE_KEY);
    if (stored === 'customer' || stored === 'partner' || stored === 'associate') return stored;
  } catch { /* ignore */ }
  return 'customer';
}

function readStoredMode(): MobileFooterMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'mweb' || stored === 'native') return stored;
  } catch {
    // localStorage unavailable (SSR, private mode, etc.)
  }
  return 'native'; // default: native BottomNav
}

function readStoredTopNavMode(): MobileTopNavMode {
  try {
    const stored = localStorage.getItem(TOP_NAV_STORAGE_KEY);
    if (stored === 'mweb' || stored === 'native') return stored;
  } catch { /* ignore */ }
  return 'native';
}

function readStoredPlatform(): PlatformMode {
  try {
    const stored = localStorage.getItem(PLATFORM_STORAGE_KEY);
    if (stored === 'web' || stored === 'ios' || stored === 'android') return stored;
  } catch { /* ignore */ }
  return 'web';
}

function readStoredNavDesign(): NavDesignMode {
  try {
    const stored = localStorage.getItem(NAV_DESIGN_STORAGE_KEY);
    if (stored === 'original' || stored === 'exploration1') return stored;
  } catch { /* ignore */ }
  return 'original';
}

function readStoredLocationCallout(): boolean {
  try {
    const stored = localStorage.getItem(LOCATION_CALLOUT_STORAGE_KEY);
    if (stored !== null) return stored === 'true';
  } catch { /* ignore */ }
  return false;
}

export function LayoutSettingsProvider({ children }: { children: React.ReactNode }) {
  const [mobileFooter, setMobileFooterState] = useState<MobileFooterMode>(readStoredMode);
  const [mobileTopNav, setMobileTopNavState] = useState<MobileTopNavMode>(readStoredTopNavMode);
  const [platform, setPlatformState] = useState<PlatformMode>(readStoredPlatform);
  const [navDesign, setNavDesignState] = useState<NavDesignMode>(readStoredNavDesign);
  const [magicTheme, setMagicThemeState] = useState<MagicThemeMode>(readStoredMagicTheme);
  const [bottomNavVisible, setBottomNavVisible] = useState(true);
  const [showLocationCallout, setShowLocationCalloutState] = useState<boolean>(readStoredLocationCallout);

  // Apply magic theme tokens on mount to restore persisted choice
  useEffect(() => {
    applyMagicTheme(readStoredMagicTheme());
  }, []);

  const setMobileFooter = useCallback((mode: MobileFooterMode) => {
    setMobileFooterState(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore
    }
  }, []);

  const setMobileTopNav = useCallback((mode: MobileTopNavMode) => {
    setMobileTopNavState(mode);
    setMobileFooterState(mode);
    try {
      localStorage.setItem(TOP_NAV_STORAGE_KEY, mode);
      localStorage.setItem(STORAGE_KEY, mode);
    } catch { /* ignore */ }
  }, []);

  const setNavDesign = useCallback((mode: NavDesignMode) => {
    setNavDesignState(mode);
    try {
      localStorage.setItem(NAV_DESIGN_STORAGE_KEY, mode);
    } catch { /* ignore */ }
  }, []);

  const setMagicTheme = useCallback((mode: MagicThemeMode) => {
    setMagicThemeState(mode);
    applyMagicTheme(mode);
    try {
      localStorage.setItem(MAGIC_THEME_STORAGE_KEY, mode);
    } catch { /* ignore */ }
  }, []);

  const setPlatform = useCallback((mode: PlatformMode) => {
    setPlatformState(mode);
    try {
      localStorage.setItem(PLATFORM_STORAGE_KEY, mode);
    } catch { /* ignore */ }

    // Sync nav components to match the selected platform
    const navMode = mode === 'web' ? 'mweb' : 'native';
    setMobileFooterState(navMode);
    setMobileTopNavState(navMode);
    try {
      localStorage.setItem(STORAGE_KEY, navMode);
      localStorage.setItem(TOP_NAV_STORAGE_KEY, navMode);
    } catch { /* ignore */ }
  }, []);

  const setShowLocationCallout = useCallback((show: boolean) => {
    setShowLocationCalloutState(show);
    try {
      localStorage.setItem(LOCATION_CALLOUT_STORAGE_KEY, String(show));
    } catch { /* ignore */ }
  }, []);

  return (
    <LayoutSettingsContext.Provider value={{ mobileFooter, setMobileFooter, mobileTopNav, setMobileTopNav, platform, setPlatform, navDesign, setNavDesign, magicTheme, setMagicTheme, bottomNavVisible, setBottomNavVisible, showLocationCallout, setShowLocationCallout }}>
      {children}
    </LayoutSettingsContext.Provider>
  );
}

export function useLayoutSettings(): LayoutSettingsContextValue {
  const ctx = useContext(LayoutSettingsContext);
  if (!ctx) throw new Error('useLayoutSettings must be used inside <LayoutSettingsProvider>');
  return ctx;
}
