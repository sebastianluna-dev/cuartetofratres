import { ALL_FILTER_LABEL, type RepertoireFilter } from "@/constants/repertoire.const";

interface FilterSource {
  id: string;
  label: string;
  shortLabel: string;
}

/** The filter tabs: "Todo" first, then one per category with its short label. */
export function buildRepertoireFilters(categories: readonly FilterSource[]): RepertoireFilter[] {
  return [
    { value: null, label: ALL_FILTER_LABEL },
    ...categories.map((category) => ({ value: category.id, label: category.shortLabel || category.label })),
  ];
}
