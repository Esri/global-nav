/* Global Footer: Tooling
/* ========================================================================== */

import {$assign as $} from '../../shared/js/shared';

/* Global Footer Breadcrumb
/* ========================================================================== */

export default () =>
	$('div', {class: `esri-footer-breadcrumb`},
    $('ul', {class: `esri-footer-breadcrumb--list`},
      $('li', {class: `esri-footer-breadcrumb--items`},
        $('a', {class: `esri-footer-breadcrumb--pin`}, '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" class="svg-icon"><path d="M15.999 0C11.214 0 8 1.805 8 6.5v17l7.999 8.5L24 23.5v-17C24 1.805 20.786 0 15.999 0zM16 14.402A4.4 4.4 0 0 1 11.601 10a4.4 4.4 0 1 1 8.798 0A4.4 4.4 0 0 1 16 14.402z"/></svg>')
      ),
      $('li', {class: `esri-footer-breadcrumb--items`}, '/'),
      $('li', {class: `esri-footer-breadcrumb--items`}, 
        $('a', {href: '#', class: `esri-footer-breadcrumb--items-link`}, 'ArcGIS')
      ),
      $('li', {class: `esri-footer-breadcrumb--items`}, '/'),
      $('li', {class: `esri-footer-breadcrumb--items`}, 
        $('a', {href: '#', class: `esri-footer-breadcrumb--items-link`}, 'Products')
      ),
      $('li', {class: `esri-footer-breadcrumb--items`}, '/'),
      $('li', {class: `esri-footer-breadcrumb--items`}, 
        $('a', {href: '#', class: `esri-footer-breadcrumb--items-link`}, 'Apps for the Field')
      ),
      $('li', {class: `esri-footer-breadcrumb--items`}, '/'),
      $('li', {class: `esri-footer-breadcrumb--items`}, 
        $('a', {href: '#', class: `esri-footer-breadcrumb--items-link`}, 'Survey 123')
      ),
      $('li', {class: `esri-footer-breadcrumb--items`}, '/'),
      $('li', {class: `esri-footer-breadcrumb--items`}, 'Resources'),
    )
  );
