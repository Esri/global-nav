/* Global Footer: Tooling
/* ========================================================================== */

import {$assign as $} from '../../shared/js/shared';

/* Global Footer Breadcrumb
/* ========================================================================== */

export default () =>
  $('div', {class: `esri-footer-breadcrumb`},
    $('a', {class: `esri-footer-breadcrumb--pin`}, '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" class="svg-icon"><path d="M15.999 0C11.214 0 8 1.805 8 6.5v17l7.999 8.5L24 23.5v-17C24 1.805 20.786 0 15.999 0zM16 14.402A4.4 4.4 0 0 1 11.601 10a4.4 4.4 0 1 1 8.798 0A4.4 4.4 0 0 1 16 14.402z"/></svg>'),
    $('ul', {class: `esri-footer-breadcrumb--list`}),
    $('div', {class: 'clear'})
  );


  window.addEventListener('DOMContentLoaded', () => {
    // const breadcrumb = window.location.pathname;
    const breadcrumb = "/en-us/arcgis/products/arcgis-pro/overview";
    // const breadcrumb = "/content/esri-sites/language-masters/en/industries/banking/overview.html";
    const listWrapper = document.querySelector('.esri-footer-breadcrumb--list');

    const rules = [
      {'arcgis' : 'ArcGIS'},
      {'arcgis-pro' : 'ArcGIS Pro'}
    ];
    
    const exceptions = [
      '',
      'content',
      'esri-sites',
      'language-masters',
      'en',
      'en-us'
    ];

    const validateRule = (element) => {
      let crumb = element;
      rules.forEach((rule) => {
        rule.hasOwnProperty(crumb) ? crumb = rule[crumb] : '';
      });

      return crumb;
    };

    const buildLinkURL = (path, position) => {
      let url = '';
      for (let i = 2; i <= position; i++) {
        url += `${path[i]}/`;
      }
      url = `https://www.esri.com/${url}`;
      
      return url;
    };

    const cleanUpBreadcrumbs = (breadcrumb) => {
      breadcrumb.forEach((bread, index) => {
        for (let i = 0; i < exceptions.length; i++) {
          if (bread === exceptions[i]) {
            delete breadcrumb[index];
          }
        }
      });
    };

    if (breadcrumb.length) {
      const path = breadcrumb.split('/');
      cleanUpBreadcrumbs(path);
      path.forEach((element, index) => {
        const crumb = validateRule(element);
        const url = buildLinkURL(path, index);
        if (element && index) {
          if (listWrapper) {
            if (index === path.length - 1) {
              $(listWrapper,
                $('li', {class: `esri-footer-breadcrumb--items`}, '/',
                  $('p', {class: `esri-footer-breadcrumb--items-current`}, `${element}`),
                ),
              );
            } else {
              $(listWrapper,
                $('li', {class: `esri-footer-breadcrumb--items`}, '/',
                  $('a', {href: url, class: `esri-footer-breadcrumb--items-link`}, `${crumb}`)
                ),
              );
            }
          }
        }
      });
    }
  });
