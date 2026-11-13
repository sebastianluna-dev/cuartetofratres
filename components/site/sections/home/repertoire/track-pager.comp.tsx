import { PLAYER_COPY } from "@/constants/repertoire.const";
import "./track-pager.comp.css";

interface TrackPagerProps {
  /** 0-based. */
  page: number;
  count: number;
  onChange: (page: number) => void;
}

// Pages of the programme under the list: previous, the page numbers and
// next, as small chips like the filters. Hidden while everything fits on one.
export function TrackPager({ page, count, onChange }: TrackPagerProps) {
  if (count <= 1) return null;

  return (
    <nav className="track-pager" aria-label={PLAYER_COPY.pages}>
      <button
        type="button"
        className="track-pager__step"
        aria-label={PLAYER_COPY.previousPage}
        disabled={page === 0}
        onClick={() => onChange(page - 1)}
      >
        <svg className="track-pager__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          className={`track-pager__page${index === page ? " track-pager__page_current" : ""}`}
          aria-current={index === page ? "page" : undefined}
          onClick={() => onChange(index)}
        >
          {index + 1}
        </button>
      ))}
      <button
        type="button"
        className="track-pager__step"
        aria-label={PLAYER_COPY.nextPage}
        disabled={page === count - 1}
        onClick={() => onChange(page + 1)}
      >
        <svg className="track-pager__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </nav>
  );
}
