# Esri Global Navigation [<img src="https://upload.wikimedia.org/wikipedia/commons/5/52/WHATWG_DOM_logo.svg" alt="WHATWG DOM logo" width="90" height="90" align="right">][Esri Global Navigation]

[![Build Status][cli-img]][cli-url]
[![Licensing][lic-img]][lic-url]
[![Changelog][log-img]][log-url]

[Esri Global Navigation] is the presentation layer of the top-level navigation for Esri's web pages and SAAS applications. It consists of the markup (HTML), styles (CSS), and functionality for UI interactions.

![Global Navigation: desktop view](readme-assets/esri-global-nav-desktop.png)

The primary reasons for this component are to achieve greater platform-wide alignment and reduce the amount of duplicated work any given developer needs to do.

Secondary reasons are to encourage shared ownership and allow for rapid iterations.

## Usage

We recommend using **Esri Global Navigation** with a package manager, as it is the most manageable approach and reduces duplication of work.

```sh
npm install ArcGIS/esri-global-nav --save-dev
```

## Development

Clone this repository to your computer.

```sh
git clone git@github.com:ArcGIS/esri-global-nav.git
```

Install the component locally.

```sh
npm install
```

Host the component as a local web server. This will let you preview the component as well as any changes you make to it.

```sh
npm start
```

## Specification

To understand the structure and break down of the Global Navigation component, see [README-SPEC.md].

## Integrations

Integrations for frameworks such as [Ember] and [AngularJS] would be a great addition and contributions are welcome.

## Contributing

Contributions are welcome in all forms: issues, pull requests, concepts, inquiries, etc.

[Esri Global Navigation]: https://github.com/ArcGIS/esri-global-nav
[Ember]: http://emberjs.com/
[AngularJS]: https://angularjs.org/
[README-SPEC.md]: README-SPEC.md

[cli-url]: https://travis-ci.com/ArcGIS/esri-global-nav
[cli-img]: https://api.travis-ci.com/ArcGIS/esri-global-nav.svg?token=mqvp34VgHUamyk5XDa9d
[lic-url]: LICENSE.md
[lic-img]: https://img.shields.io/badge/license-CC0--1.0-blue.svg
[log-url]: CHANGELOG.md
[log-img]: https://img.shields.io/badge/changelog-md-blue.svg
