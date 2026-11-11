export interface PosterTitle {
  /** The words before the last one, set small above it; empty for a one-word title. */
  kicker: string;
  /** The last word, in one line or broken in two at a syllable. */
  lines: string[];
}

const VOWELS = "aeiouáéíóúü";
/** Shorter words stay whole: half of «Viena» is not a line. */
const MIN_LENGTH_TO_BREAK = 6;
const MIN_LINE_LENGTH = 2;

const isVowel = (letter: string | undefined) => letter !== undefined && VOWELS.includes(letter.toLowerCase());

/**
 * Breaks a word in two near its middle, where a syllable starts: before a
 * consonant that is followed by a vowel and comes after a vowel or after
 * another consonant that closes the syllable before («tem|po», «Schu|bert»).
 * A word with no such place comes back whole.
 */
function breakWord(word: string): string[] {
  if (word.length < MIN_LENGTH_TO_BREAK) return [word];
  const middle = word.length / 2;
  let best = -1;
  for (let i = MIN_LINE_LENGTH; i <= word.length - MIN_LINE_LENGTH; i++) {
    if (isVowel(word[i]) || !isVowel(word[i + 1])) continue;
    // «ch», «ll», «rr» and groups such as «br» or «tr» stay together: the
    // break goes before the pair.
    const inGroup = /^(ch|ll|rr|[bcdfgkpt][lr])$/i.test(word.slice(i - 1, i + 1));
    const at = inGroup ? i - 1 : i;
    if (at < MIN_LINE_LENGTH) continue;
    if (best < 0 || Math.abs(at - middle) < Math.abs(best - middle)) best = at;
  }
  return best < 0 ? [word] : [word.slice(0, best), word.slice(best)];
}

/**
 * A concert title as a poster sets it: the last word big, broken by
 * syllables, and the rest as a line above it.
 * "Concierto de temporada" → kicker "Concierto de", lines ["tempo", "rada"].
 */
export function splitPosterTitle(title: string): PosterTitle {
  const words = title.trim().split(/\s+/).filter(Boolean);
  const last = words.pop();
  if (!last) return { kicker: "", lines: [] };
  return { kicker: words.join(" "), lines: breakWord(last) };
}
