# Esri Global Navigation [<img src="https://upload.wikimedia.org/wikipedia/commons/5/52/WHATWG_DOM_logo.svg" alt="WHATWG DOM logo" width="90" height="90" align="right">][Esri Global Navigation]

[![Build Status][cli-img]][cli-url]
[![Licensing][lic-img]][lic-url]

[Esri Global Navigation] provides platform-wide alignment and brand cohesion,
allowing visitors to explore new content and products through a familiar and
consistent experience. As a centralized microapp, this reduces the duplicated
work any given developer needs to implement a persistent footer, while
providing a centralized location for distributing rapid updates, new features,
and resolving issues with shared ownership.

[View it live](arcgis.github.io/esri-global-nav/)

## Getting Started

To begin, clone this repository to your computer:

```sh
git clone git@github.com:ArcGIS/esri-global-nav.git
```

From the esri-global-nav directory, start one of the navigation modules:

```sh
# to launch the global navigation header
npm start header

# to launch the global navigation footer
npm start footer

# to launch the global navigation search dialog (included in the header)
npm start search

# to launch the global navigation language switcher (included in the footer)
npm start language
```

## Modules

[Esri Global Navigation] is composed of 4 modules; [Header], [Footer],
[Search Dialog], and [Language Switcher].

### [Header]

[Header] is the presentation layer of the top-level navigation for Esri's web
pages and SAAS applications. It consists of the markup (HTML), styles (CSS),
and functionality (JS) for UI interactions.

### [Footer]

[Footer] is the presentation layer of the bottom-level navigation for Esri's
web pages and SAAS applications. It consists of the markup (HTML), styles
(CSS), and functionality (JS) for UI interactions.

---

Esri Global Navigation is [Apache 2.0 licensed][lic-url].

[Esri Global Navigation]: https://github.com/ArcGIS/esri-global-nav
[Header]: https://github.com/ArcGIS/esri-global-nav/tree/master/header
[Footer]: https://github.com/ArcGIS/esri-global-nav/tree/master/footer
[Search Dialog]: https://github.com/ArcGIS/esri-global-nav/tree/master/search
[Language Switcher]: https://github.com/ArcGIS/esri-global-nav/tree/master/language

[cli-url]: https://travis-ci.com/ArcGIS/esri-global-nav
[cli-img]: https://api.travis-ci.com/ArcGIS/esri-global-nav.svg?token=mqvp34VgHUamyk5XDa9d
[lic-url]: LICENSE.md
[lic-img]: https://img.shields.io/badge/license-Apache%202.0-blue.svg
