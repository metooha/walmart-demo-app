import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/Tag';
import { DesktopHeader } from '@/components/walmart/DesktopHeader';
import { MobileHeader } from '@/components/walmart/MobileHeader';
import { MobileTopNav, type MobileTopNavVariant } from '@/components/walmart/MobileTopNav';
import { MobileTopNavExploration1, type MobileTopNavExploration1Variant } from '@/components/walmart/MobileTopNavExploration1';
import { NativeStatusBar } from '@/components/walmart/NativeStatusBar';
import styles from './TopNav.module.css';

type Platform = 'dweb' | 'mweb' | 'native';
type NavDesign = 'original' | 'exploration1';

const PLATFORM_META: Record<Platform, {
  component: string;
  tag: string;
  tagVariant: 'info' | 'success' | 'neutral';
  description: string;
}> = {
  dweb: {
    component: 'Desktop Top Nav',
    tag: '≥ 1024px',
    tagVariant: 'info',
    description: 'Full desktop header with Walmart logo, search bar, account dropdown, and primary navigation links. Renders on screens 1024px and wider.',
  },
  mweb: {
    component: 'Mobile Top Nav',
    tag: '< 1024px',
    tagVariant: 'success',
    description: 'Compact mobile header with hamburger menu, Walmart logo, search icon, and cart/account actions. Designed for screens narrower than 1024px.',
  },
  native: {
    component: 'Native Top Nav — Original',
    tag: 'iOS / Android',
    tagVariant: 'neutral',
    description: 'Native app-style top nav with menu icon, Walmart spark, search pill, and cart. Supports blue (home) and white (search/inner) color variants.',
  },
};

const EXPLORATION1_META = {
  component: 'Native Top Nav — Exploration 1',
  tag: 'iOS',
  tagVariant: 'neutral' as const,
  description: 'Refined iOS top nav with a white-to-light-blue gradient background. Blue/Home: bordered blue search pill with camera + mic icons and account avatar. White/L1: back chevron, centered bold page title, and a circular frosted-glass search button.',
};

/** Minimal phone shell used inside the component page preview */
function PhoneShell({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className={styles.phoneWrap}>
      {label && <p className={styles.phoneLabel}>{label}</p>}
      <div className={styles.nativePhone}>
        <div className={styles.nativeScreen}>
          {children}
          <div className={styles.nativePageContent}>
            <p className={styles.nativePageHint}>Page content area</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TopNavPage() {
  const [platform, setPlatform] = useState<Platform>('native');
  const [navDesign, setNavDesign] = useState<NavDesign>('exploration1');
  const [nativeVariant, setNativeVariant] = useState<MobileTopNavVariant>('blue');
  const [exp1Variant, setExp1Variant] = useState<MobileTopNavExploration1Variant>('blue');

  const isNative = platform === 'native';
  const isExploration1 = isNative && navDesign === 'exploration1';
  const meta = isExploration1 ? EXPLORATION1_META : PLATFORM_META[platform];

  return (
    <ComponentPageLayout
      section="WCP Patterns"
      title="Top Nav"
      description="WCP top navigation patterns for desktop web, mobile web, and native apps. All share the same Walmart brand identity and navigation hierarchy."
    >

      {/* ── Platform Component Preview ── */}
      <div className={styles.previewSection}>
        <div className={styles.previewHeader}>
          <h2 className={styles.previewTitle}>Component preview</h2>
          <ButtonGroup>
            <Button
              variant={platform === 'dweb' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('dweb')}
            >
              Desktop Top Nav
            </Button>
            <Button
              variant={platform === 'mweb' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('mweb')}
            >
              Mobile Top Nav
            </Button>
            <Button
              variant={platform === 'native' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setPlatform('native')}
            >
              Native Top Nav
            </Button>
          </ButtonGroup>
        </div>

        {/* Meta row */}
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>{meta.component}</span>
          <Tag variant={meta.tagVariant}>{meta.tag}</Tag>
          <p className={styles.metaDesc}>{meta.description}</p>
        </div>

        {/* Component frame */}
        <div className={styles.frame}>
          {platform === 'dweb' && (
            <div className={styles.dwebFrame}>
              <DesktopHeader />
            </div>
          )}

          {platform === 'mweb' && (
            <div className={styles.mwebFrame}>
              <MobileHeader />
            </div>
          )}

          {platform === 'native' && (
            <div className={styles.nativeFrame}>

              {/* Design variant switcher */}
              <div className={styles.nativeVariantSwitcher}>
                <p className={styles.nativeVariantLabel}>Design:</p>
                <ButtonGroup>
                  <Button
                    variant={navDesign === 'original' ? 'primary' : 'secondary'}
                    size="small"
                    onClick={() => setNavDesign('original')}
                  >
                    Original
                  </Button>
                  <Button
                    variant={navDesign === 'exploration1' ? 'primary' : 'secondary'}
                    size="small"
                    onClick={() => setNavDesign('exploration1')}
                  >
                    Exploration 1
                  </Button>
                </ButtonGroup>
              </div>

              {/* ── Original: single phone + color switcher ── */}
              {navDesign === 'original' && (
                <>
                  <PhoneShell label={nativeVariant === 'blue' ? 'Blue — Home' : 'White — Search'}>
                    <NativeStatusBar platform="ios" />
                    <MobileTopNav variant={nativeVariant} showHomeExtras={nativeVariant === 'blue'} />
                  </PhoneShell>
                  <div className={styles.nativeVariantSwitcher}>
                    <p className={styles.nativeVariantLabel}>Color variant:</p>
                    <ButtonGroup>
                      <Button
                        variant={nativeVariant === 'blue' ? 'primary' : 'secondary'}
                        size="small"
                        onClick={() => setNativeVariant('blue')}
                      >
                        Blue (Home)
                      </Button>
                      <Button
                        variant={nativeVariant === 'white' ? 'primary' : 'secondary'}
                        size="small"
                        onClick={() => setNativeVariant('white')}
                      >
                        White (Search)
                      </Button>
                    </ButtonGroup>
                  </div>
                </>
              )}

              {/* ── Exploration 1: two phones side-by-side ── */}
              {navDesign === 'exploration1' && (
                <>
                  <div className={styles.phoneDuo}>
                    <PhoneShell label="Blue — Home">
                      <NativeStatusBar platform="ios" />
                      <MobileTopNavExploration1 variant="blue" />
                    </PhoneShell>
                    <PhoneShell label="White — L1 Page">
                      <NativeStatusBar platform="ios" />
                      <MobileTopNavExploration1 variant="white" pageTitle="Categories and Services" />
                    </PhoneShell>
                  </div>
                  <div className={styles.exp1Callout}>
                    <span className={styles.exp1CalloutIcon}>✦</span>
                    <span>Gradient background, blue-bordered search pill (camera + mic), account avatar, and frosted-glass search button on L1 pages.</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Usage table ── */}
      <div className={styles.usageSection}>
        <h2 className={styles.usageTitle}>Import Reference</h2>
        <div className={styles.usageTable}>
          <div className={styles.usageRowHeader}>
            <span>Component</span>
            <span>Usage</span>
            <span>Import path</span>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>Desktop Top Nav</span>
              <Tag variant="info">≥ 1024px</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<DesktopHeader />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/DesktopHeader</span>
            </div>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>Mobile Top Nav</span>
              <Tag variant="success">{'< 1024px'}</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<MobileHeader />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/MobileHeader</span>
            </div>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>Native Top Nav — Original</span>
              <Tag variant="neutral">iOS / Android</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<MobileTopNav variant="blue" />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/MobileTopNav</span>
            </div>
          </div>
          <div className={styles.usageRow}>
            <div className={styles.usageCell}>
              <span className={styles.usagePlatform}>Native Top Nav — Exploration 1</span>
              <Tag variant="neutral">iOS</Tag>
            </div>
            <div className={styles.usageCell}>
              <code className={styles.usageCode}>{'<MobileTopNavExploration1 variant="blue" />'}</code>
            </div>
            <div className={styles.usageCell}>
              <span className={styles.usageImport}>@/components/walmart/MobileTopNavExploration1</span>
            </div>
          </div>
        </div>

        <div className={styles.noteBox}>
          <strong>Responsive pairing:</strong> <code>DesktopHeader</code> and <code>MobileHeader</code> each manage their own breakpoint visibility via CSS — render both and the correct one will display automatically. <code>MobileTopNav</code> supports <code>variant=&quot;blue&quot;</code> (home) and <code>variant=&quot;white&quot;</code> (search/inner pages). <code>MobileTopNavExploration1</code> is an exploration variant — swap between designs using the <strong>Design</strong> toggle above. Press <strong>Esc + Esc</strong> anywhere in the app to switch nav designs globally.
        </div>
      </div>
    </ComponentPageLayout>
  );
}
