export interface HomeSectionsConfig {
  hero: boolean;
  shows: boolean;
  members: boolean;
  repertoire: boolean;
  about: boolean;
  contact: boolean;
}

/**
 * `centered`: the name on one line across the top, the four centred under it.
 * `split`: the name in two lines on the left, the four standing on the right.
 */
export type HeroLayout = "centered" | "split";

export interface HomePageConfig {
  sections: HomeSectionsConfig;
  heroLayout: HeroLayout;
}

export interface SiteConfig {
  home: HomePageConfig;
}
