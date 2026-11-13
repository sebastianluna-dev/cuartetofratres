import "./wood-grain.comp.css";

const TABLE = "0.35 0.62 0.45 0.58 0.4 0.66 0.48 0.55 0.42 0.6";

// The grain of the repertoire's wood, drawn rather than photographed: a noise
// stretched along the length (the fibres), bent by a wider, slower noise (the
// waves of the figure) and banded into light and dark, laid over the varnish
// in soft light. It weighs nothing, never
// tiles and fits any size. A Server Component; decorative.
export function WoodGrain() {
  return (
    <span className="wood-grain" aria-hidden="true">
      <svg className="wood-grain__fibres" preserveAspectRatio="none" focusable="false">
        <defs>
          <filter id="wood-grain-filter" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.045 0.0022" numOctaves={4} seed={11} result="fibre" />
            <feTurbulence type="fractalNoise" baseFrequency="0.0015 0.004" numOctaves={2} seed={3} result="wave" />
            <feDisplacementMap
              in="fibre"
              in2="wave"
              scale={38}
              xChannelSelector="R"
              yChannelSelector="G"
              result="bent"
            />
            <feColorMatrix in="bent" type="matrix" values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0 1" />
            <feComponentTransfer>
              <feFuncR type="table" tableValues={TABLE} />
              <feFuncG type="table" tableValues={TABLE} />
              <feFuncB type="table" tableValues={TABLE} />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect x="-5%" y="-5%" width="110%" height="110%" filter="url(#wood-grain-filter)" />
      </svg>
    </span>
  );
}
