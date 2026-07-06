import { useTranslation } from 'react-i18next';
import { useLayoutSettings, type MagicThemeMode, MAGIC_THEME_TOKENS } from '@/contexts/LayoutSettingsContext';
import { Tag } from '@/components/ui/Tag';
import styles from './ProjectSettings.module.css';

interface MagicOptionProps {
  label: string;
  tag: string;
  tagVariant: 'neutral' | 'success' | 'info';
  description: string;
  gradientColors: { start: string; middle: string; stop: string };
  isActive: boolean;
  onClick: () => void;
}

function MagicOption({ label, tag, tagVariant, description, gradientColors, isActive, onClick }: MagicOptionProps) {
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
      {/* Gradient swatch */}
      <div
        style={{
          height: 6,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${gradientColors.start}, ${gradientColors.middle}, ${gradientColors.stop})`,
        }}
      />
      <p className={styles.optionCardDesc}>{description}</p>
    </button>
  );
}

export function MagicThemeSection() {
  const { t } = useTranslation('pages');
  const { magicTheme, setMagicTheme } = useLayoutSettings();

  return (
    <div className={styles.navSection}>
      <div className={styles.navSectionHeader}>
        <div className={styles.navSectionLeft}>
          <h2 className={styles.navSectionTitle}>{t('projectSettings.magicTitle')}</h2>
          <p className={styles.navSectionDesc}>
            {t('projectSettings.magicDesc')}
          </p>
        </div>
      </div>

      <div className={styles.navSubsection}>
        <h3 className={styles.navSubsectionTitle}>{t('projectSettings.personaTitle')}</h3>
        <p className={styles.navSubsectionDesc}>
          {t('projectSettings.personaDesc')}
        </p>
        <div className={styles.platformCards}>
          <MagicOption
            label={t('projectSettings.customerLabel')}
            tag="Blue"
            tagVariant="info"
            description={t('projectSettings.customerDesc')}
            gradientColors={MAGIC_THEME_TOKENS.customer}
            isActive={magicTheme === 'customer'}
            onClick={() => setMagicTheme('customer')}
          />
          <MagicOption
            label={t('projectSettings.partnerLabel')}
            tag="Green"
            tagVariant="success"
            description={t('projectSettings.partnerDesc')}
            gradientColors={MAGIC_THEME_TOKENS.partner}
            isActive={magicTheme === 'partner'}
            onClick={() => setMagicTheme('partner')}
          />
          <MagicOption
            label={t('projectSettings.associateLabel')}
            tag="Spark"
            tagVariant="neutral"
            description={t('projectSettings.associateDesc')}
            gradientColors={MAGIC_THEME_TOKENS.associate}
            isActive={magicTheme === 'associate'}
            onClick={() => setMagicTheme('associate')}
          />
        </div>
      </div>
    </div>
  );
}
