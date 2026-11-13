interface ArrowIconProps {
  /** `right` moves on within the page; `up-right` opens something (a window, another site). */
  direction?: "right" | "up-right";
  className?: string;
}

const PATHS = {
  right: "M4 12h15M13 6l6 6-6 6",
  "up-right": "M7 17 17 7M9 7h8v8",
} as const;

export function ArrowIcon({ direction = "right", className }: ArrowIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d={PATHS[direction]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
