# Esri Global Nav (draft)

At its core **esri-global-nav** is the presentation layer of the top-level navigation for Esri's web pages and SAAS applications.  It consists of HTML, styles (Sass and CSS), and a little Javascript for light-weight UI interactions.

The primary reasons for this component are to achieve greater platform-wide alignment and reduce the amount of duplicated work any given developer needs to do.

Secondary reasons are to encourage shared ownership and allow for rapid iterations.

## Using Esri Global Nav
The two main ways to use esri-global-nav are using a package manager or using the static HTML and CSS files.  We recommend using a package manager as it is the most manageable approach and reduces duplication of work.

## Structure
![Global Nav structure](https://github.com/ArcGIS/esri-global-nav/raw/master/readme-assets/esri-global-nav-concepts.png)
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

## Integrations
Integrations for frameworks such as [Ember.js](http://emberjs.com/) and [AngularJS](https://angularjs.org/) would be a great addition and contributions are welcome.

## Contributing
Contributions are welcome in all forms: issues, pull requests, concepts, inquiries, etc.
