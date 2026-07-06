import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { useLayoutSettings } from '@/contexts/LayoutSettingsContext';
import styles from './ProjectSettings.module.css';

export function NavSettingsSection() {
  const navigate = useNavigate();
  const { t } = useTranslation('pages');
  const { platform, setPlatform } = useLayoutSettings();

  return (
    <div className={styles.navSection}>
      <div className={styles.navSectionHeader}>
        <div className={styles.navSectionLeft}>
          <h2 className={styles.navSectionTitle}>{t('projectSettings.navSectionTitle')}</h2>
          <p className={styles.navSectionDesc}>
            {t('projectSettings.navSectionDesc')}
          </p>
        </div>
        <Button
          variant="tertiary"
          size="small"
          onClick={() => navigate('/walmart')}
        >
          {t('projectSettings.previewInApp')}
        </Button>
      </div>

      {/* Platform Mode */}
      <div className={styles.navSubsection}>
        <h3 className={styles.navSubsectionTitle}>{t('projectSettings.platformTitle')}</h3>
        <p className={styles.navSubsectionDesc}>
          {t('projectSettings.platformDesc')}
        </p>
        <div className={styles.platformCards}>
          <PlatformOption
            label={t('projectSettings.webLabel')}
            tag={t('projectSettings.webTag')}
            tagVariant="success"
            description={t('projectSettings.webDesc')}
            isActive={platform === 'web'}
            onClick={() => setPlatform('web')}
          />
          <PlatformOption
            label={t('projectSettings.iosLabel')}
            tag={t('projectSettings.iosTag')}
            tagVariant="info"
            description={t('projectSettings.iosDesc')}
            isActive={platform === 'ios'}
            onClick={() => setPlatform('ios')}
          />
          <PlatformOption
            label={t('projectSettings.androidLabel')}
            tag={t('projectSettings.androidTag')}
            tagVariant="neutral"
            description={t('projectSettings.androidDesc')}
            isActive={platform === 'android'}
            onClick={() => setPlatform('android')}
          />
        </div>
      </div>

    </div>
  );
}

interface PlatformOptionProps {
  label: string;
  tag: string;
  tagVariant: 'neutral' | 'success' | 'info';
  description: string;
  isActive: boolean;
  onClick: () => void;
}

function PlatformOption({ label, tag, tagVariant, description, isActive, onClick }: PlatformOptionProps) {
  const { t } = useTranslation('pages');

  return (
    <button
      className={[styles.platformCard, isActive ? styles.platformCardActive : ''].join(' ')}
      onClick={onClick}
    >
      <div className={styles.platformCardTop}>
        <span className={styles.platformCardLabel}>{label}</span>
        <Tag variant={tagVariant}>{tag}</Tag>
        {isActive && <Tag variant="success">{t('projectSettings.activeLabel')}</Tag>}
      </div>
      <p className={styles.optionCardDesc}>{description}</p>
    </button>
  );
}
