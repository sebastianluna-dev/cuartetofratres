export interface HomeSectionsConfig {
  hero: boolean;
  about: boolean;
  members: boolean;
  repertoire: boolean;
  contact: boolean;
}

export interface HomePageConfig {
  sections: HomeSectionsConfig;
}

export interface SiteConfig {
  home: HomePageConfig;
}
