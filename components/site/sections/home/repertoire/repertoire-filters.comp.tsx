import { PLAYER_COPY, type RepertoireFilter } from "@/constants/repertoire.const";
import "./repertoire-filters.comp.css";

interface RepertoireFiltersProps {
  filters: readonly RepertoireFilter[];
  active: string | null;
  onChange: (categoryId: string | null) => void;
}

// One rounded pill per genre; the active one is solid ivory.
export function RepertoireFilters({ filters, active, onChange }: RepertoireFiltersProps) {
  return (
    <div className="repertoire-filters" role="group" aria-label={PLAYER_COPY.filters}>
      {filters.map((filter) => {
        const isActive = filter.value === active;
        return (
          <button
            key={filter.value ?? "todo"}
            type="button"
            className={`repertoire-filters__pill${isActive ? " repertoire-filters__pill_active" : ""}`}
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
