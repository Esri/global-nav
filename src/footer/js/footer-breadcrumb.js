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
    const breadcrumb = window.location.pathname;
    // const breadcrumb = "/en-us/arcgis/products/arcgis-pro/overview";
    const listWrapper = document.querySelector('.esri-footer-breadcrumb--list');

    if (breadcrumb.length) {
      const path = breadcrumb.split('/');
      path.forEach((element, index) => {
        if (element) {
          if (listWrapper) {
            if (index === path.length - 1) {
              console.log(path[index]);
              $(listWrapper,
                $('li', {class: `esri-footer-breadcrumb--items`}, '/',
                  $('p', {class: `esri-footer-breadcrumb--items-current`}, `${element}`),
                ),
              );
            } else {
              console.log(path[index]);
              $(listWrapper,
                $('li', {class: `esri-footer-breadcrumb--items`}, '/',
                  $('a', {href: 'link', class: `esri-footer-breadcrumb--items-link`}, `${element}`)
                ),
              );
            }
          }
        }
      });
    }
  });
