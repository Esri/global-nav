# Esri Global Navigation [<img src="https://upload.wikimedia.org/wikipedia/commons/5/52/WHATWG_DOM_logo.svg" alt="WHATWG DOM logo" width="90" height="90" align="right">][Esri Global Navigation]

[![Build Status][cli-img]][cli-url]
[![Licensing][lic-img]][lic-url]

[Esri Global Navigation] is a branded presentation layer for Esri site and
account navigation. It provides platform-wide alignment and brand cohesion,
allowing visitors to explore new content and products through a familiar and
consistent experience

As a centralized microapp, this repo will reduce the duplicated work any given
developer needs to implement persistent navigation, while providing a
centralized location for distributing rapid updates, new features, and
resolving issues with shared ownership.

[View it live](https://esri.github.io/global-nav/)

## Getting Started

To begin, clone this repository to your computer:

```sh
git clone git@github.com:Esri/global-nav.git
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

## Resources

- [ArcGIS for JavaScript API Resource Center](https://developers.arcgis.com/javascript/)
- [ArcGIS Blog](https://blogs.esri.com/esri/arcgis/)
- [twitter@esri](https://twitter.com/esri)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Licensing

[Esri Global Navigation] uses the Apache License, Version 2.0 (the "License").
You may obtain a copy of the License at
https://www.apache.org/licenses/LICENSE-2.0, which is also available in the
repository's [license](LICENSE).

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.

[Esri Global Navigation]: https://github.com/Esri/global-nav
[Header]: https://github.com/Esri/global-nav/tree/master/header
[Footer]: https://github.com/Esri/global-nav/tree/master/footer
[Search Dialog]: https://github.com/Esri/global-nav/tree/master/search
[Language Switcher]: https://github.com/Esri/global-nav/tree/master/language

[cli-url]: https://travis-ci.org/Esri/global-nav
[cli-img]: https://travis-ci.org/Esri/global-nav.svg?branch=master
[lic-url]: LICENSE.md
[lic-img]: https://img.shields.io/badge/license-Apache%202.0-blue.svg
