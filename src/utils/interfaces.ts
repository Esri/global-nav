export type ImagePath = string|string[];

export type InlineSVG = {
  viewBox?: string;
  path: ImagePath;
}

export type EsriImageData = InlineSVG | ImagePath;

export type Application = {
  itemId: string,
  url: string,
  label: string,
  image?: string,
  abbr?: string,
  placeHolderIcon?: string,
  canAccess?: boolean,
  isNew?: boolean,
}

export type Notification = {
  text: string;
  date?: string;
};

export type SocialLink = {
  label: string,
  href: string,
  image: InlineSVG
}

export type FooterLink = {
  label: string,
  href: string
}

export type FooterMenu = {
  label: string,
  menu: FooterLink[]
}

export type LanguageOption = {
  label: string,
  value: string
}