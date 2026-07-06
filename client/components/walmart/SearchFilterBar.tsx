import { useState } from "react";
import { SortingArrows, Tag, MagicFill } from "@/components/icons";
import { WalmartPlusLogoIcon } from "@/components/icons-custom";
import { FilterChip } from "@/components/ui/FilterChip";
import { useLayoutSettings } from "@/contexts/LayoutSettingsContext";
import styles from "./SearchFilterBar.module.css";

interface SearchFilterBarProps {
  chips: readonly string[];
  query?: string;
  transparent?: boolean;
}

export function SearchFilterBar({ chips, query, transparent = false }: SearchFilterBarProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { navDesign } = useLayoutSettings();
  const isExp1 = navDesign === 'exploration1';

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className={[styles.bar, isExp1 ? styles.barExp1 : '', transparent ? styles.barTransparent : ''].filter(Boolean).join(' ')}>
      {isExp1 ? (
        <>
          {/* Smart filters — multiselect chip with gradient magic icon */}
          <FilterChip
            isMultiSelect
            iconLeading={<MagicFill className="w-4 h-4" style={{ color: 'var(--ld-semantic-color-border-magic-start, #0053E2)' }} />}
            aria-label="Smart filters"
          >
            Smart filters
          </FilterChip>

          {/* Current query as selected chip */}
          {query && (
            <FilterChip selected aria-label={query}>
              {query}
            </FilterChip>
          )}

          {/* All deals — green tag icon */}
          <FilterChip
            iconLeading={
              <Tag className="w-4 h-4" style={{ color: '#2E844A' }} />
            }
          >
            All deals
          </FilterChip>

          {/* Walmart+ chip */}
          <FilterChip
            iconLeading={
              <WalmartPlusLogoIcon width={16} height={16} />
            }
          >
            Walmart+
          </FilterChip>

          {/* Regular filter chips */}
          {chips.map((chip) => (
            <FilterChip
              key={chip}
              selected={activeFilters.includes(chip)}
              onSelectedChange={() => toggleFilter(chip)}
              isMultiSelect
            >
              {chip}
            </FilterChip>
          ))}
        </>
      ) : (
        <>
          {/* All Filters — icon-only FilterChip */}
          <FilterChip isAllFilters showLabel={false} aria-label="All filters" />

          {/* Sort — multi-select chip with icon + label */}
          <FilterChip iconLeading={<SortingArrows className="w-4 h-4" />} aria-label="Sort">
            Sort
          </FilterChip>

          {/* Filter chips */}
          {chips.map((chip) => (
            <FilterChip
              key={chip}
              selected={activeFilters.includes(chip)}
              onSelectedChange={() => toggleFilter(chip)}
              isMultiSelect
            >
              {chip}
            </FilterChip>
          ))}
        </>
      )}
    </div>
  );
}
