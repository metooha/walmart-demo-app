import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ComponentPageLayout } from '@/components/ui/ComponentPageLayout';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Tag } from '@/components/ui/Tag';
import { TokenSection, type TokenDef } from '@/components/theme-editor/TokenSection';
import { PreviewPanel } from '@/components/theme-editor/PreviewPanel';
import { useThemeEditor } from '@/hooks/useThemeEditor';
import { useTheme } from '@/contexts/ThemeContext';
import { useLayoutSettings, type MobileFooterMode, type MobileTopNavMode } from '@/contexts/LayoutSettingsContext';
import { Download } from '@/components/icons/Download';
import { Upload } from '@/components/icons/Upload';
import { RotateCcw } from '@/components/icons/RotateCcw';
import { NavSettingsSection } from './ProjectSettingsNavSection';
import { LocalizationSettingsSection } from './ProjectSettingsLocalizationSection';
import { ThemeEditorSection } from './ProjectSettingsThemeSection';
import { MagicThemeSection } from './ProjectSettingsMagicSection';
import styles from './ProjectSettings.module.css';

export default function ProjectSettingsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation('pages');

  return (
    <ComponentPageLayout
      section="Tools"
      title={t('projectSettings.title')}
      description={t('projectSettings.description')}
    >
      {/* Section 1: Navigation Settings */}
      <NavSettingsSection />

      <hr className={styles.divider} />

      {/* Section 2: Localization Settings */}
      <LocalizationSettingsSection />

      <hr className={styles.divider} />

      {/* Section 3: Magic Theme Selector */}
      <MagicThemeSection />

      <hr className={styles.divider} />

      {/* Section 4: Theme Token Editor */}
      <ThemeEditorSection />
    </ComponentPageLayout>
  );
}
