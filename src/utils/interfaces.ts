export interface SvgDef {
  viewBox: string;
  path: string[];
}

export type imgOrSvgDef = string | SvgDef;

