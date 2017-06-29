# Esri Global Navigation [<img src="https://upload.wikimedia.org/wikipedia/commons/5/52/WHATWG_DOM_logo.svg" alt="WHATWG DOM logo" width="90" height="90" align="right">][Esri Global Navigation]

[![Build Status][cli-img]][cli-url]
[![Licensing][lic-img]][lic-url]
[![Changelog][log-img]][log-url]

This document details the elements used to present the
[Esri Global Navigation](gnav) component.

![Global Navigation: desktop view](../readme-screenshots/esri-global-nav-desktop.png)

## Structure

![Global Nav structure](../readme-screenshots/esri-global-nav-concepts.png)

The component has three sections:

* Branding
* Navigation
* Globally-shared

The **Navigation** section has the greatest flexibility.  That being said, the default styles applied to this section should require little and possibly no customization to address individual needs.

This section also includes some nice styles and animations for the sub-nav elements.

The **Branding** section contains styles for SAAS applications which are distinct from site pages.

The **Globally-shared** section should receive little to no customization within your implementation.  It contains the following:
* Search link
* App Switcher
* User Profile and profile dropdown

#### Tablet

![global navigation structure](../readme-screenshots/esri-global-nav-concepts-mobile.png)

SAAS Apps
* Nav items are condensed and hidden under the ellipses icon and lives on the right.
* App name/Project name remains
* Logo remains (takes you to dashboard)

Website
* Nav items are condensed and hidden under the burger icon and lives on the left.
* Logo remains (takes you home)

[Esri Global Navigation]: https://github.com/ArcGIS/esri-global-nav

[cli-url]: https://travis-ci.com/ArcGIS/esri-global-nav
[cli-img]: https://api.travis-ci.com/ArcGIS/esri-global-nav.svg?token=mqvp34VgHUamyk5XDa9d
[lic-url]: LICENSE.md
[lic-img]: https://img.shields.io/badge/license-CC0--1.0-blue.svg
[log-url]: CHANGELOG.md
[log-img]: https://img.shields.io/badge/changelog-md-blue.svg

[Gnav]: #global-navigation-gnav-component
[Gnav Apps]: #gnav-apps
[Gnav Brand]: #gnav-brand
[Gnav Events]: #gnav-events
[Gnav Menus]: #gnav-menus
[Gnav Search]: #gnav-search
[Gnav User]: #gnav-user
