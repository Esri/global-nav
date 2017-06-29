# Header [<img src="https://upload.wikimedia.org/wikipedia/commons/5/52/WHATWG_DOM_logo.svg" alt="WHATWG DOM logo" width="90" height="90" align="right">][Esri Global Navigation]

[![Build Status][cli-img]][cli-url]
[![Licensing][lic-img]][lic-url]
[![Changelog][log-img]][log-url]

[Header] is the presentation layer of the top-level navigation for Esri's web
pages and SAAS applications. It consists of the markup (HTML), styles (CSS),
and functionality (JS) for UI interactions.

![Global Navigation: desktop view](../readme-screenshots/esri-global-nav-desktop.png)

## Usage

We recommend using **Esri Global Navigation** with a package manager. This is a
manageable approach and reduces the duplication or forking of work.

```sh
npm install ArcGIS/esri-global-nav --save-dev
```

This will give you access to the source code within this project. From there,
you may use your existing build tools, which would include Babel and PostCSS to
transpile and integrate this into your existing sites or applications.

```css
@import "esri-global-nav";
```

```js
import header from 'esri-global-nav';

// when the document content has loaded
document.contentLoaded.then(() => {
  // create a header from a json url and append it to the body
  document.body.append(
    header.createFromURL('path/to/your/data.json')
  );
});
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

Host a **Esri Global Navigation** component as a local web server. This will
let you preview the component as well as any changes you make to it.

```sh
# start the header component
npm start header

# start the footer component
npm start footer

# start the search component
npm start search
```

## Specification

To understand the structure and break down of Global Navigation components, see
[README-SPEC.md].

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
