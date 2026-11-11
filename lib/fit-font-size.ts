interface FitLimits {
  min: number;
  max: number;
}

/**
 * The font size at which a one-line title fills its container: the title is
 * measured at `probeSize` and scaled by the ratio of the two widths, a hair
 * short so rounding never wraps or clips it. Clamped to the limits; a title
 * that could not be measured keeps the smallest size.
 */
export function fitFontSize(textWidth: number, containerWidth: number, probeSize: number, limits: FitLimits): number {
  if (textWidth <= 0 || containerWidth <= 0) return limits.min;
  const size = Math.floor(((probeSize * containerWidth) / textWidth) * 0.995);
  return Math.max(limits.min, Math.min(limits.max, size));
}
