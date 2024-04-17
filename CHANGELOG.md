## 1.5.1

### Fixed
- fix: removed usage of DOM insertion events (#342)

## 1.5.0

### Enhancements
- mobile styles for app launcher

### Fixes
- fix: solved footer rendering when no brand is passed (#315)
- fix: adjust app switcher max-height on shorter screens
- fix: missing search in certain case
- fix: add rel noopener to _blank links (#327)
- fix: update all links to use https:// (#325)
- fix: remove pin and replace with link (#326)
- fix: limit link width
- fix: inline search animation
- fix: app launcher accessibility issue
- fix: menu items appearing after inline edit save (#343)
- fix: solve windows issue with 767px wide viewport (#347)
- fix: Update flyout label contrast (#344)
- fix: overlay mask width not full width
- fix: PostCSS compile errors via missing colon

## 1.4.2

### Fixed
- fix: TypeScript definitions now part of `dist`
- a11y: improve color contrast for footer links

## 1.4.1

### Fixed
- a11y: improve labelling of language switcher
- fix: remove errant `console.log`

## 1.4.0

### Added
- TypeScript definitions for main methods
- allow conversion to editable title after initial load (#253)

### Fixed
- fix: cutoff account menu on wide screens (#229)
- a11y: add accessible label to notification icon (#233)
- fix: center brand text on mobile (#274)
- a11y: allow selection of text in header (#292)
- a11y: hide inline title edit button when not defined (#297)
- fix: improve styles for inline title editing
- feat: hide elements that are not in config object (#300)
- a11y: make scrim text for screen readers (#304)
- a11y: trap focus within account control (#306)
- a11y: improve roles for certain menu markup (#293)
- a11y: add focus style to top nav links (#295)
- fix: open iOS keyboard when searching
- fix: shopping cart supports 999+ items (#285)
- fix: column widths for
- fix: align distributor image (#267)
- fix: styles restored for app mode (#261, #262)
- fix: handle missing tiles when configured (#275)
- fix: restore cart link when adding initial item (#277)

## 1.3.0

### Added
- Shopping cart icon functionality
- Multi column feature adds both 'single', and 'structured' menu types

### Fixed
- Empty alt tag for user image (#222)
- align app indicators properly in right to left
- Disable app launcher drag and drop on Android and iPhone devices
- don't double label app launcher and icon (#258)
- first link gets outline style on keyboard interaction (#256)
- fix aria-label for inline search (#257)

## 1.2.1

### Updated
- New icon for app-launcher

## 1.2.0

### Fixed
- data attributes in top-level links (#23)
- fix app launcher icons for right-to-left languages

### Added
- flickr icon in social media links

## 1.1.2

### Fixed
- Add `platform` property as a fallback for social media classes (#134)
- Use `rel=noopener` on social links
- When only search is used, divider is now hidden (#200)
- remove text decoration from `header-brand-link`

## 1.1.1

### Fixed
- remove non-unique ids (accessibility violation)
- social link markup structure now more accessible
- fix missing ids for aria labels
- hide inline search toggle when using normal search (and vice sersa)
- set profile image alt tag to user's name

## 1.1.0

### Added
- notifications UI (#33)
- now can set links to active with `active: true`
- inline search pattern (for suggestions, top results)

### Modified
- Social icons open in new window
- App Switcher now expects svg path data instead of url to image

### Fixed
- IE 11 browser fixes
- Fixed several spacing/alignment inconsistencies
- small accessibility fixes
- fixed bugs with images rendering with `undefined` id attribute

## 1.0.8

### Added
- Distributor Logo
- Drag and Drop in the App Switcher

## 1.0.7

### Fixed
- fix `brandText` when used with Calcite Web
- fix `brandText` spacing if used with brand `image`

## 1.0.6

### Fixed
- fix "app mode" hamburger alignment
- fix inconsistent spacing

### Added
- added ability to set title as text if no logo is available (#27)

## 1.0.5

### Fixed
- fix drawer misalignment
- fix `sublist--featured` grid missing padding
- fix input styles when used with Calcite Web
- fix link styles when used with Calcite Web
- fix social link color on hover

## 1.0.4

### Modified
- Made a few tweaks to improve screen reader performance
- Resolved issue with top navigation centering the menu


## 1.0.3

### Modified
- Bundled CSS and JS files in `dist` are now available after install
- Component is bundled as UMD instead of IIFE by default

## 1.0.2

### Added
Top Stripe
Images to nav items

### Modified
Build

### Breaking
Nothing hopefully


## 1.0.1

### Added
New gulp build

### Modified
Folder structure and removed several unneeded files

### Breaking
Nothing hopefully
