import { ChevronLeft, Camera, Microphone } from "@/components/icons";
import { SparklesIcon } from "@/components/icons-custom";
import { IconButton } from "@/components/ui/IconButton";
import { useLayoutSettings } from "@/contexts/LayoutSettingsContext";
import styles from "./SearchResultsHeader.module.css";

interface SearchResultsHeaderProps {
  query: string;
  onBack: () => void;
  transparent?: boolean;
  sticky?: boolean;
}

export function SearchResultsHeader({ query, onBack, transparent = false, sticky = true }: SearchResultsHeaderProps) {
  const { platform, navDesign } = useLayoutSettings();
  const isNative = platform === 'ios' || platform === 'android';
  const isExp1 = navDesign === 'exploration1';

  return (
    <div
      className={[
        sticky ? 'sticky z-50' : '',
        'lg:hidden -mx-4',
        isExp1 ? (transparent ? `${styles.exp1Wrapper} ${styles.exp1WrapperTransparent}` : styles.exp1Wrapper) : 'bg-white',
        sticky && isNative ? 'top-[54px]' : sticky ? 'top-0' : '',
      ].filter(Boolean).join(' ')}
    >
      {isExp1 ? (
        <div className={styles.exp1Header}>
          <IconButton
            variant="ghost"
            size="large"
            onClick={onBack}
            aria-label="Go back"
            UNSAFE_className={styles.exp1BackBtn}
          >
            <ChevronLeft className="w-5 h-5" />
          </IconButton>
          <div className={styles.exp1SearchPill}>
            <span className={styles.exp1QueryText}>{query}</span>
            <div className={styles.exp1Icons}>
              <button className={styles.exp1IconBtn} aria-label="Camera search">
                <Camera className={styles.exp1Icon} />
              </button>
              <button className={styles.exp1IconBtn} aria-label="Voice search">
                <Microphone className={styles.exp1Icon} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1 px-4 pb-4 pt-2">
          <IconButton
            variant="ghost"
            size="large"
            onClick={onBack}
            aria-label="Go back"
            UNSAFE_className="flex-shrink-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </IconButton>
          <div className="flex-1">
            <div className="border-2 border-[var(--ld-semantic-color-action-fill-primary)] rounded-full">
              <div className="bg-white rounded-full px-3 py-2 flex items-center gap-2 h-[42px]">
                <div className="w-6 h-6 flex-shrink-0">
                  <SparklesIcon />
                </div>
                <span className="flex-1 text-foreground text-[16px] truncate">{query}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
