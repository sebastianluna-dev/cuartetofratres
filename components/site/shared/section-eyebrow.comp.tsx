import { StaffOrnament } from "./staff-ornament.comp";

interface SectionEyebrowProps {
  label: string;
  theme?: "ivory" | "ink";
}

// Staff ornament + small uppercase label. The classes live in globals.css
// (`.eyebrow`) because the 404 screen uses them too, without this component.
export function SectionEyebrow({ label, theme = "ivory" }: SectionEyebrowProps) {
  return (
    <div className={`eyebrow eyebrow_theme_${theme}`}>
      <StaffOrnament theme={theme === "ink" ? "ivory" : "ink"} width={240} />
      <span className="eyebrow__label">{label}</span>
    </div>
  );
}
