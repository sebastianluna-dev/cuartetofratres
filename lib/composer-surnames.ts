interface WithComposer {
  composer: string | null;
}

/**
 * The surnames of a programme's composers, each once and in programme order,
 * as the line under a poster's title: "Borodín · Elizondo". The surname is
 * the last word of the name; works with no composer are skipped. `null` when
 * the programme names nobody.
 */
export function composerSurnames(program: readonly WithComposer[]): string | null {
  const surnames: string[] = [];
  for (const { composer } of program) {
    const surname = composer?.trim().split(/\s+/).pop();
    if (surname && !surnames.includes(surname)) surnames.push(surname);
  }
  return surnames.length > 0 ? surnames.join(" · ") : null;
}
