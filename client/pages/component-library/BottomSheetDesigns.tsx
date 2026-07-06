import React, { useState } from 'react';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Button } from '@/components/ui/Button';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Checkbox } from '@/components/ui/Checkbox';
import { WCPRichMediaSheet } from '@/components/walmart/WCPRichMediaSheet';
import { WCPSignatureCaptureBottomSheet } from '@/components/walmart/WCPSignatureCaptureBottomSheet';
import { WCPCountrySelectBottomSheet } from '@/components/walmart/WCPCountrySelectBottomSheet';
import { MobileFilterBottomSheet } from '@/components/walmart/purchase-history/MobileFilterBottomSheet';

export default function BottomSheetDesignsPage() {
  const [openSheet, setOpenSheet] = useState<string | null>(null);

  return (
    <ComponentPageLayout
      section="Components"
      title="Bottom Sheet Designs"
      description="A single page to preview all bottom sheet patterns used in this system."
    >
      <div style={{ display: 'grid', gap: 16 }}>
        <div style={{ background: 'var(--ld-semantic-color-fill-surface-primary)', borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>LD Bottom Sheet</h3>
          <p style={{ marginTop: 8 }}>Standard Living Design bottom sheet for simple flows.</p>
          <Button variant="secondary" onClick={() => setOpenSheet('ld')}>Open LD Bottom Sheet</Button>
        </div>

        <div style={{ background: 'var(--ld-semantic-color-fill-surface-primary)', borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>[WCP] Rich Media Sheet</h3>
          <p style={{ marginTop: 8 }}>Media-rich bottom sheet with custom header and footer actions.</p>
          <Button variant="secondary" onClick={() => setOpenSheet('rich-media')}>Open Rich Media Sheet</Button>
        </div>

        <div style={{ background: 'var(--ld-semantic-color-fill-surface-primary)', borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>Country Select Bottom Sheet</h3>
          <p style={{ marginTop: 8 }}>Country picker in mobile bottom-sheet format.</p>
          <Button variant="secondary" onClick={() => setOpenSheet('country')}>Open Country Select Sheet</Button>
        </div>

        <div style={{ background: 'var(--ld-semantic-color-fill-surface-primary)', borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>Signature Capture Bottom Sheet</h3>
          <p style={{ marginTop: 8 }}>Subscription signature agreement captured inside a bottom sheet.</p>
          <Button variant="secondary" onClick={() => setOpenSheet('signature')}>Open Signature Sheet</Button>
        </div>

        <div style={{ background: 'var(--ld-semantic-color-fill-surface-primary)', borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>Purchase History Filter Sheet</h3>
          <p style={{ marginTop: 8 }}>Mobile filter-selection bottom sheet used in purchase history.</p>
          <Button variant="secondary" onClick={() => setOpenSheet('filters')}>Open Filter Sheet</Button>
        </div>
      </div>

      <BottomSheet
        isOpen={openSheet === 'ld'}
        onClose={() => setOpenSheet(null)}
        title="Delivery options"
        actions={<Button variant="primary" isFullWidth onClick={() => setOpenSheet(null)}>Confirm</Button>}
      >
        <div style={{ padding: 16 }}>
          <p style={{ marginTop: 0 }}>Choose how you want to receive your items.</p>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Delivery</li>
            <li>Pickup</li>
            <li>Shipping</li>
          </ul>
        </div>
      </BottomSheet>

      <WCPRichMediaSheet
        isOpen={openSheet === 'rich-media'}
        onClose={() => setOpenSheet(null)}
        headerVariant="title-subtitle"
        title="Walmart+ benefits"
        subtitle="Free delivery and more"
        actions={<Button variant="primary" isFullWidth onClick={() => setOpenSheet(null)}>Continue</Button>}
      >
        <div style={{ padding: 16 }}>
          <p style={{ marginTop: 0 }}>Get free delivery from your store and stream benefits with Walmart+.</p>
        </div>
      </WCPRichMediaSheet>

      <WCPCountrySelectBottomSheet
        open={openSheet === 'country'}
        onClose={() => setOpenSheet(null)}
        title="Select country/region"
        actionLabel="Confirm"
      />

      <WCPSignatureCaptureBottomSheet
        isOpen={openSheet === 'signature'}
        onClose={() => setOpenSheet(null)}
        onSubmit={() => setOpenSheet(null)}
      />

      <MobileFilterBottomSheet
        open={openSheet === 'filters'}
        title="Filter"
        onClose={() => setOpenSheet(null)}
        onClear={() => setOpenSheet(null)}
        onApply={() => setOpenSheet(null)}
      >
        <div style={{ display: 'grid', gap: 12 }}>
          <Checkbox label="Delivered" defaultChecked />
          <Checkbox label="Pickup" defaultChecked />
          <Checkbox label="Canceled" />
        </div>
      </MobileFilterBottomSheet>
    </ComponentPageLayout>
  );
}
