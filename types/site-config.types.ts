export interface HomeSectionsConfig {
  hero: boolean;
  shows: boolean;
  members: boolean;
  repertoire: boolean;
  about: boolean;
  contact: boolean;
}

export interface HomePageConfig {
  sections: HomeSectionsConfig;
}

export interface SiteConfig {
  home: HomePageConfig;
}
