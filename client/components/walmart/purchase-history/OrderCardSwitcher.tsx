import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AutoCareOrderCard } from './AutoCareOrderCard';
import { CurbsideOrderCard } from './CurbsideOrderCard';
import { CombinedOrderCard } from './CombinedOrderCard';
import { DelayedDeliveryCard } from './DelayedDeliveryCard';
import { MaintenanceHealthCard } from './MaintenanceHealthCard';
import { AutoCareUpsellOfferCard } from './AutoCareUpsellOfferCard';
import { ServicesCard, type ServiceEntry } from './ServicesCard';
import { PharmacyModals, type PharmacyModalType } from './PharmacyModals';
import { OpticalModals, type OpticalModalType } from './OpticalModals';
import { BakeryModals, type BakeryModalType } from './BakeryModals';
import { AutoCareModals, type AutoCareModalType } from './AutoCareModals';
import { ACTIVE_PATTERN_INDEX } from './activePattern';
import { ChevronLeft, ChevronRight } from '@/components/icons';
import styles from './OrderCardSwitcher.module.css';

// ── Shared image helpers ──────────────────────────────────────────────────────
const CDN = 'https://cdn.builder.io/api/v1/image/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F';
function img(hash: string, alt: string) {
  return { src: `${CDN}${hash}?format=webp&width=400`, alt };
}

const P = {
  milk:         img('4275c57e09134f118110d61ffaed7f3e', 'Great Value Whole Milk'),
  eggs:         img('78ef20205e3c4c4d89a0402b3651cfaf', 'Great Value Cage Free Eggs'),
  bananas:      img('3722ac211f454e0e981b44c68bd71f32', 'Organic Bananas'),
  avocado:      img('5d243d5fa5384060878d8e665e30b97a', 'Avocado'),
  blueberries:  img('23fbfba8c5334a6e97499ee2bcbdeeed', 'Blueberries'),
  strawberries: img('182fe6cfc6cc4e94935dbbe85d069c17', 'Strawberries'),
};

// ── Shared demo data ──────────────────────────────────────────────────────────
const AUTO_CARE_CARD = {
  orderType: 'auto' as const,
  location: 'Carrollton Supercenter at 1213 Trinity Mills Rd',
  statusHeading: 'Sat, Mar 7, 10:00am–11:00am',
  products: [],
  serviceDetails: {
    vehicle: '2019 Toyota Camry',
    services: ['Conventional Oil & Filter Change', 'Tire Rotation'],
    serviceItems: [
      {
        name: 'Conventional Oil & Filter Change',
        variant: 'Conventional oil - Pennzoil',
        price: '$29.88',
        capacity: 'Up to 5 qts.',
        notes: ['Additional charges may apply if more oil is needed.'],
      },
      {
        name: 'Tire Rotation',
        variant: 'Standard 4-tire rotation',
        price: '$14.88',
        notes: ['Includes inspection of tread depth and tire pressure.'],
      },
    ],
    appointmentContact: 'Marcus Johnson',
    storePhone: '(972) 466-2228',
    storeHours: '7am to 7pm',
    serviceInstructions: 'Please check the cabin air filter as well.',
  },
  orderTotal: '$89.88',
  actions: [
    { label: 'Check in', variant: 'primary' as const },
    { label: 'Reschedule', variant: 'secondary' as const },
    { label: 'View details', variant: 'secondary' as const },
  ],
};

const CURBSIDE_CARD = {
  orderType: 'curbside' as const,
  location: 'Carrollton Supercenter at 1213 Trinity Mills Rd',
  statusHeading: 'Sat, Mar 7, 12:00pm–1:00pm',
  timelineStep: 'placed' as const,
  timelineVariant: 'pickup' as const,
  addItemsBanner: '1hr 20min left to add to your order',
  products: [P.milk, P.eggs, P.bananas, P.avocado],
  orderTotal: '$85.00',
  actions: [
    { label: 'Get it now', variant: 'primary' as const },
    { label: 'Edit items', variant: 'secondary' as const },
    { label: 'View details', variant: 'secondary' as const },
  ],
};

// ── Service data ──────────────────────────────────────────────────────────────
const SERVICES_URGENCY: ServiceEntry[] = [
  {
    id: 'rx-ready',
    serviceType: 'PHARMACY',
    serviceLabel: 'Prescription',
    status: 'READY_FOR_PICKUP',
    microcopy: 'Amoxicillin 500mg · ready since 9:15am',
    pickupLocation: 'Oak Lawn Supercenter',
    pickupDate: '2026-03-05',
    activeStep: 2,
    detail: {
      pickupWindow: 'Today until 9:00pm',
      referenceId: 'Rx #4428710',
      provider: 'Dr. Sarah Chen',
      plan: 'Walmart Health Insurance',
    },
  },
  {
    id: 'auto-in-progress',
    serviceType: 'AUTO',
    serviceLabel: 'Auto Care',
    status: 'IN_PROGRESS',
    microcopy: 'Oil change in progress',
    pickupLocation: 'Oak Lawn Supercenter',
    activeStep: 2,
    detail: {
      scheduledTime: 'Sat, Mar 7, 10:00am–11:00am',
      vehicle: '2019 Toyota Camry',
      note: 'Est. 45 min remaining',
    },
  },
  {
    id: 'optical-scheduled',
    serviceType: 'OPTICAL',
    serviceLabel: 'Optical',
    status: 'SCHEDULED',
    microcopy: 'Pickup: Mon, Mar 10',
    pickupLocation: 'Oak Lawn Supercenter',
    pickupDate: '2026-03-10',
    activeStep: 0,
    detail: {
      referenceId: 'Order #OPT-88214',
      provider: 'Dr. James Park',
      pickupWindow: 'Mon, Mar 10, 9:00am–8:00pm',
      note: 'Progressive lenses — 7–10 business days',
    },
  },
];

const SERVICES_ALL_EXPANDED: ServiceEntry[] = [
  {
    id: 'rx-ready',
    serviceType: 'PHARMACY',
    serviceLabel: 'Prescription',
    status: 'READY_FOR_PICKUP',
    microcopy: 'Lisinopril 10mg · ready since 8:30am',
    pickupLocation: 'Carrollton Supercenter',
    pickupDate: '2026-03-05',
    activeStep: 2,
    detail: {
      pickupWindow: 'Today until 9:00pm',
      referenceId: 'Rx #3317204',
      provider: 'Dr. Maria Lopez',
    },
  },
  {
    id: 'auto-in-progress',
    serviceType: 'AUTO',
    serviceLabel: 'Auto Care',
    status: 'IN_PROGRESS',
    microcopy: 'Tire rotation — est. 45 min remaining',
    pickupLocation: 'Carrollton Supercenter',
    activeStep: 2,
    detail: {
      scheduledTime: 'Sat, Mar 7, 2:00pm–3:00pm',
      vehicle: '2021 Honda CR-V',
    },
  },
  {
    id: 'optical-scheduled',
    serviceType: 'OPTICAL',
    serviceLabel: 'Optical',
    status: 'SCHEDULED',
    microcopy: 'Contact lens pickup: Mon, Mar 10',
    pickupLocation: 'Carrollton Supercenter',
    pickupDate: '2026-03-10',
    activeStep: 0,
    detail: {
      referenceId: 'Order #OPT-55102',
      pickupWindow: 'Mon, Mar 10, 9:00am–8:00pm',
      provider: 'Dr. James Park',
    },
  },
  {
    id: 'cake-cancelled',
    serviceType: 'BAKERY',
    serviceLabel: 'Custom Cake',
    status: 'CANCELLED',
    microcopy: 'Order cancelled on Mar 3',
    activeStep: 0,
    detail: {
      referenceId: 'Order #BK-40091',
      note: 'Refund of $34.99 issued to Visa ending 4821',
    },
  },
];

const SERVICES_SINGLE_RX: ServiceEntry[] = [
  {
    id: 'rx-ready',
    serviceType: 'PHARMACY',
    serviceLabel: 'Prescription',
    status: 'READY_FOR_PICKUP',
    microcopy: 'Metformin 1000mg · ready since 10:00am',
    pickupLocation: 'Irving Supercenter',
    pickupDate: '2026-03-05',
    activeStep: 2,
    detail: {
      pickupWindow: 'Today until 9:00pm',
      referenceId: 'Rx #5590123',
      provider: 'Dr. Angela Reeves',
      plan: 'Walmart Health+',
    },
  },
];

const SERVICES_MULTI_STORE: ServiceEntry[] = [
  {
    id: 'rx-ready-store1',
    serviceType: 'PHARMACY',
    serviceLabel: 'Prescription',
    status: 'READY_FOR_PICKUP',
    microcopy: 'Oak Lawn Supercenter · ready since 9:00am',
    pickupLocation: 'Oak Lawn Supercenter',
    pickupDate: '2026-03-05',
    activeStep: 2,
    detail: {
      pickupWindow: 'Today until 9:00pm',
      referenceId: 'Rx #7712045',
      provider: 'Dr. David Kim',
    },
  },
  {
    id: 'optical-scheduled-store2',
    serviceType: 'OPTICAL',
    serviceLabel: 'Optical',
    status: 'SCHEDULED',
    microcopy: 'Carrollton Supercenter · pickup Mar 10',
    pickupLocation: 'Carrollton Supercenter',
    pickupDate: '2026-03-10',
    activeStep: 0,
    detail: {
      referenceId: 'Order #OPT-33187',
      pickupWindow: 'Mon, Mar 10, 9:00am–8:00pm',
      provider: 'Dr. Lisa Tran',
      note: 'Anti-reflective coating — allow 7–10 days',
    },
  },
  {
    id: 'auto-processing-store1',
    serviceType: 'AUTO',
    serviceLabel: 'Auto Care',
    status: 'PROCESSING',
    microcopy: 'Oak Lawn Supercenter · submitted today',
    pickupLocation: 'Oak Lawn Supercenter',
    activeStep: 1,
    detail: {
      scheduledTime: 'Today, 3:30pm–4:30pm',
      vehicle: '2020 Ford F-150',
      note: 'Checked in — waiting for bay',
    },
  },
];

// ── ServicesCard wrapper with modal state ─────────────────────────────────────
interface ServicesCardWithModalsProps {
  services: ServiceEntry[];
  defaultExpanded?: boolean;
  defaultExpandedRowId?: string;
}

function getPharmacyActions(
  svc: ServiceEntry,
  open: (type: PharmacyModalType, svc: ServiceEntry) => void,
) {
  switch (svc.status) {
    case 'READY_FOR_PICKUP':
      return [
        { label: 'Pick up', variant: 'primary' as const, onClick: () => open('pickup', svc) },
        { label: 'Transfer Rx', variant: 'secondary' as const, onClick: () => open('transferRx', svc) },
        { label: 'View details', variant: 'secondary' as const, onClick: () => open('viewDetails', svc) },
      ];
    default:
      return [
        { label: 'View details', variant: 'primary' as const, onClick: () => open('viewDetails', svc) },
      ];
  }
}

function getOpticalActions(
  svc: ServiceEntry,
  open: (type: OpticalModalType, svc: ServiceEntry) => void,
) {
  switch (svc.status) {
    case 'READY_FOR_PICKUP':
      return [
        { label: 'Pick up', variant: 'primary' as const, onClick: () => open('pickup', svc) },
        { label: 'View details', variant: 'secondary' as const, onClick: () => open('viewDetails', svc) },
      ];
    case 'SCHEDULED':
      return [
        { label: 'Reschedule', variant: 'primary' as const, onClick: () => open('reschedule', svc) },
        { label: 'View details', variant: 'secondary' as const, onClick: () => open('viewDetails', svc) },
      ];
    default:
      return [
        { label: 'View details', variant: 'primary' as const, onClick: () => open('viewDetails', svc) },
      ];
  }
}

function getBakeryActions(
  svc: ServiceEntry,
  open: (type: BakeryModalType, svc: ServiceEntry) => void,
) {
  switch (svc.status) {
    case 'READY_FOR_PICKUP':
      return [
        { label: 'Pick up', variant: 'primary' as const, onClick: () => open('pickup', svc) },
        { label: 'View details', variant: 'secondary' as const, onClick: () => open('viewDetails', svc) },
      ];
    case 'CANCELLED':
      return [
        { label: 'Reorder', variant: 'primary' as const, onClick: () => open('reorder', svc) },
        { label: 'View details', variant: 'secondary' as const, onClick: () => open('viewDetails', svc) },
      ];
    case 'IN_PROGRESS':
    case 'PROCESSING':
    case 'SCHEDULED':
      return [
        { label: 'Modify order', variant: 'primary' as const, onClick: () => open('modify', svc) },
        { label: 'View details', variant: 'secondary' as const, onClick: () => open('viewDetails', svc) },
      ];
    default:
      return [
        { label: 'View details', variant: 'primary' as const, onClick: () => open('viewDetails', svc) },
      ];
  }
}

function getAutoCareActions(
  svc: ServiceEntry,
  open: (type: AutoCareModalType, svc: ServiceEntry) => void,
) {
  return [
    { label: 'Check in', variant: 'primary' as const, onClick: () => open('checkIn', svc) },
    { label: 'Reschedule', variant: 'secondary' as const, onClick: () => open('reschedule', svc) },
    { label: 'View details', variant: 'secondary' as const, onClick: () => open('viewDetails', svc) },
  ];
}

function ServicesCardWithModals({
  services,
  defaultExpanded,
  defaultExpandedRowId,
}: ServicesCardWithModalsProps) {
  const [pharmacyModal, setPharmacyModal] = useState<PharmacyModalType>(null);
  const [opticalModal, setOpticalModal] = useState<OpticalModalType>(null);
  const [bakeryModal, setBakeryModal] = useState<BakeryModalType>(null);
  const [autoCareModal, setAutoCareModal] = useState<AutoCareModalType>(null);
  const [activeService, setActiveService] = useState<ServiceEntry | null>(null);

  const openPharmacy = (type: PharmacyModalType, svc: ServiceEntry) => { setActiveService(svc); setPharmacyModal(type); };
  const openOptical  = (type: OpticalModalType,  svc: ServiceEntry) => { setActiveService(svc); setOpticalModal(type); };
  const openBakery   = (type: BakeryModalType,   svc: ServiceEntry) => { setActiveService(svc); setBakeryModal(type); };
  const openAutoCare = (type: AutoCareModalType,  svc: ServiceEntry) => { setActiveService(svc); setAutoCareModal(type); };

  const wiredServices = services.map((svc): ServiceEntry => {
    switch (svc.serviceType) {
      case 'PHARMACY': return { ...svc, actions: getPharmacyActions(svc, openPharmacy) };
      case 'OPTICAL':  return { ...svc, actions: getOpticalActions(svc, openOptical) };
      case 'BAKERY':   return { ...svc, actions: getBakeryActions(svc, openBakery) };
      case 'AUTO':     return { ...svc, actions: getAutoCareActions(svc, openAutoCare) };
      default:         return svc;
    }
  });

  return (
    <>
      <ServicesCard
        services={wiredServices}
        defaultExpanded={defaultExpanded}
        defaultExpandedRowId={defaultExpandedRowId}
      />
      <PharmacyModals
        openModal={pharmacyModal}
        onClose={() => setPharmacyModal(null)}
        rxName={activeService?.detail?.referenceId?.includes('Rx')
          ? activeService?.microcopy?.split(' · ')[0]
          : activeService?.serviceLabel}
        rxNumber={activeService?.detail?.referenceId}
        location={activeService?.pickupLocation}
        pickupWindow={activeService?.detail?.pickupWindow}
        provider={activeService?.detail?.provider}
        plan={activeService?.detail?.plan}
      />
      <OpticalModals
        openModal={opticalModal}
        onClose={() => setOpticalModal(null)}
        orderRef={activeService?.detail?.referenceId}
        location={activeService?.pickupLocation}
        provider={activeService?.detail?.provider}
        pickupWindow={activeService?.detail?.pickupWindow}
      />
      <BakeryModals
        openModal={bakeryModal}
        onClose={() => setBakeryModal(null)}
        orderRef={activeService?.detail?.referenceId}
        cakeType={activeService?.serviceLabel}
        location={activeService?.pickupLocation}
        pickupDate={activeService?.pickupDate}
      />
      <AutoCareModals
        openModal={autoCareModal}
        onClose={() => setAutoCareModal(null)}
        onSwitchToCheckIn={() => setAutoCareModal('checkIn')}
        onSwitchToReschedule={() => setAutoCareModal('reschedule')}
        serviceDetails={{
          vehicle: activeService?.detail?.vehicle ?? '2019 Toyota Camry',
          services: ['Oil change'],
        }}
        location={activeService?.pickupLocation}
        statusHeading={activeService?.detail?.scheduledTime ?? 'Scheduled'}
        appointmentDate={new Date(2026, 2, 7)}
      />
    </>
  );
}

// ── Pattern definitions ───────────────────────────────────────────────────────
interface PatternEntry {
  id: string;
  title: string;
  preview: React.ReactNode;
}

const PATTERNS: PatternEntry[] = [
  {
    id: 'none',
    title: 'No services (default)',
    preview: null,
  },
  {
    id: 'curbside-get-it-now',
    title: 'Active curbside with "Get it now" express upgrade',
    preview: <CurbsideOrderCard {...CURBSIDE_CARD} />,
  },
  {
    id: 'auto-care',
    title: 'Upcoming Auto Care appointment',
    preview: <AutoCareOrderCard {...AUTO_CARE_CARD} />,
  },
  {
    id: 'combined-bundle',
    title: 'Oil change + grocery pickup bundled',
    preview: (
      <CombinedOrderCard
        autoCare={AUTO_CARE_CARD}
        delivery={CURBSIDE_CARD}
        autoCareAppointmentDate={new Date(2026, 2, 7)}
      />
    ),
  },
  {
    id: 'delayed-delivery',
    title: 'Late delivery warning',
    preview: (
      <DelayedDeliveryCard
        statusHeading="Delayed, estimated up to 2 hours"
        delayEstimate="Estimated up to 2 hours late"
        products={[P.strawberries, P.blueberries, P.bananas]}
        orderTotal="$32.47"
      />
    ),
  },
  {
    id: 'services-urgency-focus',
    title: 'Services: Prescription ready + Auto Care in progress (urgency focus)',
    preview: (
      <ServicesCardWithModals
        defaultExpandedRowId="rx-ready"
        services={SERVICES_URGENCY}
      />
    ),
  },
  {
    id: 'services-all-expanded',
    title: 'Services: All statuses expanded (full range)',
    preview: (
      <ServicesCardWithModals
        defaultExpanded
        defaultExpandedRowId="auto-in-progress"
        services={SERVICES_ALL_EXPANDED}
      />
    ),
  },
  {
    id: 'services-single-rx-ready',
    title: 'Services: Single Rx ready (minimal state)',
    preview: (
      <ServicesCardWithModals
        defaultExpandedRowId="rx-ready"
        services={SERVICES_SINGLE_RX}
      />
    ),
  },
  {
    id: 'services-multi-store',
    title: 'Services: Multi-store services',
    preview: (
      <ServicesCardWithModals
        defaultExpanded
        defaultExpandedRowId="rx-ready-store1"
        services={SERVICES_MULTI_STORE}
      />
    ),
  },
  {
    id: 'auto-care-engagement',
    title: 'Auto center engagement cards',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <MaintenanceHealthCard
          vehicle="2019 Toyota Camry"
          mileage="22,450 miles"
          healthScore={62}
          location="Carrollton Supercenter · Auto Care Center"
          illustration={`${CDN}f991ec87514645ea86e2480394f1c3fd?format=webp&width=800`}
          items={[
            { name: 'Oil Change',    status: 'overdue', detail: '3,200 mi overdue', price: '$29.88' },
            { name: 'Tire Rotation', status: 'due',     detail: 'Due in ~800 mi',   price: '$14.88' },
            { name: 'Wiper Blades', status: 'good',    detail: 'Next: Oct 2026' },
          ]}
          bundleSavings="Bundle oil change + tire rotation —"
          bundleSavingsAmount="$12"
          valueStatement="Walmart Auto Care is up to 40% less than dealership prices. Same-day availability. No hidden fees."
        />
        <AutoCareUpsellOfferCard
          vehicle="2019 Toyota Camry"
          vehicleSub="Last serviced 3,200 miles ago"
          serviceName="Tire Rotation"
          discountPct={20}
          regularPrice="$14.88"
          memberPrice="$11.90"
          savings="$2.98"
          expiresInDays={2}
          terms="Valid at Carrollton Supercenter Auto Care. One vehicle per offer. Walmart+ membership required."
          illustration={`${CDN}f991ec87514645ea86e2480394f1c3fd?format=webp&width=800`}
          valueBullets={[
            'Walmart-certified technicians',
            'Free multi-point inspection included',
            'Same-day service available',
          ]}
        />
      </div>
    ),
  },
];

// ── Main component ────────────────────────────────────────────────────────────
export function OrderCardSwitcher() {
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const idx = ACTIVE_PATTERN_INDEX;
    return idx >= 0 && idx < PATTERNS.length ? idx : 0;
  });

  const [toolbarVisible, setToolbarVisible] = useState(false);

  // Double-Escape detection
  const lastEscapeTime = useRef<number>(0);

  // ── HMR support: watch for changes to activePattern.ts and update state
  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.accept('./activePattern', (newModule) => {
        const newIdx = newModule?.ACTIVE_PATTERN_INDEX ?? 0;
        const validated = newIdx >= 0 && newIdx < PATTERNS.length ? newIdx : 0;
        setActiveIndex(validated);
      });
    }
  }, []);

  const goTo = useCallback((index: number) => {
    const clamped = (index + PATTERNS.length) % PATTERNS.length;
    setActiveIndex(clamped);
  }, []);

  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const now = Date.now();
        if (now - lastEscapeTime.current < 400) {
          // Double Escape — toggle toolbar
          setToolbarVisible(v => !v);
          lastEscapeTime.current = 0;
        } else {
          lastEscapeTime.current = now;
        }
        return;
      }

      // Arrow key navigation only when toolbar is visible
      if (!toolbarVisible) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toolbarVisible, prev, next]);

  const pattern = PATTERNS[activeIndex];

  return (
    <>
      {/* Render the active pattern card (hidden when index 0 / no services) */}
      {pattern.preview && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Your Services</h2>
          <div className={styles.cardWrapper} tabIndex={-1}>
            {pattern.preview}
          </div>
        </div>
      )}

      {/* Floating dev toolbar — hidden until double-Escape */}
      {toolbarVisible && (
        <div
          className={styles.toolbar}
          role="toolbar"
          aria-label="Order card switcher"
        >
          {/* Top: label + counter */}
          <div className={styles.topRow}>
            <span className={styles.devLabel}>Dev · Pattern Switcher</span>
            <span className={styles.counter}>{activeIndex} / {PATTERNS.length - 1}</span>
          </div>

          {/* Pattern title */}
          <p className={styles.patternTitle}>{pattern.title}</p>

          {/* Nav: prev / dots / next */}
          <div className={styles.navRow}>
            <button
              className={styles.navBtn}
              onClick={prev}
              aria-label="Previous pattern"
            >
              <ChevronLeft style={{ width: 14, height: 14 }} />
            </button>

            <div className={styles.dots} role="group" aria-label="Pattern indicators">
              {PATTERNS.map((p, i) => (
                <button
                  key={p.id}
                  className={[styles.dot, i === activeIndex ? styles.dotActive : ''].filter(Boolean).join(' ')}
                  onClick={() => goTo(i)}
                  aria-label={`Pattern ${i}: ${p.title}`}
                  aria-pressed={i === activeIndex}
                >
                  {i}
                </button>
              ))}
            </div>

            <button
              className={styles.navBtn}
              onClick={next}
              aria-label="Next pattern"
            >
              <ChevronRight style={{ width: 14, height: 14 }} />
            </button>
          </div>

          {/* Keyboard hint */}
          <p className={styles.hint}>
            <kbd>←</kbd> <kbd>→</kbd> to switch &nbsp;·&nbsp; <kbd>Esc Esc</kbd> to hide
          </p>
        </div>
      )}
    </>
  );
}
