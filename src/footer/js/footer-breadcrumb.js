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
    // const breadcrumb = window.location.pathname;
    const breadcrumb = 'en-us/about-arcgis/products/esri-cityengine/arcgis-pro/arcgis-blog/js-api-arcgis/mapping/render-millions-of-features-in-your-maps/';
    // const breadcrumb = 'arcgis-blog/products/js-api-arcgis/mapping/render-millions-of-features-in-your-maps/';
    // const breadcrumb = 'esri-news/arcnews/arcwatch/arcuser/issue-archive ';
    const listWrapper = document.querySelector('.esri-footer-breadcrumb--list');

    const rules = [
      {'Esri Cityengine ' : 'Esri CityEngine'},
      {'appstudio' : 'AppStudio'},
      {'appbuilder' : 'AppBuilder'},
      {'arcnews' : 'ArcNews'},
      {'arcwatch' : 'ArcWatch'},
      {'arcuser' : 'ArcUser'}
    ];
    
    const exceptions = [
      '',
      'content',
      'esri-sites',
      'language-masters',
      'en',
      'en-us',
      'segments'
    ];

    const validateRule = (element) => {
      let crumb = element;
      const regEx = /arcgis/gi;
      rules.forEach((rule) => {
        rule.hasOwnProperty(crumb) ? crumb = rule[crumb] : '';
      });
      
      return crumb
        .replace(regEx, 'ArcGIS')
        .replace(/-/gi, ' ')
        .replace('Of', 'of')
        .replace('For', 'for')
        .replace('If', 'if')
        .replace('And', 'and')
        .replace('But', 'but')
        .replace('Nor', 'nor')
        .replace('Or', 'or')
        .replace('Js', 'JS')
        .replace('Api', 'API')
        .replace('In', 'in');
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
      const newCurrentPage = breadcrumb.split(' ');
      let currentPageFormatted = '';
      newCurrentPage.forEach((ne) => {
        currentPageFormatted += `${ne.charAt(0).toUpperCase()}${ne.substr(1).toLowerCase()} `;
      });
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
