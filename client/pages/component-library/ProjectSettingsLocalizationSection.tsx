import { useTranslation } from 'react-i18next';
import { Tag } from '@/components/ui/Tag';
import styles from './ProjectSettings.module.css';

export function LocalizationSettingsSection() {
  const { t, i18n } = useTranslation('pages');
  const resolvedLng = i18n.resolvedLanguage || i18n.language?.split('-')[0] || 'en';

  return (
    <div className={styles.navSection}>
      <div className={styles.navSectionHeader}>
        <div className={styles.navSectionLeft}>
          <h2 className={styles.navSectionTitle}>{t('projectSettings.localizationTitle')}</h2>
          <p className={styles.navSectionDesc}>
            {t('projectSettings.localizationDesc')}
          </p>
        </div>
      </div>

      <div className={styles.navSubsection}>
        <div className={styles.platformCards}>
          <LanguageOption
            label="English (US)"
            code="en"
            description={t('projectSettings.enDesc')}
            isActive={resolvedLng === 'en'}
            onClick={() => i18n.changeLanguage('en')}
          />
          <LanguageOption
            label="Español"
            code="es"
            description={t('projectSettings.esDesc')}
            isActive={resolvedLng === 'es'}
            onClick={() => i18n.changeLanguage('es')}
          />
          <LanguageOption
            label="Français"
            code="fr"
            description={t('projectSettings.frDesc')}
            isActive={resolvedLng === 'fr'}
            onClick={() => i18n.changeLanguage('fr')}
          />
        </div>
      </div>
    </div>
  );
}

interface LanguageOptionProps {
  label: string;
  code: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

function LanguageOption({ label, code, description, isActive, onClick }: LanguageOptionProps) {
  const { t } = useTranslation('pages');
  return (
    <button
      className={[styles.platformCard, isActive ? styles.platformCardActive : ''].join(' ')}
      onClick={onClick}
    >
      <div className={styles.platformCardTop}>
        <span className={styles.platformCardLabel}>{label}</span>
        {isActive && <Tag variant="success">{t('projectSettings.activeLabel')}</Tag>}
      </div>
      <p className={styles.optionCardDesc}>{description}</p>
    </button>
  );
}
