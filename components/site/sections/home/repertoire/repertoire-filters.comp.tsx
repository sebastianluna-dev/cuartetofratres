import type { RepertoireFilter } from "@/constants/repertoire.const";
import "./repertoire-filters.comp.css";

interface RepertoireFiltersProps {
  filters: readonly RepertoireFilter[];
  active: string | null;
  onChange: (categoryId: string | null) => void;
}

// Underlined tabs on desktop, pills in a horizontal strip on the phone.
export function RepertoireFilters({ filters, active, onChange }: RepertoireFiltersProps) {
  return (
    <div className="repertoire-filters" role="group" aria-label="Filtrar repertorio">
      {filters.map((filter) => {
        const isActive = filter.value === active;
        return (
          <button
            key={filter.value ?? "todo"}
            type="button"
            className={`repertoire-filters__tab${isActive ? " repertoire-filters__tab_active" : ""}`}
            aria-pressed={isActive}
            onClick={() => onChange(filter.value)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
