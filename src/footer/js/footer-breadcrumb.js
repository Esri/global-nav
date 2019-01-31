/* Global Footer: Tooling
/* ========================================================================== */

import {$assign as $, $renderSvgOrImg} from '../../shared/js/shared';

/* Global Footer Breadcrumb
/* ========================================================================== */
const prefix =  'esri-footer-breadcrumb';
export default () =>
  $('div', {class: `${prefix}`},
    $('a', {href: 'https://www.esri.com', class: `${prefix}--pin`}),
    $('ul', {class: `${prefix}--list`}),
    $('div', {class: 'clearFloats'})
  );

  window.addEventListener('DOMContentLoaded', () => {
    const breadcrumb = window.location.pathname;
    const listWrapper = document.querySelector('.esri-footer-breadcrumb--list');

    const rules = [
      {'arcgis' : 'ArcGIS'},
      {'arcgis-pro' : 'ArcGIS Pro'},
      {'about-arcgis' : 'About ArcGIS'}
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
      let url = `${window.location.origin}/`;
      for (let i = 0; i <= position; i++) {
        url += `${path[i]}/`;
      }
      url = `${url}`;
      
      return url;
    };

    const cleanUpBreadcrumbs = (breadcrumb) => {
      breadcrumb.forEach((b, index) => {
        exceptions.forEach((x) => {
          if (breadcrumb[index] === x) {
            breadcrumb.splice(index, 1);
          }
        });
      });
      return breadcrumb;
    };

    if (breadcrumb.length) {
      const path = breadcrumb.split('/');
      const newPath = cleanUpBreadcrumbs(path);
      newPath.forEach((element, index) => {
        const crumb = validateRule(element);
        const url = buildLinkURL(newPath, index);
        if (element && listWrapper) {
          const currentPage = element.replace(/-/gi, ' ').replace(/\.html/gi, '');
          const crumbPage = crumb.replace(/-/gi, ' ').replace(/\.html/gi, '');
          if (index === newPath.length - 1) {
            $(listWrapper,
              $('li', {class: `${prefix}--items`}, '/',
                $('p', {class: `${prefix}--items-current`}, `${currentPage}`),
              ),
            );
          } else {
            $(listWrapper,
              $('li', {class: `${prefix}--items`}, '/',
                $('a', {href: url, class: `${prefix}--items-link`}, `${crumbPage}`)
              ),
            );
          }
        }
      });
    }
  });
