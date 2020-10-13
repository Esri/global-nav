/*
 | Copyright 2020 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    https://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */

/**
 * Configuration of header and footer sections and where to put them in page.
 */
export interface IGlobalNavConfig {
  /**
   * Query selector string for DOM element to receive header
   */
  headerElm: string;
  /**
   * Query selector string for DOM element to recieve footer
   */
  footerElm: string;
  /**
   * Configuration of header and footer sections
   */
  menuData: IGlobalNavMenuData;
}

export interface IGlobalNavPartialConfig {
  /**
   * Query selector string for DOM element
   */
  targetElm: string;
  /**
   * Configuration of header and footer sections
   */
  menuData: IGlobalNavMenuData;
}

/**
 * Create both header and footer
 */
export function create(config: IGlobalNavConfig): void;

/**
 * Create just a header
 */
export function createHeader(config: IGlobalNavPartialConfig): void;

/**
 * Create just a footer
 */
export function createFooter(config: IGlobalNavPartialConfig): void;

// ================================================================================================================== //

/**
 * Generic menu item used in footer
 */
export interface IGlobalNavMenu {
  label: string;
  menu?: IGlobalNavMenu[];
  href?: string;
  image?: any;
  [key: string]: any;
}

/**
 * Entry in header menu bar, e.g., Products, Solutions, Support & Services, News, About
 */
export interface IGlobalNavMenuBarItem {
  label: string;
  href?: string;
  data?: any;
  [key: string]: any;
}

/**
 * Configuration of header and footer sections
 */
export interface IGlobalNavMenuData {
  header?: {
    theme?: string;
    /** Main brand logo and link */
    brand?: {
      href?: string;
      distributorImage?: IGlobalNavImage;
      distributorImageWidth?: number;
      distributorImageHeight?: number;
      image?: IGlobalNavImage;
      label?: string;
      width?: number;
      height?: number;
      brandText?: string;
      brandTextLink?: string;
    };
    /** Menu structure for top links */
    menus?: IGlobalNavMenuBarItem[][];
    /** Search (either inline or takeover) */
    search?: IGlobalNavSearch;
    /** App launcher */
    apps?: {
      text?: string;
      primary: IGlobalNavAppLink;
      secondary: IGlobalNavAppLink;
      isLoading?: boolean;
      ieVersion?: "edge" | "ie11";
      disableDragAndDrop?: boolean;
      displayIntro?: boolean;
      label?: string;
      [key: string]: any;
    };
    /** User dropdown */
    account?: {
      label: string;
      controls?: {
        signin?: string;
        switch?: string;
        signout?: string;
      };
      user?: {
        name?: string;
        id?: string;
        group?: string;
        image?: IGlobalNavImage;
      };
      menus?: {
        label?: string;
        href?: string;
        newContext?: boolean
      }[];
      [key: string]: any;
    };
    /** Shopping cart */
    cart?: {
      url?: string;
      items?: number;
      [key: string]: any;
    };
    /** Notifications list */
    notifications?: {
      messages?: IGlobalNavNotification[];
      dismissAllLabel?: string;
      emptyMessage?: {
        image: IGlobalNavImage
        text: string;
      };
    };
    /** Always place menus behind an expandable hamburger menu */
    collapseMenus?: boolean[];
  };
  footer?: {
    /** CSS namespace used by footer elements (default `esri-footer`) */
    prefix?: string;
    /** Hide footer menus and enter "minimal" footer mode */
    hideMenus?: boolean;
    /** Logo/brand link */
    brand?: {
      href: string;
      label: string;
      /** path to logo svg file */
      path: string;
    };
    /** Main set of footer links */
    menu?: {
      label: string;
      menu: IGlobalNavMenu[];
    };
    /** Social links */
    social?: {
      label: string;
      menu: IGlobalNavSocialLink[];
    };
    /** Informational Links */
    info?: {
      label: string;
      menu: Pick<IGlobalNavMenu, "label"|"href">[];
    };
    /** Language selection */
    language?: {
      buttonLabel: string;
      closeLabel: string;
      greetingLabel?: string;
      messageLabel?: string;
      submitLabel?: string;
      optionsLabel?: string;
      options?: { value: string; label: string }[];
    };
    /** Breadcrumb navigation */
    breadcrumbs?: IGlobalNavBreadcrumb[];
    /** Show breadcrumb links */
    showBreadcrumb?: boolean;
  };
}

/**
 * Search control in header
 */
export interface IGlobalNavSearch {
  hide?: boolean;
  label?: string;
  inline?: boolean;
  [key: string]: any;
}

/** SVG in global nav */
export interface IGlobalNavImageSVG {
  path: string;
  viewBox: string;
}

/**
 * Image definition, accepts path to image, or SVG def
 */
export type IGlobalNavImage = IGlobalNavImageSVG | string;

/**
 * Footer breadcrumb links
 */
export interface IGlobalNavBreadcrumb {
  href: string;
  label: string;
}

/**
 * Single link to social platform
 */
export interface IGlobalNavSocialLink {
  platform?: string;
  label: string;
  href: string;
  image: IGlobalNavImage;
}

/**
 * Single link in app launcher
 */
export interface IGlobalNavAppLink {
  canAccess?: boolean;
  title?: string;
  itemId?: string;
  uid?: string;
  url?: string;
  isNew?: boolean;
  image?: string;
  abbr?: string;
  placeHolderIcon?: string;
  label?: string;
}

/**
 * Single notification in notifications list
 */
export interface IGlobalNavNotification {
  id?: string;
  text?: string;
  date?: string;
}
