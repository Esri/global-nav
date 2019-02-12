/* Global Footer: Tooling
/* ========================================================================== */

import {$assign as $} from '../../shared/js/shared';

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
    
    const exceptions = [
      '',
      'content',
      'esri-sites',
      'language-masters',
      'en',
      'en-us',
      'segments',
      'overview'
    ];

    const validateRule = (element) => {
      const crumb = element;
      const regEx = /arcgis/gi;
      
      return crumb
        .replace(regEx, 'ArcGIS')
        .replace(/-/gi, ' ')
        .replace(/js/gi, 'JS')
        .replace(/cityengine/gi, 'CityEngine')
        .replace(/arcgis blog/gi, 'ArcGIS Blog')
        .replace(/arcgis apps/gi, 'ArcGIS Apps')
        .replace(/arcgis online/gi, 'ArcGIS Online')
        .replace(/arcnews/gi, 'ArcNews')
        .replace(/arcwatch/gi, 'ArcWatch')
        .replace(/arcuser/gi, 'ArcUser')
        .replace(/wherenext/gi, 'WhereNext')
        .replace(/arcgis enterprise/gi, 'ArcGIS Enterprise')
        .replace(/arcgis pro/gi, 'ArcGIS Pro')
        .replace(/story maps/gi, 'Story Maps')
        .replace(/api/gi, 'API');
    };

    const buildLinkURL = (path, position) => {
      let url = `${window.location.origin}/`;
      for (let i = 0; i <= position; i++) {
        url += `${path[i]}/`;
      }
      url = `${url}`;
      
      return url;
    };

    const formatBreadcrumbs = (breadcrumb) => {
      let currentPageFormatted = '';
      currentPageFormatted += `${breadcrumb.charAt(0).toUpperCase()}${breadcrumb.substr(1).toLowerCase()}`;

      return currentPageFormatted = validateRule(currentPageFormatted);
    };

    const cleanUpBreadcrumbs = (breadcrumb) => {
      breadcrumb.forEach((b, index) => {
        exceptions.forEach((ex) => {
          if (breadcrumb[index] === ex) {
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
            const currentPageFormatted = formatBreadcrumbs(currentPage);
            $(listWrapper,
              $('li', {class: `${prefix}--items`}, '/',
                $('p', {class: `${prefix}--items-current`}, `${currentPageFormatted}`),
              ),
            );
          } else {
            const crumbPageFormatted = formatBreadcrumbs(crumbPage);
            $(listWrapper,
              $('li', {class: `${prefix}--items`}, '/',
                $('a', {href: url, class: `${prefix}--items-link`}, `${crumbPageFormatted}`)
              ),
            );
          }
        }
      });
    }
  });
