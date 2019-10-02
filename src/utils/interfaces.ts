export interface SvgDef {
  viewBox: string;
  path: string[];
}

export type imgOrSvgDef = string | SvgDef;

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